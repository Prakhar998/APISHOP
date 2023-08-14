/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"

export const fetchInfo = createAsyncThunk("posts/fetchInfo", async (data: any,thunkAPI) => {
  try{
    const response = await axios.post("/api/users/signup", data)
    toast.success(response.data.message)
    return response.data || { customMessage: "invalid details" }
  }
  catch (error: any) {
    const phone = error.response.data.error.phone;
    const message = error.response.data.error.email;
    if(message && phone){
      toast.error(message,phone);
    }
    else if(message){
      toast.error(message)
    }
      else if(phone){
        toast.error(phone)
      }
    return thunkAPI.rejectWithValue(message);
  }
  
})
export const loginInfo = createAsyncThunk("get/loginInfo", async (data: any) => {
  try {
    const response = await axios.post("/api/users/signin", data)
    return response.data || { customMessage: "invalid credentails" }
  } catch (error: any) {
    return error.response.data
  }
})
export const updateProfile = createAsyncThunk("user/updateProfile", async (data: any ) => {
  try {    
    const response = await axios.put(
      `/api/users/update`,
      {
        name: data.name, 
        phone:data.phone,
      }
    );
    return response || { customMessage: "invalid call" };
  } catch (error: any) {
    return error.response.data
  }
})

