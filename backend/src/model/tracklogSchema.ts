import mongoose from "mongoose";
import { UserDoc } from "./userSchema";
import { OrderStatus } from "./OrderSchema";

const TrackLogSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    loc: {
      type: { type: String },
      coordinates: [],
    },
    trackingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tracking",
      default: null,
    },
    OrderStatus: {
      type: String,
      required: true,
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
        ret.tracking_log_id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

TrackLogSchema.set("timestamps", true);
TrackLogSchema.index({ loc: "2dsphere" });

const TrackLog = mongoose.model("TrackLog", TrackLogSchema);
export { TrackLog };
