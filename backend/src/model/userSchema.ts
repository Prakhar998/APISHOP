import mongoose, { Schema } from "mongoose";
import { validateEmail, validatePhone } from "../services/email";
import { Password } from "../services/password";

export interface MulterRequest extends Request {
  file: any;
}

interface UserAttrs {
  name: string;
  phone: string;
  avatar: any;
  email: string;
  password: string;
  isAdmin: boolean;
  loginIp: string | undefined;
}

interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      validate: validateEmail,
    },
    phone: {
      type: String,
      required: true,
      validate: validatePhone,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    loginIp: {
      type: String,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: false,
    },
    cart: [{ type: Schema.Types.ObjectId, ref: "Cart" }],
    address: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],

    lastLoginAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

UserSchema.set("timestamps", true);
UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});
UserSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);
export { User, UserDoc };
