import { User } from "../model/userSchema";
import { Paginator } from "../services/paginator";
import { ResponseUtil } from "../utils/Response";
import { Request, Response } from "express";
import { NotFoundError } from "../errors/not-found";
import { BadRequestError } from "../errors/bad-request-error";
import { isValidId } from "../services/validateMongoosedbId";
import { Product } from "../model/productSchema";
import { Review } from "../model/reviewSchema";

export class AdminController {
  static async getUsers(req: Request, res: Response) {
    const { records: users, paginationInfo } = await Paginator.paginate(User, req);
    return ResponseUtil.sendResponse(res, "Fetch records successfully", users, paginationInfo, 200);
  }

  static async findUser(req: Request, res: Response) {
    const email = req.query.email;
    const phone = req.query.phone;

    const user = await User.findOne({
      $or: [
        {
          email: email,
        },
        {
          phone: phone,
        },
      ],
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return ResponseUtil.sendResponse(res, "User found!", user, null, 200);
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    if (!isValidId(id)) {
      throw new BadRequestError("Id is Invalid");
    }
    if (id === req?.currentUser?.id) {
      throw new BadRequestError("You can not delete your own profile");
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundError("user not exist,can not delete at this  time");
    }
    return ResponseUtil.sendResponse(res, "User deleted successfully", deletedUser, null, 200);
  }

  static async blockUser(req: Request, res: Response) {
    const { id } = req.params;
    if (!isValidId(id)) {
      throw new BadRequestError("Id is Invalid");
    }
    if (id === req?.currentUser?.id) {
      throw new BadRequestError("You can not deactivate your own profile");
    }
    const blockedUser = await User.findByIdAndUpdate(id, { isActive: false });
    if (!blockedUser) {
      throw new Error("user not exist");
    }
    return ResponseUtil.sendResponse(res, "User blocked successfully", blockedUser, null, 200);
  }

  static async setAdminUser(req: Request, res: Response) {
    const { id } = req.params;
    const { isAdmin } = req.body;
    if (!isValidId(id)) {
      throw new BadRequestError("Invalid user");
    }
    if (id === req.currentUser?.id) {
      throw new BadRequestError("You can not change your own role");
    }
    const user = await User.findByIdAndUpdate(id, { isAdmin });
    if (!user) {
      throw new Error("User not exist");
    }
    return ResponseUtil.sendResponse(res, "Updated successfully", null, null, 200);
  }
  static async unblockUser(req: Request, res: Response) {
    const { id } = req.params;
    if (!isValidId(id)) {
      throw new BadRequestError("Id is invalid");
    }
    if (id === req?.currentUser?.id) {
      throw new BadRequestError("You can not deactivate your own profile");
    }
    const unblockedUser = await User.findByIdAndUpdate(id, { isActive: true });
    if (!unblockedUser) {
      throw new Error("user not exist");
    }
    return ResponseUtil.sendResponse(res, "User unblocked successfully", unblockedUser, null, 200);
  }
  static async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    if (!isValidId(id)) {
      throw new NotFoundError("product not exist");
    }

    const product = await Product.findById(id);
    if (!product) {
      throw new NotFoundError("product not exist");
    }

    try {
      if (product["reviews"].length > 0) {
        for (let reviewId of product["reviews"]) {
          await Product.findByIdAndDelete(product.id, {
            $pull: {
              review: [{ id: reviewId }],
            },
          }).then(async (val) => {
            await Review.findByIdAndDelete(reviewId);
            ResponseUtil.sendResponse(res, "product deleted successfully", null, null, 200);
          });
        }
      }
      await Product.findByIdAndDelete(product.id).then(async (val) => {
        ResponseUtil.sendResponse(res, "product deleted successfully", null, null, 200);
      });
    } catch (err: any) {
      if (err.name === "ValidationError") {
        let errors = {};
        Object.keys(err.errors).forEach((key) => {
          errors[key] = err.errors[key].message;
        });
        return ResponseUtil.sendError(res, "ValidationError", 422, errors);
      } else {
        console.log(err);
        throw new BadRequestError("Something went wrong");
      }
    }
  }
}
