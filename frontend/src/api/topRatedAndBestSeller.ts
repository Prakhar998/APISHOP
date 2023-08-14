import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


export const topRated = createAsyncThunk("get/topRated", async (_,thunkAPI) => {
  try {
    const response = await axios.get(
      "/api/products/filter/top-rated?page=1&perPage=5"
    );

    return response.data;
  } catch (error: any) {
    const message = error.response.data.customMessage;
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const bestSeller = createAsyncThunk("get/bestSeller", async (_,thunkAPI) => {
  try {
    const response = await axios.get("/api/products/ordered-products/count");

    return response.data;
  } catch (error: any) {
    const message = error.response.data.customMessage;
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});
