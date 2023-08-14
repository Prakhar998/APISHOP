import mongoose from "mongoose";
import { validateAccountNumber } from "../services/email";
export enum BankStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}
const BankAccountSchema = new mongoose.Schema(
  {
    accountNumber: {
      type: String,
      required: true,
      validator: validateAccountNumber,
    },
    bankName: {
      type: String,
      required: true,
    },
    ifsc: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: BankStatus.PENDING,
      enum: {
        values: [BankStatus.PENDING, BankStatus.APPROVED, BankStatus.REJECTED],
        message: "Please select correct Type for Bank Status",
      },
    },

    ip: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.account_id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

BankAccountSchema.set("timestamps", true);

const BankAccount = mongoose.model("BankAccount", BankAccountSchema);
export { BankAccount };
