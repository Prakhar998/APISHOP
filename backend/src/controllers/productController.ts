import { Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found";
import { Category } from "../model/categorySchema";
import { Product } from "../model/productSchema";
import { Review } from "../model/reviewSchema";
import { User } from "../model/userSchema";
import { Paginator } from "../services/paginator";
import { isValidId } from "../services/validateMongoosedbId";
import { ResponseUtil } from "../utils/Response";
import { cloudinaryInstance } from "../services/cloudinary";
import { Image } from "../model/imageSchema";
import { APIFeatures } from "../services/APIFeatures";
import { check_env_isExist } from "../config/dbConnect";
import { AppConstant } from "../constant/constant";
import logger from "../utils/logging";

export class ProductController {
  static async createProduct(req: Request, res: Response) {
    const product = req.body;
    const user = await User.findById(req?.currentUser?.id);
    const category = await Category.findById(product.categoryId);
    if (!category) {
      throw new BadRequestError("category not exist");
    }
    const newProduct = await Product.build({
      name: product.name,
      description: product.description,
      price: product.price,
      sellingPrice: product.sellingPrice ?? product.price,
      ratings: product.ratings,
      category: category.id,
      stock: product.stock,
      createdBy: user.id,
    });

    await newProduct
      .save()
      .then((prod) => {
        return ResponseUtil.sendResponse(res, "Product Created Successfully", prod, null, 201);
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          let errors = {};
          Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message;
          });
          return ResponseUtil.sendError(res, "ValidationError", 422, errors);
        } else {
          throw new BadRequestError(err);
        }
      });
  }

  static async uploadProductImageByProductId(req: Request, res: Response) {
    let imageUrlList: any[] = [];
    const mainFolder_nev = check_env_isExist(
      process.env.MAIN_FOLDER_UPLOAD_FOR_PRODUCTS,
      AppConstant.MAIN_FOLDER_UPLOAD_MSG
    );

    const myFiles = req.files;
    const { productId } = req.params;
    if (!myFiles) {
      throw new BadRequestError("at least 1 file required!");
    }
    const product = await Product.findById(productId);
    if (!product) {
      throw new NotFoundError("product not found!");
    }
    for (let i in req.files) {
      let localFilePath = req.files[i].path;
      let originalname = req.files[i].originalname;
      let result = await cloudinaryInstance.uploadImage(localFilePath, originalname, mainFolder_nev);
      imageUrlList.push(result);
    }

    if (imageUrlList.length === 0) {
      throw new Error("Something went wrong");
    } else {
      for (let cloudinaryObjectIndex in imageUrlList) {
        const image = Image.build({
          cloudinary_id: imageUrlList[cloudinaryObjectIndex].public_id,
          url: imageUrlList[cloudinaryObjectIndex].url,
          product: product._id,
        });

        await image.save();
      }
    }

    const productData = await Image.find({ product: product._id }).select({ cloudinary_id: 1, url: 1 });
    await Product.findByIdAndUpdate(productId, {
      images: productData,
    }).then((val) => {
      ResponseUtil.sendResponse(res, "uploaded successfully", productData, null, 200);
    });
  }

  static async deleteProductImageByPublicId(req: Request, res: Response) {
    const { productId } = req.params;
    const { public_id } = req.body;
    if (!isValidId(productId)) {
      throw new BadRequestError("Invalid Product Id");
    }
    if (!isValidId(public_id)) {
      throw new BadRequestError("Invalid public_id");
    }

    try {
      const isProductExist = await Product.exists({ _id: productId });
      if (!isProductExist) {
        throw new NotFoundError("product not found!");
      }
      const image = await Image.findById(public_id);
      if (!image) {
        throw new NotFoundError("Image not exist");
      }

      await cloudinaryInstance.removeFromCloudinary(image.cloudinary_id).then(async (_) => {
        await Image.deleteOne({ _id: image._id }).then((val) => {
          ResponseUtil.sendResponse(res, "deleted successfully", null, null, 200);
        });
      });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  static async updateProduct(req: Request, res: Response) {
    const { name, description, price, sellingPrice, categoryId, stock } = req.body;
    const { productId } = req.params;
    if (!isValidId(productId)) {
      throw new BadRequestError("Product id not valid");
    }
    if (categoryId) {
      if (!isValidId(categoryId)) {
        throw new BadRequestError("category id not valid");
      }
      const categoryDetails = await Category.findById(categoryId);
      if (!categoryDetails) {
        throw new NotFoundError("category not found!");
      }
    }

    await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        price,
        sellingPrice,
        category: categoryId,
        stock,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    )
      .then((val) => {
        ResponseUtil.sendResponse(res, "Product has been updated successfully", val, null, 200);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  static async getAllProducts(req: Request, res: Response) {
    const totalRecords = await Product.countDocuments();

    const apiFeatures = new APIFeatures(
      Product.find()
        .populate({
          path: "category images",
        })
        .populate({
          path: "reviews",
          populate: {
            path: "user",
            select: { name: 1, avatar: 1, isActive: 1 },
          },
        }),
      req.query
    )
      .search()
      .filter()
      .filterCategory()
      .pagination();

    await Product.populate(apiFeatures, { path: "category" });

    await apiFeatures.query.then(async (product) => {
      for (let index in product) {
        const productImage = await Image.find({ product: product[index]._id });
        product[index].images = productImage;
      }
      const paginationInfo = Paginator.paginateWithArgs(req, totalRecords);

      return ResponseUtil.sendResponse(res, "Products Fetched Successfully", product, paginationInfo, 200);
    });

    // await Product.find()
    //   .populate("reviews category")
    //   .then(async (product) => {
    //     for (let index in product) {
    //       const productImage = await Image.find({ product: product[index]._id });
    //       product[index].images = productImage;
    //     }
    //     return ResponseUtil.sendResponse(res, "Products Fetched Successfully", product, null, 200);
    //   });
  }

  // static async getProductsByCategory(req: Res);

  static async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    if (!isValidId(id)) {
      throw new NotFoundError("Product is invalid");
    }
    const productImage = await Image.find({ product: id });
    await Product.findById(id)
      .populate({
        path: "category images",
      })
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: { name: 1, avatar: 1, isActive: 1 },
        },
      })
      .then((prod) => {
        if (!prod) {
          throw new NotFoundError("product not found");
        }

        prod.images = productImage;
        return ResponseUtil.sendResponse(res, "product fetched successfully", prod, null, 200);
      });
  }

  static async getRatings(req: Request, res: Response) {
    const { records: reviews, paginationInfo } = await Paginator.paginate(Review, req);
    return ResponseUtil.sendResponse(res, "Fetch records successfully", reviews, paginationInfo, 200);
  }
  static async getBestRatedProducts(req: Request, res: Response) {
    const { filterProducts: bestRatedProducts, paginationInfo } = await ProductController.filterProductHelper(
      req,
      {},
      {},
      { sort: { ratings: -1 } }
    );
    return ResponseUtil.sendResponse(res, "Fetch records successfully", bestRatedProducts, paginationInfo, 200);
  }
  static async getHighPriceProducts(req: Request, res: Response) {
    const { filterProducts: highPriceProducts, paginationInfo } = await ProductController.filterProductHelper(
      req,
      {},
      {},
      { sort: { price: -1 } }
    );
    return ResponseUtil.sendResponse(res, "Fetch records successfully", highPriceProducts, paginationInfo, 200);
  }
  static async getLowPriceProducts(req: Request, res: Response) {
    const { filterProducts: highPriceProducts, paginationInfo } = await ProductController.filterProductHelper(
      req,
      {},
      {},
      { sort: { price: 1 } }
    );
    return ResponseUtil.sendResponse(res, "Fetch records successfully", highPriceProducts, paginationInfo, 200);
  }

  private static async filterProductHelper(req: Request, query?: {}, projection?: {}, option?: {}) {
    try {
      const { records: filterProducts, paginationInfo } = await Paginator.paginate(
        Product,
        req,
        query,
        projection,
        option
      );
      await Product.populate(filterProducts, { path: "images reviews category" });

      return { filterProducts, paginationInfo };
    } catch (e: any) {
      logger.error(e);
      throw new Error("Failed to fetch Data!");
    }
  }

  static async deleteRating(req: Request, res: Response) {
    const { ratingId, productId } = req.body;
    if (!isValidId(ratingId) && !isValidId(productId)) {
      throw new BadRequestError("rating Id is invalid");
    }
    const session = await Product.startSession();
    session.startTransaction();
    try {
      const reviews = await Review.findById(ratingId);
      if (!reviews) {
        throw new NotFoundError("Rating not found");
      }

      const product = await Product.findById(productId);
      if (!product) {
        throw new NotFoundError("product not found!");
      }

      await Product.findByIdAndUpdate(
        productId,
        {
          $pullAll: {
            review: [{ id: reviews.id }],
          },
        },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      ).then(async (val) => {
        await Review.findByIdAndDelete(reviews.id);
        await ProductController.updateRatingOfProduct(productId);
        await session.commitTransaction();
        session.endSession();
        ResponseUtil.sendResponse(res, "Rating deleted successfully", null, null, 200);
      });
    } catch (err: any) {
      session.abortTransaction();
      if (err.name === "ValidationError") {
        let errors = {};
        Object.keys(err.errors).forEach((key) => {
          errors[key] = err.errors[key].message;
        });
        return ResponseUtil.sendError(res, "ValidationError", 422, errors);
      } else {
        throw new BadRequestError(err);
      }
    }
  }

  private static async updateRatingOfProduct(productId) {
    try {
      let updatedRating = 0;
      const products = await Product.findById(productId).populate({ path: "reviews" });
      let reviewCount = products!["reviews"].length ?? 0;
      if (reviewCount === 0) {
        updatedRating = 0;
      } else {
        let totalRating = products!["reviews"].map((rate) => rate["rating"]).reduce((acc, next) => acc + next);
        updatedRating = totalRating / reviewCount;
      }

      const data = await Product.findByIdAndUpdate(productId, { ratings: Number(updatedRating.toFixed(1)) });
      return data;
    } catch (e: any) {
      logger.error(e);
      throw new Error(e);
    }
  }

  static async postRating(req: Request, res: Response) {
    const rating = req.body;
    const productId = req.params.productId;
    if (!isValidId(productId)) {
      throw new BadRequestError("product id invalid");
    }
    const product = await Product.findById(productId);
    if (!product) {
      throw new NotFoundError("Product not found!");
    }
    const user = await User.findById(req?.currentUser?.id);
    if (!user) {
      throw new NotFoundError("User not found!");
    }

    const createRating = await Review.build({
      user: user.id,
      rating: rating.rating,
      comment: rating.comment,
    });
    const session = await Product.startSession();
    session.startTransaction();

    try {
      const postedRating = await createRating.save();
      await Product.findByIdAndUpdate(
        product.id,
        { $push: { reviews: postedRating } },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      ).then(async (val) => {
        await ProductController.updateRatingOfProduct(productId);
        session.commitTransaction();
        session.endSession();
        ResponseUtil.sendResponse(res, "Rating updated successfully", null, null, 200);
      });
    } catch (err: any) {
      session.abortTransaction();
      if (err.name === "ValidationError") {
        let errors = {};
        Object.keys(err.errors).forEach((key) => {
          errors[key] = err.errors[key].message;
        });
        return ResponseUtil.sendError(res, "ValidationError", 422, errors);
      } else {
        throw new BadRequestError(err);
      }
    }
  }
}
