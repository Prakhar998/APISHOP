import { validate } from "class-validator";
import { Request, Response } from "express";
import { AppConstant } from "../constant/constant";
import { createCategory } from "../dtos/CreateCategoryDTO";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-errors";
import { Category } from "../model/categorySchema";
import { Paginator } from "../services/paginator";
import { ResponseUtil } from "../utils/Response";

export class CategoryController {
  static async createCategory(req: Request, res: Response) {
    const category = req.body;
    const categoryDto = new createCategory();
    Object.assign(categoryDto, category);
    const errors = await validate(categoryDto);
    if (errors.length > 0) {
      throw new RequestValidationError(errors);
    }

    const isExistingCategory = await Category.findOne({ title: categoryDto.title.toLowerCase() });
    if (isExistingCategory) {
      throw new BadRequestError("Category already available");
    }

    const newCategory = Category.build({
      title: categoryDto.title.toLowerCase(),
    });

    await newCategory
      .save()
      .then((val) => {
        return ResponseUtil.sendResponse(res, "Category Created!", val, null, 200);
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

  static async getAllCategories(req: Request, res: Response) {
    const { records: categories, paginationInfo } = await Paginator.paginate(Category, req);
    return ResponseUtil.sendResponse(res, "Fetch records successfully", categories, paginationInfo, 200);
  }
}
