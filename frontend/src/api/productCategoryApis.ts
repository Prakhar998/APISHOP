import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const displayAllProductCategory = createAsyncThunk(
  "get/displayAllProductCategory",
  async (_,thunkAPI) => {
    try {
      const response = await axios.get("/api/admin/product/category/all");
      return response.data;
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const displayAllProducts = createAsyncThunk(
  "get/displayAllProducts",
  async (_,thunkAPI) => {
    try {
      const response = await axios.get("/api/products/all");
      return response.data;
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "get/getAllCategories",
  async (_,thunkAPI) => {
    try {
      const response = await axios.get("/api/admin/product/category/all");

      return response || { customMessage: "invalid call" };
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productImageeUpload = createAsyncThunk(
  "post/fetchImageUpload",
  async (data : {id:any,values:any},thunkAPI) => {
    try {
      const response = await axios.post(`/api/admin/product/image-upload/${data.id}`,data.values,{
        onUploadProgress:data=>{
          data
        }
      });
      return response || { customMessage: "invalid call" };
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userReview = createAsyncThunk(
  "post/userReview",
  async (data :any) => {
    console.log("data",data);
    
    try {    
      const response = await axios.post(
        `/api/products/rating/create/${data.productId.id}`,
        {
          comment: data.formData.review, 
          rating: data.userRating,
        }
      );
      return response || { customMessage: "invalid call" };
    } catch (error: any) {
      return error.response.data
    }
  }
);

export const getAllReview = createAsyncThunk(
  "get/getAllReview",
  async () => {
    try {
      const response = await axios.get("/api/products/rating/all");

      return response || { customMessage: "invalid call" };
    } catch (error: any) {
      return error.response.data;
    }
  }
);