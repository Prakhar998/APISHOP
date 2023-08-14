import mongoose from "mongoose";
import { UserDoc } from "./userSchema";

export enum AddressType {
  HOME = "Home",
  WORK = "Work",
  OTHER = "Other",
}
interface AddressAttrs {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  landmark: string;
  extraNote: string;
  addressType: AddressType;
  isDefault: boolean;
  user: UserDoc;
}
interface AddressModel extends mongoose.Model<any> {
  build(attrs: AddressAttrs);
}

interface AddressDoc extends mongoose.Document {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  landmark: string;
  extraNote: string;
  addressType: AddressType;
  isDefault: boolean;
  user: UserDoc;
}

const AddressSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
    addressType: {
      type: String,
      required: [true, "Please select Type for this Address"],
      enum: {
        values: [AddressType.HOME, AddressType.WORK, AddressType.OTHER],
        message: "Please select correct Type for Address",
      },
    },
    isDefault: {
      type: Boolean,
      default: false,
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

AddressSchema.set("timestamps", true);
AddressSchema.statics.build = (attrs: AddressAttrs) => {
  return new Address(attrs);
};

const Address = mongoose.model<AddressDoc, AddressModel>("Address", AddressSchema);
export { Address, AddressDoc };
