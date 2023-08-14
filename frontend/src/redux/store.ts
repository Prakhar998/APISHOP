import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import notificationSlice from "./features/notification/notificationSlice";
import latestProductSlice from "./features/latestProduct/latestProductSlice";
import checkoutSlice from "./features/checkout/checkoutSlice";
import dashboardSlice from "./features/dashboard/dashboardSlice";
import productCategorySlice from "./features/productCategory/productCategorySlice";
import filterSlice from "./features/productFilter/filterSlice";
import checkoutApiSlice from "./features/checkout/checkoutApiSlice";
import totalQuantityReducer from "./features/checkout/checkoutTotalQuantitySlice";
import addAdress from "./features/checkout/checkoutAddressSlice";
import addCartId from "./features/checkout/checkoutCartIdSlice";
import addOrders from "./features/dashboard/dashboardOrdersSlice";
import topRatedSlice from "./features/topRatedAndBestSeller/topRatedSlice";
import bestSellerSlice from "./features/topRatedAndBestSeller/bestSellerSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    checkout: checkoutSlice,
    product: latestProductSlice,
    notification: notificationSlice,
    dashboard: dashboardSlice,
    productCategory: productCategorySlice,
    filterProducts: filterSlice,
    checkoutApis: checkoutApiSlice,
    totalquantity: totalQuantityReducer,
    checkoutAddress: addAdress,
    cartId: addCartId,
    orders: addOrders,
    topRated: topRatedSlice,
    bestSeller: bestSellerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
