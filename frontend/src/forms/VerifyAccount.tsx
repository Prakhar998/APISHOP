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
  import { Navigate} from "react-router-dom";
  import Footer from "../components/footers/Footer";
  import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
  import {userVerify } from "../redux/features/auth/authSlice";
  import Spinner from "../components/common/Spinner";
  import Backdrop from '@mui/material/Backdrop';
  import CircularProgress from '@mui/material/CircularProgress';
  
  const VerifyAccount = () => {
    const [formData, setFormData] = useState({ email: "", otp: "" });
    const dispatch = useDispatch<any>();
    const {isOTP,otpLoading, isAuthenticated, userLoading } = useSelector(
      (state: RootState) => state.auth
    );
  
    const { email, otp } = formData;

  
    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  
    const handleSubmit = (e: any) => {
      e.preventDefault();
      dispatch(userVerify(formData));
    };

    useEffect(() => {
      // 👇️ scroll to top on page load
      window.scrollTo({ top: -600, left: 0, behavior: "smooth" });
    }, []);

    if(!isOTP){
      return (<Navigate to="/login" />)
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
                    Verify Account
                  </Typography>
                  <Typography>Email</Typography>
                  <TextField
                    margin="normal"
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChangeHandler}
                    placeholder="Email Address"
                    fullWidth
                  />
                  <Typography>OTP</Typography>
                  <TextField
                    margin="normal"
                    required
                    id="otp"
                    name="otp"
                    type="text"
                    value={otp}
                    onChange={onChangeHandler}
                    placeholder="OTP"
                    fullWidth
                  />
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
                    disabled={otpLoading}
                  >
                    {otpLoading ? "Please Wait..." : "Submit"}
                  </Button>
                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={otpLoading}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </Box>
              </Grid>
            </Grid>
            <Footer />
          </Box>
        )}
      </>
    );
  };
  
  export default VerifyAccount;
  