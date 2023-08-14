import mongoose from "mongoose";

interface CategoryAttrs {
  title: string;
}
interface CategoryModel extends mongoose.Model<any> {
  build(attrs: CategoryAttrs);
}

interface CategoryDoc extends mongoose.Document {
  title: string;
}

const CategorySchema = new mongoose.Schema(
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

CategorySchema.set("timestamps", true);
CategorySchema.statics.build = (attrs: CategoryAttrs) => {
  return new Category(attrs);
};

const Category = mongoose.model<CategoryDoc, CategoryModel>("Category", CategorySchema);
export { Category, CategoryDoc };
