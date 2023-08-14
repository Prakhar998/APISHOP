import mongoose, { Schema } from "mongoose";
import { CategoryDoc } from "./categorySchema";
import { ImageDoc } from "./imageSchema";
import { ReviewDoc } from "./reviewSchema";
import { UserDoc } from "./userSchema";

interface ProductAttrs {
  name: string;
  description: string;
  price: number;
  sellingPrice: number;
  ratings: number;
  category: CategoryDoc;
  stock: number;
  createdBy: UserDoc;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs);
}

interface ProductDoc extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  sellingPrice: number;
  ratings: number;
  images?: ImageDoc[];
  category: CategoryDoc;
  stock: number;
  review?: ReviewDoc[];
  createdBy: UserDoc;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true,
      maxLength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      maxLength: [8, "Product price cannot exceed 10 characters"],
      default: 0.0,
    },
    sellingPrice: {
      type: Number,
      required: [true, "Please enter product selling price"],
      maxLength: [8, "Product price cannot exceed 10 characters"],
      default: 0.0,
    },

    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please select category for this product"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
      maxLength: [5, "Product name cannot exceed 5 characters"],
      default: 0,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    createdBy: {
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

productSchema.set("timestamps", true);
productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>("Product", productSchema);
export { Product, ProductDoc };
