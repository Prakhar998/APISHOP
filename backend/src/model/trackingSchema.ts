import mongoose from "mongoose";
import { UserDoc } from "./userSchema";
import { OrderStatus } from "./OrderSchema";

const TrackingSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    loc: {
      type: { type: String },
      coordinates: [],
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },
    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      default: null,
    },
    OrderStatus: {
      type: String,
      requried: true,
      default: OrderStatus.AWAITINGPAYMENT,
      enum: {
        values: [
          OrderStatus.AWAITINGPAYMENT,
          OrderStatus.ORDERED,
          OrderStatus.CANCELLED,
          OrderStatus.PACKING,
          OrderStatus.SHIPPED,
          OrderStatus.OUTFORDELIVERY,
          OrderStatus.DELIVERED,
          OrderStatus.RETURN,
          OrderStatus.RETURNAPROVED,
          OrderStatus.PICKUP,
          OrderStatus.REFUND,
        ],
        message: "Please select correct Type for OrderStatus",
      },
    },
    comment: {
      type: String,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.tracking_id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

TrackingSchema.set("timestamps", true);
TrackingSchema.index({ loc: "2dsphere" });

const Tracking = mongoose.model("Tracking", TrackingSchema);
export { Tracking };
