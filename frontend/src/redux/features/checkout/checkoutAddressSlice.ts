/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import {getAllAddresses,addAddressApi} from "../../../api/checkoutApis";
// Define a type for the slice state
interface authProps {
  addressLoading: boolean;
  addLoading:boolean;
  allAddresses: any;
  deliverAddress:any;
  status: string;
}

// Define the initial state using that type
const initialState: authProps = {
  addressLoading: true,
  addLoading:false,
  allAddresses: [],
  deliverAddress:null,
  status: "",
};

const checkoutAddressSlice = createSlice({
  name: "checkoutAddress",
  initialState,
  reducers: {
    addAdress(state, action) {
      state.deliverAddress = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAddresses.pending, (state) => {
      state.addressLoading = true;
    });
    builder.addCase(getAllAddresses.fulfilled, (state, action) => {
      state.addressLoading = false;
      state.allAddresses = action.payload.data;
    });
    builder.addCase(getAllAddresses.rejected, (state) => {
      state.addressLoading = false;
      state.allAddresses = [];
    });
    builder.addCase(addAddressApi.pending, (state) => {
      state.addLoading = true;
    });
    builder.addCase(addAddressApi.fulfilled, (state, action) => {
      state.addLoading = false;
      state.allAddresses = [...state.allAddresses, action.payload.data];
    });
    builder.addCase(addAddressApi.rejected, (state) => {
      state.addLoading = false;
    });
  }
});

export const { addAdress } = checkoutAddressSlice.actions;
export default checkoutAddressSlice.reducer;
