import { Request, Response } from "express";
import mongoose from "mongoose";
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found";
import { currentUser } from "../middleware/current-user";
import { Address } from "../model/addressSchema";
import { Cart } from "../model/cartSchema";
import { Order, OrderStatus } from "../model/OrderSchema";
import { Product } from "../model/productSchema";
import { Tracking } from "../model/trackingSchema";
import { PaymentStatus, PaymentType, Transaction } from "../model/TransactionSchema";
import { isValidId } from "../services/validateMongoosedbId";
import { ResponseUtil } from "../utils/Response";
import { UpdateOrderStatusDTO } from "../dtos/OrderUpdateDTO";
import { validate } from "class-validator";
import { RequestValidationError } from "../errors/request-validation-errors";
import { User } from "../model/userSchema";
import logger from "../utils/logging";
import { TrackLog } from "../model/tracklogSchema";
enum Operation {
  PROCESS = "process",
  ROLLOUT = "rollout",
}
export class OrderController {
  static async getCheckout(req: Request, res: Response) {
    const { cartId } = req.body;
    const currentUserId = req.currentUser?.id;
    if (!currentUserId) {
      throw new BadRequestError("User not authorized");
    }
    try {
      const addressData = await Address.find({
        user: currentUserId,
      });

      const cartData = await Cart.findOne({
        userId: currentUserId,
        _id: new mongoose.Types.ObjectId(cartId),
      }).populate({
        path: "items.product",
        select: { name: 1, price: 1, ratings: 1 },
        model: "Product",
      });
      const { gst, shippingCharge, payableAmt } = getCharges(cartData.subTotal);

      ResponseUtil.sendResponse(
        res,
        "fetched",
        { address: addressData, cartDetails: cartData, gst, shippingCharge, payableAmt },
        null,
        200
      );
    } catch (e: any) {
      throw new Error(e);
    }
  }

  static async createTransaction(paymentType: PaymentType, coordinates: [], amount, userId, req) {
    try {
      if (coordinates.length == 0) {
        throw new Error("Coordinates are required");
      }

      let transaction = new Transaction({
        user: userId,
        amount: amount,
        ip: OrderController.getIp(req),
        paymentType: paymentType,
        loc: {
          type: "Point",
          coordinates: coordinates,
        },
      });

      const transactionData = await transaction.save();
      return transactionData;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  static async trackOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      if (!isValidId(orderId)) {
        throw new BadRequestError("orderId invalid!");
      }
      const orderExist = await Order.exists({ _id: orderId });
      if (!orderExist) {
        throw new NotFoundError("Order not Exist!");
      }

      const trackData = await Tracking.findOne({ orderId: orderExist._id });
      if (!trackData) {
        throw new BadRequestError("data not found!");
      }
      const trackLog = await TrackLog.find({ trackingId: trackData._id }).select({
        OrderStatus: 1,
        _id: 0,
        comment: 1,
        createdAt: 1,
      });
      ResponseUtil.sendResponse(res, "Fetched Data", { "tracking Details": trackData, "track logs": trackLog });
    } catch (e: any) {
      logger.error(e);
      throw new Error(e);
    }
  }

