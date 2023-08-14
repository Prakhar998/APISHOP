import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchProduct = createAsyncThunk("posts/fetchProduct", async () => {
  const response = await axios.get("/api/products/all?allData=1")
  return response.data
})