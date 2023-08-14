import mongoose from "mongoose";
import { AddressDoc } from "./addressSchema";
import { UserDoc } from "./userSchema";

export enum OrderStatus {
  AWAITINGPAYMENT = "awaiting payment",
  ORDERED = "ordered",
  CANCELLED = "cancelled",
  PACKING = "packing",
  SHIPPED = "shipped",
  OUTFORDELIVERY = "Out_for_delivery",
  DELIVERED = "delivered",
  RETURN = "return",
  RETURNAPROVED = "return approved",
  PICKUP = "pickup",
  REFUND = "refund",
}

const OrderSchema = new mongoose.Schema(
  {
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    transaction_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },
    price: {
      default: 0,
      type: Number,
    },

    quantity: {
      type: Number,
      default: 0,
    },
    subTotal: {
      default: 0,
      type: Number,
    },

    trackingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tracking",
      default: null,
    },

    extraNote: {
      type: String,
      default: null,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

OrderSchema.set("timestamps", true);

const Order = mongoose.model("Order", OrderSchema);
export { Order };
