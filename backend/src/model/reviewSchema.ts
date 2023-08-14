import mongoose, { Schema } from "mongoose";
import { UserDoc } from "./userSchema";

interface ReviewAttrs {
  user: UserDoc;
  rating: number;
  comment: string;
}
interface ReviewDoc extends mongoose.Document {
  user: UserDoc;
  rating: number;
  comment: string;
}

interface ReviewModel extends mongoose.Model<ReviewDoc> {
  build(attrs: ReviewAttrs): ReviewDoc;
}
const ReviewSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
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

ReviewSchema.set("timestamps", true);
ReviewSchema.statics.build = (attrs: ReviewAttrs) => {
  return new Review(attrs);
};
const Review = mongoose.model<ReviewDoc, ReviewModel>("Review", ReviewSchema);
export { Review, ReviewDoc };
