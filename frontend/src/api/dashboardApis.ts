import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const displayAllProducts = createAsyncThunk(
  "get/displayAllProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/products/all?allData=1");
      return response.data;
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllUser = createAsyncThunk(
  "get/getAllUser",
  async (pageNumber: any, thunkAPI) => {
    try {
      const response = await axios.get(
        `/api/admin/user/all?perPage=10&page=${pageNumber + 1}`
      );

      return response.data;
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "delete/deleteUser",
  async (id: any, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/admin/user/delete/${id}`);
      return response || { customMessage: "invalid call" };
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "post/addProduct",
  async (values: any, thunkAPI) => {
    // console.log(values);
    try {
      const response = await axios.post("/api/products/new", {
        name: values.name,
        description: values.description,
        price: values.price,
        ratings: values.ratings,
        categoryId: values.category,
        stock: values.stock,
      });
      return response || { customMessage: "invalid call" };
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "delete/deleteProduct",
  async (id: any, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/admin/product/delete/${id}`);
      return response || { customMessage: "invalid call" };
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "get/getAllCategories",
  async (_, thunkAPI) => {
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
export const updateProduct = createAsyncThunk(
  "update/updateProduct",
  async (data: { id: any; values: any; category: any }, thunkAPI) => {
    try {
      const response = await axios.put(`/api/products/update/${data.id}`, {
        name: data.values.name,
        description: data.values.description,
        price: data.values.price,
        ratings: data.values.ratings,
        categoryId: data.category,
        stock: data.values.stock,
      });
      return response || { customMessage: "invalid call" };
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "get/getAllOrders",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/products/order/all");

      return response.data;
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getOrdersById = createAsyncThunk(
  "get/getOrdersById",
  async (id: any, thunkAPI) => {
    try {
      const response = await axios.get(`/api/products/order/search/${id}`);
      return response.data;
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const makeAdmin = createAsyncThunk(
  "user/set-admin",
  async (data: { id: any; values: any }, thunkAPI) => {
    try {
      const response = await axios.put(`/api/admin/user/set-admin/${data.id}`, {
        isAdmin: data.values,
      });
      const successMsg = response.data.message;
      data.values
        ? toast.success(successMsg)
        : toast.error("User is already an admin");
      return response || { customMessage: "invalid call" };
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const activeUser = createAsyncThunk(
  "user/active",
  async (data: { id: any; values: any }, thunkAPI) => {
    try {
      const response = await axios.put(`/api/admin/user/unblock/${data}`, {});
      toast.success(response.data.message);
      return response || { customMessage: "invalid call" };
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const inActiveUser = createAsyncThunk(
  "user/inactive",
  async (data: { id: any; values: any }, thunkAPI) => {
    try {
      const response = await axios.put(`/api/admin/user/block/${data}`, {});
      toast.success(response.data.message);
      return response || { customMessage: "invalid call" };
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const changeStatus = createAsyncThunk(
  "update/changeStatus",
  async (data: { id: any; OrderStatus: any }, thunkAPI) => {
    console.log(data);
    try {
      const response = await axios.put(
        `/api/admin/order-status-update/${data.id}`,
        {
          orderStatus: data.OrderStatus, //["ordered", "packing","shipped","out_for_delivery","delivered"]
          coordinates: [88.4101, 22.6076], //[long, lat]
          comment: "Your orsss  der is ready to shipped",
        }
      );
      return response || { customMessage: "invalid call" };
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
