import { Request } from "express";
import { Model } from "mongoose";
import { User } from "../model/userSchema";

interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  pages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
export class Paginator {
  static async paginate<T>(model: Model<T>, req: Request, query?: {}, projection?: {}, option?: {}) {
    let page = Number(req.query.page) || 1;
    let pageSize = Number(req.query.perPage) || 10;
    const offset = (page - 1) * pageSize;
    const records = await model
      .find(query ?? {}, projection, option)
      .skip(offset)
      .limit(pageSize);
    const totalRecords = await model.count({});
    const pages = Math.ceil(totalRecords / pageSize);
    const currentPage = offset / pageSize + 1;
    const hasNext = currentPage < pages;
    const hasPrevious = currentPage > 1;
    const paginationInfo: PaginationInfo = {
      currentPage: page,
      pageSize: pageSize,
      totalRecords,
      pages,
      hasNext,
      hasPrevious,
    };

    return { records, paginationInfo };
  }

  static paginateWithArgs(req: Request, totalRecords: number) {
    let allData = Number(req.query.allData) || 0;
    let page = Number(req.query.page) || 1;
    let pageSize = allData == 0 ? Number(req.query.perPage) || 10 : totalRecords;
    const pages = Math.ceil(totalRecords / pageSize);
    const offset = (page - 1) * pageSize;
    const currentPage = offset / pageSize + 1;
    const hasNext = currentPage < pages;
    const hasPrevious = currentPage > 1;
    const paginationInfo: PaginationInfo = {
      currentPage: page,
      pageSize: pageSize,
      totalRecords,
      pages,
      hasNext,
      hasPrevious,
    };

    return paginationInfo;
  }
}
