/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../redux/store";
import NotificationBar from "../components/common/NotificationBar";
import MainHeader from "../components/headers/MainHeader";
import Footer from "../components/footers/Footer";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../redux/features/auth/authSlice";
import Spinner from "../components/common/Spinner";
import { getCart, localToCartUp } from "../api/checkoutApis";
import { addItem} from "../redux/features/checkout/checkoutSlice";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch<any>();
  const { isOTP, isAuthenticated, loginLoading, userLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const { email, password } = formData;

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: -600, left: 0, behavior: "smooth" });
    console.log('scroll to top');
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((res: any) => {
      if (res.payload.data) {
        dispatch(getCart()).then((res: any) => {
          res.payload.data[0].items.map((item: any) => {
            dispatch(addItem(item.product));
          });
        });
        const cartItems: any = localStorage.getItem("cartItems");
        const dataToBeAddedToCart: any = JSON.parse(cartItems);
        const parameters = dataToBeAddedToCart.map((item: any) => {
          return {
            productId: item.id,
            quantity: item.quantity,
          };
        });
        dispatch(localToCartUp(parameters));
      }
    });
  };

  if(isOTP){
    return (<Navigate to="/verify-account" />)
  }

  return (
    <>
      {userLoading ? (
        <Spinner />
      ) : isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <Box>
          <NotificationBar />
          <MainHeader />
          <Grid
            container
            sx={{
              backgroundColor: "#f6f6f6",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: "70px 30px;",
            }}
          >
            <Grid
              item
              lg={6}
              sm={8}
              xs={12}
              sx={{
                boxShadow: "2px 6px 15px rgba(0, 0, 0, 0.15)",
                backgroundColor: "#ffffff",
                p: "30px 80px 40px",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 1, position: "relative" }}
              >
                <Box component="div" sx={{ textAlign: "center" }}>
                  <IconButton
                    sx={{ backgroundColor: "primary.main", color: "#ffffff" }}
                  >
                    <LockOutlinedIcon />
                  </IconButton>
                </Box>

                <Typography
                  sx={{
                    fontSize: "32px",
                    fontWeight: 300,
                    marginBottom: "20px",
                    textAlign: "center",
                  }}
                >
                  Sign In
                </Typography>
                <Typography>Email</Typography>
                <TextField
                  margin="normal"
                  required
                  type="email"
                  id="username"
                  name="email"
                  value={email}
                  onChange={onChangeHandler}
                  placeholder="username"
                  fullWidth
                />
                <Typography>Password</Typography>
                <TextField
                  margin="normal"
                  required
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={onChangeHandler}
                  placeholder="Password"
                  fullWidth
                />
                {/* <Box sx={{ display: "flex", marginTop: "8px" }}>
              <Checkbox />
              <Typography sx={{ marginTop: "8px" }}>Remember me</Typography>
            </Box> */}
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: "#00bcd4",
                    borderRadius: " 60px",
                    color: "#fff",
                    fontSize: "15px",
                    padding: " 0 30px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontWeight: 700,
                    p: "15px 0",
                    marginTop: "20px",
                    marginBottom: "15px",
                    "&:hover": {
                      backgroundColor: "#00bcd4",
                    },
                  }}
                  fullWidth
                  disabled={loginLoading}
                >
                  {loginLoading ? "Please Wait..." : "Submit"}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Typography component={Link} to="/login" variant="body2">
                      Forgot password?
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography component={Link} to="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loginLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
          <Footer />
        </Box>
      )}
    </>
  );
};

export default LoginForm;
