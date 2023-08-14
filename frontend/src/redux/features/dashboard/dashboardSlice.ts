import { createSlice } from "@reduxjs/toolkit";
import {
  displayAllProducts,
  addProduct,
  deleteProduct,
  getAllCategories,
  updateProduct,
  getAllUser,
  deleteUser,
  makeAdmin,
  activeUser,
  inActiveUser,
  getAllOrders,
  getOrdersById,
  changeStatus,
} from "../../../api/dashboardApis";
// Define a type for the slice state
type authProps = {
  loading: boolean;
  data: any;
  error: string;
  inActiveUser?: boolean;
  activeUser?: boolean;
};

// Define the initial state using that type
const initialState: authProps = {
  loading: false,
  data: [],
  error: "",
  inActiveUser: false,
  activeUser: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(displayAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(displayAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload;
    });
    builder.addCase(displayAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = "error";
      state.data = `${action.payload}`;
    });
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload;
      console.log(state, action.payload);
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = "error";
      state.data = `${action.payload}`;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = "error";
      state.data = `${action.payload}`;
    });
    builder.addCase(getAllCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload;
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = "error";
      state.data = `${action.payload}`;
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = "error";
      state.data = `${action.payload}`;
    });
    builder.addCase(getAllUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload;
    });
    builder.addCase(getAllUser.rejected, (state, action) => {
      state.loading = false;
      state.error = "error";
      state.data = `${action.payload}`;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = "error";
      state.data = `${action.payload}`;
    });
    builder.addCase(makeAdmin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(makeAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload;
    });
    builder.addCase(makeAdmin.rejected, (state, action) => {
      state.loading = false;
      state.error = "error";
      state.data = `${action.payload}`;
    });

    builder.addCase(getAllOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = "error";
      state.data = `${action.payload}`;
    });

    builder.addCase(inActiveUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(inActiveUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload;
      state.inActiveUser = true;
    });
    builder.addCase(inActiveUser.rejected, (state, action) => {
      state.loading = false;
      state.error = "error";
      state.data = `${action.payload}`;
      state.inActiveUser = true;
    });

    builder.addCase(activeUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(activeUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload;
      state.activeUser = true;
    });
    builder.addCase(activeUser.rejected, (state, action) => {
      state.loading = false;
      state.error = "error";
      state.data = `${action.payload}`;
      state.activeUser = true;
    });
    builder.addCase(getOrdersById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrdersById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload;
      state.activeUser = true;
    });
    builder.addCase(getOrdersById.rejected, (state, action) => {
      state.loading = false;
      state.error = "error";
      state.data = `${action.payload}`;
      state.activeUser = true;
    });
    builder.addCase(changeStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changeStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload;
      state.activeUser = true;
    });
    builder.addCase(changeStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = "error";
      state.data = `${action.payload}`;
      state.activeUser = true;
    });
  },
});
export default dashboardSlice.reducer;
