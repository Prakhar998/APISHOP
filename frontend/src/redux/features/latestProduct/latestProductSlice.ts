/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { fetchProduct } from "./productService";

// Define a type for the slice state
interface authProps {
  loading: boolean;
  data: any;
  error: string;
}

// Define the initial state using that type
const initialState: authProps = {
  loading: true,
  data: [],
  error: "",
};

const latestProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        const randomProduct = action.payload.data.sort(() => Math.random() - 0.5)
        state.loading = false;
        state.data = randomProduct.slice(0,10);
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.loading = false;
        state.error = " true";
      });
  },
});

export default latestProductSlice.reducer;
