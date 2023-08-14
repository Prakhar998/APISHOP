import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";

export const addToCart = createAsyncThunk(
  "post/addToCart",
  async (data:{ productId: any; quantity: any },thunkAPI) => {
    try {
      const response = await axios.post("/api/users/cart/add", data);

      return response.data || { customMessage: "invalid credentails" };
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCart = createAsyncThunk("get/getCart", async (_,thunkAPI) => {
  try {
    const response = await axios.get("/api/users/cart/all");
    return response.data;
  } catch (error: any) {
    const message = error.response.data.customMessage;
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteFromCart = createAsyncThunk(
  "delete/deleteFromCart",
  async (data: { productId: any },thunkAPI) => {
    try {
      const response = await axios.delete("/api/users/cart/remove", {
        data,
      });
      return response.data;
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const increaseQuantityByOne = createAsyncThunk(
  "put/increaseQuantityByOne",
  async (data:{ productId: any },thunkAPI) => {
    try {
      const response = await axios.put(
        "/api/users/cart/increase-quantity",
        data
      );

      return response.data;
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const decreaseQuantityByOne = createAsyncThunk(
  "put/decreaseQuantityByOne",
  async (data:{ productId: any },thunkAPI) => {
    try {
      const response = await axios.put(
        "/api/users/cart/decrease-quantity",
        data
      );

      return response.data;
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const currentUserApi = createAsyncThunk(
  "get/currentUserApi",
  async (_,thunkAPI) => {
    try {
      const response = await axios.get("/api/users/currentuser");
      return response.data;
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const localToCartUp = createAsyncThunk(
  "post/localToCartUp",
  async (data: [],thunkAPI) => {
    try {
      const response = await axios.post("/api/users/cart/localToCart", data);

      return response.data;
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllAddresses = createAsyncThunk(
  "get/getAllAddresses",
  async (_,thunkAPI) => {
    try {
      const response = await axios.get("/api/users/address/get");
      return response.data;
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const totalClearCart = createAsyncThunk(
  "delete/totalClearCart",
  async (_,thunkAPI) => {
    try {
      const response = await axios.delete("/api/users/clearCart");
      return response.data;
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const checkout = createAsyncThunk(
  "post/checkout",
  async (data:{
    addressId: any;
    cartId: any;
    extraNote: any;
    paymentType: any;
    coordinates: any;
  },thunkAPI) => {
    try {
      const response = await axios.post("/api/products/order/checkout", data);
      return response.data;
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addAddressApi = createAsyncThunk(
  "post/addAddress",
  async (data:{
    address: any;
    city: any;
    country: any;
    state: any;
    zipCode: any;
    landmark: any;
    addressType: any;
  }, thunkAPI) => {
    try {
      const response = await axios.post("/api/users/address/add", data);
      toast.success('Address added Successfully!');
      return response.data;
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
