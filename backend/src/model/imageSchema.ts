import mongoose from "mongoose";
import { ProductDoc } from "./productSchema";

interface ImageAttrs {
  cloudinary_id: string;
  url: string;
  product: ProductDoc;
}
interface ImageModel extends mongoose.Model<any> {
  build(attrs: ImageAttrs);
}

interface ImageDoc extends mongoose.Document {
  cloudinary_id: string;
  url: string;
  product: ProductDoc;
}

const ImageSchema = new mongoose.Schema(
  {
    cloudinary_id: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.public_id = ret._id;
        delete ret._id;
      },
    },
  }
);

ImageSchema.set("timestamps", true);
ImageSchema.statics.build = (attrs: ImageAttrs) => {
  return new Image(attrs);
};

const Image = mongoose.model<ImageDoc, ImageModel>("Image", ImageSchema);
export { Image, ImageDoc };
