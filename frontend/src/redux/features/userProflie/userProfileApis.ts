/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const updateProfileImage = createAsyncThunk("user/updateProfileImage", async (data: any ) => {
  try {
    
    const response = await axios.post(
      "/api/users/upload-user-image",data.values
    );
    return response || { customMessage: "invalid call" };
  } catch (error: any) {
    return error.response.data
  }
})
export const userOrderDetails = createAsyncThunk("user/OrderDetails", async () => {
  try {
    const response = await axios.get("/api/products/order/my-orders")
    return response.data || { customMessage: "invalid credentails" }
  } catch (error: any) {
    return error.response.data
  }
})
