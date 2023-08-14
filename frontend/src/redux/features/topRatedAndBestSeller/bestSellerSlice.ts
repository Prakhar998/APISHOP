import { createSlice } from "@reduxjs/toolkit";

import { bestSeller} from "../../../api/topRatedAndBestSeller";

// Define a type for the slice state
type authProps = {
  data: any;
  isError: boolean;
  isAuthenticated: boolean;
  registerLoading: boolean;
  loginLoading: boolean;
  userLoading: boolean;
  message: any;
  userDetails: any;
};

// Define the initial state using that type
const initialState: authProps = {
  data: null,
  isError: false,
  isAuthenticated: false,
  registerLoading: true,
  loginLoading: false,
  userLoading: true,
  message: "",
  userDetails: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bestSeller.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(bestSeller.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isAuthenticated = true;
        state.userLoading = false;
      })
      .addCase(bestSeller.rejected, (state, action) => {
        state.userLoading = false;
        state.isAuthenticated = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      });
  },
});

export default userProfileSlice.reducer;
