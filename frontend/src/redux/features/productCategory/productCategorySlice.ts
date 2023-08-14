import { createSlice } from "@reduxjs/toolkit";
import { displayAllProductCategory, getAllReview, productImageeUpload, userReview } from "../../../api/productCategoryApis";
// Define a type for the slice state
type authProps = {
  loading: boolean;
  data: any;
  error: string;
};

// Define the initial state using that type
const initialState: authProps = {
  loading: true,
  data: [],
  error: "",
};

const productCategorySlice = createSlice({
  name: "productCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(displayAllProductCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(displayAllProductCategory.fulfilled, (state, action) => {      
      state.loading = false;
      state.error = "";
      state.data = action.payload;
    });
    builder.addCase(displayAllProductCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = "error";
      state.data = `${action.payload}`;
    });
    builder.addCase(productImageeUpload.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(productImageeUpload.fulfilled, (state, action) => {      
      state.loading = false;
      state.error = "";
      state.data = action.payload;
    });
    builder.addCase(productImageeUpload.rejected, (state, action) => {
      state.loading = false;
      state.error = "error";
      state.data = `${action.payload}`;
    });
    builder.addCase(userReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userReview.fulfilled, (state) => {      
      state.loading = false;
      state.error = "";
    });
    builder.addCase(userReview.rejected, (state, action) => {
      state.loading = false;
      state.error = "error";
      state.data = `${action.payload}`;
    });
    builder.addCase(getAllReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllReview.fulfilled, (state) => {      
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getAllReview.rejected, (state, action) => {
      state.loading = false;
      state.error = "error";
      state.data = `${action.payload}`;
    });
}  
});
export default productCategorySlice.reducer;