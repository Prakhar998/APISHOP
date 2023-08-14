/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
// Define a type for the slice state
interface authProps {
  loading: boolean;
  data: any;
  status: string;
}

// Define the initial state using that type
const initialState: authProps = {
  loading: false,
  data: 0,
  status: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    totalQuantityReducer(state, action) {
      state.data = action.payload;
    },
  },
});

export const { totalQuantityReducer } = checkoutSlice.actions;
export default checkoutSlice.reducer;
