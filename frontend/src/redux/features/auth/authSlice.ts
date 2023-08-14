import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";
import { updateProfile } from "./authApis";

// Define a type for the slice state
type authProps = {
  user: any;
  isError: boolean;
  isAuthenticated: boolean;
  registerLoading: boolean;
  loginLoading: boolean;
  userLoading: boolean;
  isOTP: boolean;
  otpLoading:boolean;
  message: any;
};

// Define the initial state using that type
const initialState: authProps = {
  user: null,
  isError: false,
  isAuthenticated: false,
  registerLoading: true,
  loginLoading: false,
  userLoading: true,
  otpLoading:false,
  isOTP:false,
  message: "",
};

//async register user
export const registerUser = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//async login user
export const loginUser = createAsyncThunk(
  "user/login",
  async (user: any, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//async account verify
export const userVerify = createAsyncThunk(
  "user/verify",
  async (user: any, thunkAPI) => {
    try {
      return await authService.accountVerify(user);
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//logout user
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      return await authService.logout();
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//async auth user
export const authUser = createAsyncThunk("user/auth", async (_, thunkAPI) => {
  try {
    return await authService.checkUser();
  } catch (error: any) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.registerLoading = false;
        state.isOTP = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.registerLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loginLoading = false;
        state.isOTP = false;
        state.user = action.payload.data;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginLoading = false;
        state.isError = true;
        state.isOTP = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(authUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.userLoading = false;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.userLoading = false;
        state.isAuthenticated = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;  
      })
      .addCase(updateProfile.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.userLoading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.userLoading = false;
        state.isAuthenticated = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(userVerify.pending, (state) => {
        state.otpLoading = true;
      })
      .addCase(userVerify.fulfilled, (state) => {
        state.otpLoading = false;
        state.isOTP = false;
      })
      .addCase(userVerify.rejected, (state) => {
        state.otpLoading = false;
        state.isOTP = true;
      })
  },
});

export default authSlice.reducer;
