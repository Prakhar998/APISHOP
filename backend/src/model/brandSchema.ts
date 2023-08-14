import mongoose from "mongoose";

interface BrandAttrs {
  title: string;
}
interface BrandModel extends mongoose.Model<any> {
  build(attrs: BrandAttrs);
}

interface BrandDoc extends mongoose.Document {
  title: string;
}

const BrandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: null,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret._v;
      },
    },
  }
);

BrandSchema.set("timestamps", true);
BrandSchema.statics.build = (attrs: BrandAttrs) => {
  return new Brand(attrs);
};

const Brand = mongoose.model<BrandDoc, BrandModel>("Brand", BrandSchema);
export { Brand, BrandDoc };
