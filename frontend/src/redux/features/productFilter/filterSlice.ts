import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import filterService from "./filterService";
import { toast } from "react-toastify";

// Define a type for the slice state
type filterProps = {
  productLoading:boolean;
  categoryLoading:boolean;
  filterLoading:boolean;
  products:any;
  filterResults:[];
  categories:any;
};

// Define the initial state using that type
const initialState: filterProps = {
    productLoading:true,
    categoryLoading:true,
    filterLoading:false,
    products:null,
    filterResults:[],
    categories:null
};

//async fetch products
export const fetchFilterProducts = createAsyncThunk(
  "products/all",
  async (searchParms:any, thunkAPI) => {
    try {
      return await filterService.getProducts(searchParms);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//async fetch categories
export const fetchCategory = createAsyncThunk(
  "category/all",
  async (_, thunkAPI) => {
    try {
      return await filterService.getCategories();
    } catch (error: any) {
      const message = error.response.data.customMessage;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


const filterSlice = createSlice({
  name: "filterProducts",
  initialState,
  reducers: {
    filterByCategory: (state, action)=>{
        const filterProducts:any = [];

         action.payload.map((id:any)=>{
            state.products.data.map((product:any)=>{

                if(product.category.id == id){
                    filterProducts.unshift(product);
                }
            })
        })

      state.filterResults = filterProducts;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilterProducts.pending, (state) => {
        // if(state.products.data.length>0 || state.products!=null){
        //   state.filterLoading = true;
        // }else{
        //   state.productLoading = true;
        // }
        state.productLoading = true;
      })
      .addCase(fetchFilterProducts.fulfilled, (state, action) => {
        state.productLoading = false;
        state.filterLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchFilterProducts.rejected, (state) => {
        state.productLoading = false;
        state.filterLoading = false;
        state.products = null;
      })
      .addCase(fetchCategory.pending, (state) => {
        // state.categoryLoading = (state.products!=null || state.products.data.length>0) ? false :true;
        // state.filterLoading = (state.products!=null || state.products.data.length>0) ? true :false;
        state.categoryLoading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.filterLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategory.rejected, (state) => {
        state.categoryLoading = false;
        state.filterLoading = false;
        state.categories = null;
      })
  }
});

export const { filterByCategory } = filterSlice.actions;

export default filterSlice.reducer;