  static async createTracking(req, coordinates: [], userId) {
    try {
      if (coordinates.length == 0) {
        throw new Error("Coordinates are required");
      }
      let tracking = new Tracking({
        ip: OrderController.getIp(req),
        loc: {
          type: "Point",
          coordinates: coordinates,
        },

        updatedBy: userId,
      });
      const trackingData = await tracking.save();
      await OrderController.trackLoggingHelper(req, coordinates, userId, trackingData._id, OrderStatus.AWAITINGPAYMENT);
      return trackingData;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  private static async trackLoggingHelper(
    req,
    coordinates: [],
    userId,
    trackingId,
    orderStatus: OrderStatus,
    comment?: string
  ) {
    let trackLog = new TrackLog({
      ip: OrderController.getIp(req),
      loc: {
        type: "Point",
        coordinates: coordinates,
      },
      OrderStatus: orderStatus,
      trackingId: trackingId,
      comment: comment,
      updatedBy: userId,
    });
    await trackLog.save();
  }

  static async updateTransactionStatus(transaction_id, data) {
    try {
      const updatedTransaction = await Transaction.findByIdAndUpdate(transaction_id, data);
      return updatedTransaction;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  static async updateTrackingStatus(trackingId, data) {
    try {
      const trackingData = await Tracking.findByIdAndUpdate(trackingId, data);
      if (!trackingData) {
        throw new BadRequestError("Order Update Failed");
      }
      const fetchTrackingData = await Tracking.findById(trackingData._id);
      return fetchTrackingData;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  static getIp(req: Request) {
    return req.headers["x-forwarded-for"]?.toString() || req.socket.remoteAddress;
  }

  static async getOrderDetails(query) {
    const orderDetails = await Order.find(query)
      .populate({
        path: "user",
        select: "name email avatar isActive",
      })
      .populate({
        path: "addressId",
      })
      .populate({
        path: "product",
        populate: {
          path: "category images",
        },
      })

      .populate({
        path: "transaction_id",
        select: "paymentType amount paymentStatus",
      })
      .populate({
        path: "trackingId",
        select: "OrderStatus comment",
      })
      .sort("-createdAt");
    return orderDetails;
  }

  static async createOrder(req: Request, res: Response) {
    const { addressId, cartId, extraNote, paymentType, coordinates } = req.body;
    try {
      const userId = req.currentUser?.id;
      if (!isValidId(addressId)) {
        throw new BadRequestError("Invalid Address id");
      }
      const addressExist = await Address.findById(addressId);
      if (!addressExist) {
        throw new BadRequestError("Address not Found!");
      }
      const cartData = await Cart.findOne({
        userId: userId,
        _id: new mongoose.Types.ObjectId(cartId),
      }).populate({
        path: "items.product",

        model: "Product",
        populate: "category",
      });
      if (!cartData) {
        throw new BadRequestError("cart data not found");
      }
      const { gst, shippingCharge, payableAmt } = getCharges(cartData.subTotal);

      await OrderController.processItemQuantityFromCart(cartData.items, Operation.PROCESS);

      const transaction = await OrderController.createTransaction(paymentType, coordinates, payableAmt, userId, req);
      if (!transaction) {
        throw new BadRequestError("Transaction Failed");
      }

      let orderMapResult = {};

      for (let productIndex in cartData.items) {
        const tracking = await OrderController.createTracking(req, coordinates, userId);
        if (!tracking) {
          throw new BadRequestError("Order failed");
        }
        const order = new Order({
          addressId: addressId,
          product: cartData.items[productIndex].product,
          extraNote: extraNote,
          price: cartData.items[productIndex].product["price"].toFixed(2),
          subTotal: cartData.items[productIndex]["total"].toFixed(2),
          quantity: cartData.items[productIndex]["quantity"],
          trackingId: tracking._id,
          transaction_id: transaction._id,
          user: userId,
        });
        const orderData = await order.save();
        if (!orderData || orderData._id == null || tracking._id == null || transaction._id == null) {
          throw new BadRequestError("Order failed!");
        }
        await OrderController.updateTransactionStatus(transaction._id, {
          paymentStatus: PaymentStatus.SUCCESS,
        });
        await OrderController.updateTrackingStatus(tracking._id, {
          orderId: orderData._id,
          OrderStatus: OrderStatus.ORDERED,
          transactionId: transaction._id,
          comment: "Your Order has been received",
        });
        await OrderController.trackLoggingHelper(req, coordinates, userId, tracking._id, OrderStatus.ORDERED);

        const orderDetails = await OrderController.getOrderDetails({ _id: orderData._id });

        if (orderDetails[0].trackingId["OrderStatus"] !== OrderStatus.ORDERED) {
          await OrderController.processItemQuantityFromCart(cartData.items, Operation.ROLLOUT);
        }
        orderMapResult[productIndex] = orderDetails;
      }

      // const orderData = await order.save();
      // if (!orderData || orderData._id == null || tracking._id == null || transaction._id == null) {
      //   throw new BadRequestError("Order failed!");
      // }

      ResponseUtil.sendResponse(res, "Your Order has been received", orderMapResult, null, 200);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  private static async processItemQuantityFromCart(items: any, operation: Operation) {
    for (let i = 0; i < items.length; i++) {
      await OrderController.orderStockModify(items[i].product._id, items[i]["quantity"], operation);
    }
  }
  private static async orderStockModify(productId, quantity: number, operation: Operation) {
    if (!isValidId(productId)) {
      throw new Error(`${productId} is invalid`);
    }
    let product = await Product.findById(productId);
    if (!product) {
      throw new Error(`${productId} is invalid`);
    }
    if (product.stock > 0 && operation === Operation.PROCESS) {
      if (product.stock > quantity) {
        product.stock = product.stock - quantity;
        await OrderController.productQuanityUpdate(productId, product.stock);
      } else {
        throw new BadRequestError(
          `${product.name} has ${product.stock} items in stock, order Quantity must be less than stock, you want to order ${quantity}`
        );
      }
    } else if (operation === Operation.ROLLOUT) {
      console.log("RolledOut");
      product.stock = product.stock + quantity;
      await OrderController.productQuanityUpdate(productId, product.stock);
    } else {
      throw new Error(`${product.name} is out of stock`);
    }
  }
  private static async productQuanityUpdate(productId, quantity: number) {
    console.log(quantity);
    await Product.findByIdAndUpdate(
      productId,
      {
        stock: quantity,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    )
      .then((val) => {
        console.log(`product quanity updated for ${productId} => ${val?.stock}`);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  static async cancelOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const { reason, coordinates } = req.body;
      if (!isValidId(orderId)) {
        throw new BadRequestError("Order Id not found!");
      }
      if (!reason) {
        throw new BadRequestError("reason is required for cancel the order");
      }
      const currentUser = req.currentUser?.id;

      const orderedData = await Order.findOne({ _id: orderId, user: currentUser });
      if (!orderedData) {
        throw new BadRequestError("Order Not Found!");
      }

      let trackData = await Tracking.findOne({ orderId: orderId });
      if (!trackData) {
        throw new BadRequestError("track logs not found");
      }
      if (trackData.OrderStatus === OrderStatus.ORDERED) {
        trackData.OrderStatus = OrderStatus.CANCELLED;
        trackData.comment = reason;
        await OrderController.trackLoggingHelper(
          req,
          coordinates,
          trackData.updatedBy,
          trackData._id,
          OrderStatus.CANCELLED,
          reason
        );
        await trackData.save().then((data) => {
          ResponseUtil.sendResponse(res, "Order Cancelled", data, null);
        });
      } else {
        throw new BadRequestError(`Failed to cancel the order, due to ${trackData.OrderStatus} stage`);
      }
    } catch (e: any) {
      logger.error(e);
      throw new Error(e);
    }
  }

  static async getAllOrders(req: Request, res: Response) {
    try {
      const orderDetails = await OrderController.getOrderDetails({});

      ResponseUtil.sendResponse(res, "order fetched", orderDetails, null, 200);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  static async getOrdersOfCurrentUser(req: Request, res: Response) {
    const currentUser = req.currentUser?.id;

    const isExistUser = await User.exists({ _id: currentUser });
    if (!isExistUser) {
      throw new NotFoundError("User not Exist!");
    }

    try {
      const orders = await OrderController.getOrderDetails({ user: currentUser });
      ResponseUtil.sendResponse(res, "order fetched", orders, null, 200);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  static async getMyOrderByOrderId(req: Request, res: Response) {
    const { orderId } = req.params;
    const currentUser = req.currentUser?.id;

    const isExistUser = await User.exists({ _id: currentUser });
    if (!isExistUser) {
      throw new NotFoundError("User not Exist!");
    }
    if (!isValidId(orderId)) {
      throw new BadRequestError("orderId is invalid");
    }
    try {
      const orderDetails = await OrderController.getOrderDetails({ _id: orderId, user: currentUser });
      ResponseUtil.sendResponse(res, "order fetched", orderDetails, null, 200);
    } catch (e: any) {
      throw new Error(e);
    }
  }
  static async getOrderById(req: Request, res: Response) {
    const { orderId } = req.params;
    if (!isValidId(orderId)) {
      throw new BadRequestError("orderId is invalid");
    }
    try {
      const orderDetails = await OrderController.getOrderDetails({ _id: orderId });
      ResponseUtil.sendResponse(res, "order fetched", orderDetails, null, 200);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  static async updateOrderStatus(req: Request, res: Response) {
    const { orderId } = req.params;
    const orderBody = req.body;
    const userId = req.currentUser?.id;

    const dto = new UpdateOrderStatusDTO();
    Object.assign(dto, orderBody);

    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new RequestValidationError(errors);
    }
    if (dto.coordinates.length == 0) {
      throw new BadRequestError("location [long, lat] required");
    }
    if (!isValidId(orderId)) {
      throw new BadRequestError("order Id not valid");
    }

    const trackingDetails = await Tracking.findOne({ orderId: orderId });
    if (!trackingDetails) {
      throw new NotFoundError("Not found");
    }

    const updated = await OrderController.updateTrackingStatus(trackingDetails._id, {
      OrderStatus: dto.orderStatus,
      comment: dto.comment,
      ip: OrderController.getIp(req),
      loc: {
        type: "Point",
        coordinates: dto.coordinates,
      },

      updatedBy: userId,
    });

    await OrderController.trackLoggingHelper(
      req,
      dto.coordinates,
      userId,
      trackingDetails._id,
      dto.orderStatus,
      dto.comment
    );

    ResponseUtil.sendResponse(res, "Status updated!", updated, null, 200);

    try {
    } catch (e: any) {
      throw new Error(e);
    }
  }

  static async getOrderedProductsByCount(req: Request, res: Response) {
    const data = await Order.aggregate([
      {
        $group: {
          _id: "$product",
          ordered_count: { $sum: 1 },
        },
      },
      {
        $project: {
          ordered_count: 1,
          product_info: "$_id",
          _id: 0,
        },
      },

      {
        $sort: { ordered_count: -1 },
      },
    ]);

    await Product.populate(data, {
      path: "product_info",
      populate: {
        path: "images category reviews",
      },
    });

    ResponseUtil.sendResponse(res, "ok", data);
  }
}

export function getCharges(price: number) {
  let gst = 14;
  let shippingCharge = 40.0;
  let totalPrice = price + (price * 14) / 100 + shippingCharge;
  const payableAmt = totalPrice.toFixed(2);
  return { gst, shippingCharge, payableAmt };
}
