import mongoose, { Model } from "mongoose";
import { Request, Response } from "express";

export class APIFeatures<T> {
  query: any;
  queryStr: any;
  noOfDocuments: number;
  totalRecords: number;
  constructor(query: any, queryStr: any, totalRecords?: number) {
    this.query = query;
    this.queryStr = queryStr;
    this.noOfDocuments = 0;
    this.totalRecords = totalRecords || 0;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "limit", "page", "perPage", "category", "allData"];
    removeFields.forEach((ele) => delete queryCopy[ele]);

    //advance filter for price, ratings etc
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  filterCategory() {
    const categoryQuery = { ...this.queryStr };
    if (!categoryQuery.category) {
      this.query = this.query.find({});
      return this;
    }
    if (typeof categoryQuery.category._id === "object") {
      this.query = this.query.find({
        category: {
          $in: categoryQuery.category._id,
        },
      });
      return this;
    }
    let queryStr = JSON.stringify(categoryQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination() {
    const currentPage = Number(this.queryStr.page) || 1;
    const allData = Number(this.queryStr.allData) || 0;
    let pageSize = allData == 0 ? Number(this.queryStr.perPage) || 10 : this.totalRecords;
    const offset = (currentPage - 1) * pageSize;
    this.query = this.query.skip(offset).limit(pageSize);
    return this;
  }
}
