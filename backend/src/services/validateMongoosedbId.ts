import mongoose from "mongoose";
export function isValidId(id: string) {
  const isValid = mongoose.isValidObjectId(id);
  if (!isValid) {
    return false;
  }
  return true;
}
