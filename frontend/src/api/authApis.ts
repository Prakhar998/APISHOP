import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchInfo = createAsyncThunk(
  "posts/fetchInfo",
  async (data: any) => {
    const response = await axios.post("/api/users/signup", data);
    return response.data;
  }
);
export const loginInfo = createAsyncThunk(
  "get/loginInfo",
  async (data: any) => {
    try {
      const response = await axios.post("/api/users/signin", data);
      console.log(response);
      return response.data || { customMessage: "invalid credentails" };
    } catch (error: any) {
      return error.response.data;
    }
  }
);
