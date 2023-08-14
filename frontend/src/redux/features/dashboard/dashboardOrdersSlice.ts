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
  data: "",
  status: "",
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrders(state, action) {
      state.data = action.payload;
    },
  },
});

export const { addOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
