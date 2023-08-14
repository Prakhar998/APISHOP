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

const cartIdSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addCartId(state, action) {
      state.data = action.payload;
    },
  },
});

export const { addCartId } = cartIdSlice.actions;
export default cartIdSlice.reducer;
