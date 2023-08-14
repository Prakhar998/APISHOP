/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice } from "@reduxjs/toolkit";
import { AddedSuccessfully, AlreadyAdded } from "../../../utils/constants";
import { totalClearCart } from "../../../api/checkoutApis";

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

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addItem(state, action) {
      const check = state.data?.find(
        (e: any) => e.name === action.payload.name
      );

      if (!check) {
        localStorage.setItem(
          "cartItems",
          JSON.stringify([...state.data, { ...action.payload, quantity: 1 }])
        );
        state.data = [...state.data, { ...action.payload, quantity: 1 }];
        state.status = AddedSuccessfully;
      } else {
        state.status = AlreadyAdded;
      }
    },
    deleteItem(state, action) {
      const filteredData = state.data.filter(
        (item: any) => item.id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(filteredData));
      state.data = filteredData;
    },
    increaseQuantity(state, action) {
      state.data.map((e: any) => {
        if (e.id == action.payload) {
          e.quantity = e.quantity + 1;
        }
      });
    },
    decreaseQuantity(state, action) {
      state.data.map((e: any) => {
        if (e.id == action.payload && e.quantity > 0) {
          e.quantity = e.quantity - 1;
        }
      });
    },
    clearData(state) {
      state.data = [];
      localStorage.removeItem("cartItems");
    },
    multiplyQuantityAndPrice(state, action) {
      state.data.map((e: any) => {
        if (e.id === action.payload) {
          e.sellingPrice = e.quantity * e.price;
        }
      });
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(totalClearCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(totalClearCart.fulfilled, (state) => {
      state.loading = false;
      // state.error = "";
      state.data = [];
    });
    builder.addCase(totalClearCart.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const {
  addItem,
  deleteItem,
  multiplyQuantityAndPrice,
  increaseQuantity,
  decreaseQuantity,
  clearData,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
