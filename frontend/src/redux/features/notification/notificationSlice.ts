/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AppProps {
  notificationState: boolean
  message: string
  severity: any
}

const initialState: AppProps = {
  notificationState: false,
  message: "",
  severity: "success"
}

const NotificationSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setNotification (state: AppProps, action: PayloadAction<any>) {
      state.notificationState = action.payload.notificationState
      state.message = action.payload.message
      state.severity = action.payload.severity
    }
  }

})

export default NotificationSlice.reducer
export const { setNotification } = NotificationSlice.actions
