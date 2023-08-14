/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import  { useState, useEffect } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../redux/store";
import { setNotification } from "../redux/features/notification/notificationSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import NotificationBar from "../components/common/NotificationBar";
import { fetchInfo } from "../redux/features/auth/authApis";
import MainHeader from "../components/headers/MainHeader";
import { Box } from "@mui/system";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Footer from "../components/footers/Footer";

const RegisterForm = () => {
  const [flag, setFlag] = useState(false);
  const [formData, setFormData] = useState({name:"",phone:"",email:"",password:"",isAdmin:false});

  const userInfo = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {name,phone,email, password} = formData;
  const onChangeHandler = (e:React.ChangeEvent<HTMLTextAreaElement>) => {    
    setFormData(prevState=>({...prevState,[e.target.name]:e.target.value}));
  }
  const handleSubmit =  (event: any) => {
    event.preventDefault();
    dispatch(fetchInfo(formData)).then((res)=>{
      if(res.payload.success === true){
        navigate("/login");
      }
    })
    setFlag(true);
  };
  
  if (userInfo && userInfo.success && flag) {
    localStorage.setItem("token", userInfo.token);
    navigate("/login");
    const data = {
      notificationState: true,
      message: userInfo.message,
      severity: "success",
    };
    dispatch(setNotification(data));
  }
  if (userInfo?.customMessage && flag) {
    const data = {
      notificationState: true,
      message: userInfo.customMessage,
      severity: "warning",
    };
    dispatch(setNotification(data));
  }

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: -600, left: 0, behavior: "smooth" });
    console.log('scroll to top');
  }, []);

  return (
    <>
    {userInfo ===null ? 
    <div>
      <div>
        <NotificationBar />
        <MainHeader />
      </div>
       <Grid container sx={{backgroundColor:"#f6f6f6",display:'flex',justifyContent:'center',alignItems:'center',p:'70px 30px;'}}>
        <Grid
          item
          lg={6}
          sm={8}
          xs={12}
          sx={{boxShadow:'2px 6px 15px rgba(0, 0, 0, 0.15)',backgroundColor:"#ffffff",p:'30px 80px 40px'}}
        >
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1,position:'relative' }}>
          <Box component="div" sx={{textAlign:'center'}}>
              <IconButton sx={{backgroundColor:"primary.main",color:'#ffffff'}}>
                <LockOutlinedIcon />
              </IconButton>
            </Box>
            
            <Typography
              sx={{fontSize: "32px", fontWeight: 300,marginBottom:"20px",textAlign:"center"}}
            >
              Sign Up
            </Typography>
            <Typography>UserName</Typography>
            <TextField
              margin="normal"
              required
              type="text"
              id="name"
              value={name}
              onChange={onChangeHandler}
              name="name"
              placeholder="username"
              fullWidth
            />
            <Typography>Mobile No</Typography>
            <TextField
              margin="normal"
              required
              type="text"
                id="phone"
                name="phone"
                value={phone}
              onChange={onChangeHandler}
                placeholder="mobileno"
              fullWidth
            />
            <Typography>Email</Typography>
            <TextField
              margin="normal"
              required
              type="email"
                id="email"
                name="email"
                value={email}
              onChange={onChangeHandler}
                placeholder="email"
              fullWidth
            />
              <small style={{ marginBottom: "44px" }}>
                <i></i> We'll never share your email with anyone else.
              </small>
              <Typography>Password</Typography>
            <TextField
              margin="normal"
              required
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangeHandler}
              placeholder="password"
              fullWidth
            />
             <small>
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji.
              </small>
              <Typography>Confirm Password</Typography>
            <TextField
              margin="normal"
              required
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="confirm password"
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
                p:"15px 0",
                marginTop:"20px",
                marginBottom:'15px',
                '&:hover':{
                  backgroundColor:"#00bcd4"
                }
              }}
              fullWidth
              // disabled={loginLoading}
            >
             {'Submit' }
            </Button>
            <Grid container>
              <Grid item xs>
                <Typography  variant="body2">
                </Typography>
              </Grid>
              <Grid item>
                <Typography component={Link} to="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    

      <div>
        {" "}
        <Footer />{" "}
      </div>
    </div> : <Navigate to="/login" />} 
    </>
  );
};

export default RegisterForm;
