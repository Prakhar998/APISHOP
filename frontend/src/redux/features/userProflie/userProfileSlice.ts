import { createSlice } from "@reduxjs/toolkit";
import { updateProfileImage, userOrderDetails } from "./userProfileApis";

// Define a type for the slice state
type authProps = {
  userProfile: any;
  isError: boolean;
  isAuthenticated: boolean;
  registerLoading: boolean;
  loginLoading: boolean;
  userLoading: boolean;
  message: any;
   userDetails:any,
};

// Define the initial state using that type
const initialState: authProps = {
  userProfile: null,
  isError: false,
  isAuthenticated: false,
  registerLoading: true,
  loginLoading: false,
  userLoading: true,
  message: "",
  userDetails:null,
};


const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: { addImage(state, action) {
    state.userDetails = action.payload;
  },},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileImage.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.userProfile = action.payload.data;
        state.isAuthenticated = true;
        state.userLoading = false;
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.userLoading = false;
        state.isAuthenticated = false;
        state.isError = true;
        state.message = action.payload;
        state.userProfile = null;
      })
      .addCase(userOrderDetails.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(userOrderDetails.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.userLoading = false;
      })
      .addCase(userOrderDetails.rejected, (state, action) => {
        state.userLoading = false;
        state.isAuthenticated = false;
        state.isError = true;
        state.message = action.payload;
        state.userProfile = null;
      })
  },
});
export const {addImage } = userProfileSlice.actions

export default userProfileSlice.reducer;
