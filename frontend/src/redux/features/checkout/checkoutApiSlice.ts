import { createSlice } from "@reduxjs/toolkit";

import {
  addAddressApi,
  addToCart,
  checkout,
  currentUserApi,
  decreaseQuantityByOne,
  deleteFromCart,
  getCart,
  increaseQuantityByOne,
  totalClearCart,
  localToCartUp,
} from "../../../api/checkoutApis";

// Define a type for the slice state
interface authProps {
  loading: boolean;
  data: any;
  status: string;
}

// Define the initial state using that type
const initialState: authProps = {
  loading: false,
  data: localStorage?.cartItems ? JSON.parse(localStorage?.cartItems) : [],
  status: "",
};
const checkoutApiSlice = createSlice({
  name: "checkoutApis",
  initialState,
  reducers: {
    clearCheckoutAPIData(state) {
      state.data = [];
      localStorage.removeItem("cartItems");
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.loading = false;
      // state.error = "";
      state.data = action.payload;
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.loading = false;
      // state.error = "error";
      //state.data = `${action.payload}`;
    });
    builder.addCase(getCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.loading = false;
      // state.error = "";
      state.data = action.payload;
    });
    builder.addCase(getCart.rejected, (state) => {
      state.loading = false;
      // state.error = "error";
      //state.data = `${action.payload}`;
    });
    builder.addCase(totalClearCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(totalClearCart.fulfilled, (state) => {
      state.loading = false;
      state.data = [];
      localStorage.removeItem("cartItems");
    });
    builder.addCase(totalClearCart.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteFromCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteFromCart.fulfilled, (state, action) => {
      state.loading = false;
      // state.error = "";
      state.data = action.payload;
    });
    builder.addCase(deleteFromCart.rejected, (state) => {
      state.loading = false;
      // state.error = "error";
      //state.data = `${action.payload}`;
    });
    builder.addCase(increaseQuantityByOne.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(increaseQuantityByOne.fulfilled, (state, action) => {
      state.loading = false;
      // state.error = "";
      state.data = action.payload;
    });
    builder.addCase(increaseQuantityByOne.rejected, (state) => {
      state.loading = false;
      // state.error = "error";
      //state.data = `${action.payload}`;
    });
    builder.addCase(decreaseQuantityByOne.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(decreaseQuantityByOne.fulfilled, (state, action) => {
      state.loading = false;
      // state.error = "";
      state.data = action.payload;
    });
    builder.addCase(decreaseQuantityByOne.rejected, (state) => {
      state.loading = false;
      // state.error = "error";
      //state.data = `${action.payload}`;
    });
    builder.addCase(currentUserApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(currentUserApi.fulfilled, (state, action) => {
      state.loading = false;
      // state.error = "";
      state.data = action.payload;
    });
    builder.addCase(currentUserApi.rejected, (state) => {
      state.loading = false;
      // state.error = "error";
      //state.data = `${action.payload}`;
    });
    builder.addCase(localToCartUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(localToCartUp.fulfilled, (state, action) => {
      state.loading = false;
      // state.error = "";
      state.data = action.payload;
    });
    builder.addCase(localToCartUp.rejected, (state) => {
      state.loading = false;
      // state.error = "error";
      //state.data = `${action.payload}`;
    });
    builder.addCase(checkout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkout.fulfilled, (state, action) => {
      state.loading = false;
      // state.error = "";
      state.data = action.payload;
    });
    builder.addCase(checkout.rejected, (state) => {
      state.loading = false;
      // state.error = "error";
      //state.data = `${action.payload}`;
    });
    builder.addCase(addAddressApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addAddressApi.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(addAddressApi.rejected, (state) => {
      state.loading = false;
      // state.error = "error";
      //state.data = `${action.payload}`;
    });
  },
});

export const {clearCheckoutAPIData} = checkoutApiSlice.actions;
export default checkoutApiSlice.reducer;
