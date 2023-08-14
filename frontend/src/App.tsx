import { FC, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import theme from "./utils/customTheme";
import HomePage from "./components/HomePage/HomePage";
import ProductSection from "./components/productDetails/ProductSection";
import ProductCategory from "./components/productCategory/ProductCategory";
import RegisterForm from "./forms/RegisterForm";
import LoginForm from "./forms/LoginForm";
import DashboardRoutes from "./components/DashBoard/DashboardRoutes";
import { authUser } from "./redux/features/auth/authSlice";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./components/errorPage/ErrorPage";
import ProtectedRoute from "./utils/PrivateRoutes";
import Checkout from "./components/checkout";
import Shipping from "./components/checkout/Shipping";
import { AppDispatch } from "./redux/store";
import { displayAllProductCategory } from "./api/productCategoryApis";
import { fetchProduct } from "./redux/features/latestProduct/productService";
import User from "./components/UserProfile/User";
import ProtectedDashboard from "./utils/ProtectedDashboard";
import About from "./components/AboutUs/About";
import { bestSeller, topRated } from "./api/topRatedAndBestSeller";
import VerifyAccount from "./forms/VerifyAccount";
import Contactus from "./components/ContactUs/Contactus";

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(authUser());
    dispatch(displayAllProductCategory());
    dispatch(fetchProduct());
    dispatch(topRated());
    dispatch(bestSeller());
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Checkout flag />}></Route>
          <Route path="/product-details/*" element={<ProductSection />}></Route>
          <Route
            path="/product-category/*"
            element={<ProductCategory />}
          ></Route>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Shipping />} />
            <Route path="/user-profile/" element={<User />} />
          </Route>
          <Route element={<ProtectedDashboard />}>
            <Route path="/dashboard/*" element={<DashboardRoutes />} />
          </Route>
          <Route path="/404" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </ThemeProvider>
  );
};

export default App;
