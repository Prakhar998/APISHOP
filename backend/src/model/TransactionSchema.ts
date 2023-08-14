import mongoose from "mongoose";
import { UserDoc } from "./userSchema";
export enum PaymentType {
  COD = "cod",
  CARD = "card",
}
export enum PaymentStatus {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "Failed",
}

const TransactionSchema = new mongoose.Schema(
  {
    paymentType: {
      type: String,
      required: [true, "Please select Type for Payment"],
      default: PaymentType.COD,
      enum: {
        values: [PaymentType.COD, PaymentType.CARD],
        message: "Please select correct Type for Payment",
      },
    },
    ip: {
      type: String,
      required: true,
    },
    loc: {
      type: { type: String },
      coordinates: [],
    },
    amount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    paymentStatus: {
      type: String,
      default: PaymentStatus.PENDING,
      enum: {
        values: [PaymentStatus.PENDING, PaymentStatus.SUCCESS, PaymentStatus.FAILED],
        message: "Please select correct Type for PaymentStatus",
      },
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
        ret.transaction_id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

TransactionSchema.set("timestamps", true);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export { Transaction };
