/* eslint-disable @typescript-eslint/no-explicit-any */
import {Grid,Typography,TextField,Container,Button,Box,Dialog,Alert,DialogTitle,DialogActions,DialogContent,Radio} from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Checkout from ".";
import image2 from "../../assets/img/payment-method/maestro.png";
import image3 from "../../assets/img/payment-method/paypal.png";
import MoneyIcon from "@mui/icons-material/Money";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {addAddressApi,checkout,getAllAddresses, totalClearCart} from "../../api/checkoutApis";
import { addAdress } from "../../redux/features/checkout/checkoutAddressSlice";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from "react-toastify";

export const Payment = ({
  setCompleted,
  completed,
  setCurrentState,
  currentState,
}: any) => {
  const [orderConfrim, setOrderConfirm] = useState<boolean>(false);
  const [orderPlaceLoading, setOrderPlaceLoading] = useState<boolean>(false);
  const {deliverAddress} = useSelector(
    (state: RootState) => state.checkoutAddress
  );
    console.log(deliverAddress);
    console.log(deliverAddress.id);
  const cartIdRedux = useSelector((state: RootState) => state.cartId.data);
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 300, left: 0, behavior: "smooth" });
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleCheckoutFinalStep = () => {
    setOrderPlaceLoading(true);
    dispatch(
      checkout({
        addressId: deliverAddress.id,
        cartId: cartIdRedux,
        extraNote: "deliver by 2Pm",
        paymentType: "cod",
        coordinates: [-114.055092, 50.9184],
      })
    ).then((res) => {
      if (res.payload.success === true) {
        setOrderPlaceLoading(false);
        dispatch(totalClearCart());
        toast.success("Order successfully Placed");
        navigate("/");
      } else {
        setOrderPlaceLoading(false);
        toast.error("not able place order");
      }
    });
  };
  return (
    <Container sx={{padding:'40px 0 0' }}>
      <Card sx={{ minWidth: '100%',marginBottom:"20px"}}>
      <CardContent sx={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 20px !important'}}>
        <Box sx={{display:'flex',gap:'7px',alignItems:'center'}}><MoneyIcon /><Typography sx={{ fontSize: 16 }}>Cash on Delivery</Typography>
        </Box>
        <Radio name="radio-buttons" onClick={()=>setOrderConfirm(true)} checked={orderConfrim} />
      </CardContent>
    </Card>
    <Card sx={{ minWidth: '100%',marginBottom:"20px"}}>
      <CardContent sx={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 20px !important'}}>
        <Box sx={{display:'flex',gap:'7px',alignItems:'center'}}><img src={image2} width="32" /><Typography sx={{ fontSize: 16 }}>Pay with Credit and Debit Card</Typography>
        </Box>
        <Typography sx={{ fontSize: 16,color:'red' }}>Unavailable</Typography>
      </CardContent>
    </Card>
    <Card sx={{ minWidth: '100%'}}>
      <CardContent sx={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 20px !important'}}>
        <Box sx={{display:'flex',gap:'7px',alignItems:'center'}}><img src={image3} width="32" /><Typography sx={{ fontSize: 16 }}>Pay with Paypal</Typography>
        </Box>
        <Typography sx={{ fontSize: 16,color:'red' }}>Unavailable</Typography>
      </CardContent>
    </Card>

      <Button
        style={{
          margin: "16px 0px 16px 16px",
          fontSize: "15px",
          padding: "10px 20px 10px 20px",
          borderRadius: "40px",
          float: "right",
        }}
        variant={orderConfrim ? "contained" : "outlined"}
        disabled={!orderConfrim}
        onClick={() => {
          // setCompleted([...completed, 3]);
          // setCurrentState(currentState + 1);
          handleCheckoutFinalStep();
        }}
      >
        Place Order
      </Button>
      <Button
        style={{
          margin: "16px 0px 16px 0px",
          fontSize: "15px",
          padding: "10px 20px 10px 20px",
          borderRadius: "40px",
          float: "right",
        }}
        variant="contained"
        onClick={() => {
          setCompleted(completed.filter((e: any) => e !== 3));
          setCurrentState(currentState - 1);
        }}
      >
        Go Back
      </Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={orderPlaceLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export const Review = ({
  setCompleted,
  completed,
  setCurrentState,
  currentState,
}: any) => {
  const addressDuringCheckout = useSelector(
    (state: RootState) => state.checkoutAddress.deliverAddress
  );
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 300, left: 0, behavior: "smooth" });
  }, []); 

  return (
    <>
        <Container sx={{padding:'30px 0'}}>
        
        <Alert severity="info" icon={false} sx={{textTransform:'capitalize',fontSize:'18px',margin:'0 20px'}}><LocationOnIcon /> {addressDuringCheckout.address}, {addressDuringCheckout.landmark}, {addressDuringCheckout.city}, {addressDuringCheckout.state}, {addressDuringCheckout.zipCode}, {addressDuringCheckout.country}</Alert>
        <Checkout props={true} />
      <Box sx={{textAlign:'right'}}>
      <Button
          variant="contained"
          sx={{
            margin: "16px 0px 16px 0px",
            color: "#fff",
            fontSize: "15px",
            padding: "10px 20px 10px 20px",
            borderRadius: "40px"
          }}
          onClick={() => {
            setCompleted(completed.filter((e: any) => e !== 2));
            setCurrentState(currentState - 1);
          }}
        >
          Go Back
        </Button>
        <Button
          variant="contained"
          sx={{
            margin: "16px 0px 16px 16px",
            color: "#fff",
            fontSize: "15px",
            padding: "10px 20px 10px 20px",
            borderRadius: "40px"
          }}
          onClick={() => {
            setCompleted([...completed, 2]);
            setCurrentState(currentState + 1);
          }}
        >
          Order Confirm
        </Button>
      </Box>
      </Container>
    </>
  );
};

export const ShippingAddress = ({
  setCompleted,
  completed,
  setCurrentState,
  currentState,
}: any) => {
  const navigae = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [addressFormData, setAddressFormData] = useState<any>({});
  const {addressLoading, addLoading, deliverAddress, allAddresses} = useSelector((state: RootState) => state.checkoutAddress);
  useEffect(() => {
    dispatch(getAllAddresses());
    window.scrollTo({ top: 300, left: 0, behavior: "smooth" });
  }, []);

  const handleSubmitAddress = (event: any) => {
    event.preventDefault();
    dispatch(
      addAddressApi({
        address: addressFormData.street,
        city: addressFormData.city,
        country: addressFormData.country,
        state: addressFormData.state,
        zipCode: addressFormData.zip,
        landmark: addressFormData.landmark,
        addressType: addressFormData.name,
      })
    ).then((res) => {
      if (res.payload.success === true) handleClose();
    });
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <div style={{ marginBottom: "4vh" }}>
      <div>
            <Container
              style={{
                display: "flex",
                padding:'25px 0',
                flexWrap: "wrap",
                gap:'30px'
              }}
            >
              {allAddresses.length > 0 &&
                allAddresses?.map((address: any) => (
                        <Card key={address.id} sx={{ minWidth: 245,border:'1px solid #bcbcbc'}}>
                          <CardContent>
                              <Typography sx={{display:'flex',alignItems:'center',color:'#00bcd4',gap:'5px'}}>{address.addressType=="Home" && <HomeIcon />}
                              {address.addressType=="Work" && <BusinessIcon />}
                              {address.addressType=="Other" && <AddLocationIcon />}
                              {address.addressType}
                            </Typography>
                            <p style={{lineHeight:'28px',marginTop:'18px',textTransform:'capitalize'}}>
                            {address.address}
                            <br />
                            {address.landmark},<br />
                            {address.city}, {address.state},<br />
                            {address.zipCode},{address.country}
                          </p>
                          </CardContent>
                          <CardActions>
                            <Button variant={deliverAddress?.id == address?.id ? "contained" : "outlined"}  sx={{d:'block',m:'0 auto 15px',width:'85%'}} onClick={()=>dispatch(addAdress(address))}>DELIVER HERE</Button><br/>
                          </CardActions>
                        </Card>
                    ))}
            </Container>
      </div>
      <br />
      <center>
        <Button variant="contained" color="success" onClick={handleOpen}>
          Add New Address +
        </Button>
      </center>

      <Button
        style={{
          margin: "16px 40px 16px 16px",
          fontSize: "15px",
          padding: "10px 20px 10px 20px",
          borderRadius: "40px",
          float: "right",
        }}
        disabled={deliverAddress === null ? true : false}
        variant={deliverAddress === null ? "outlined" : "contained"}
        onClick={() => {
          setCompleted([...completed, 1]);
          setCurrentState(currentState + 1);
        }}
      >
        Continue
      </Button>
      <Button
        variant="contained"
        sx={{
          margin: "16px 0px 16px 0px",
          color: "#fff",
          fontSize: "15px",
          padding: "10px 20px 10px 20px",
          borderRadius: "40px",
          float: "right",
        }}
        onClick={() => {
          navigae("/cart");
        }}
      >
        Go Back
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle sx={{bgcolor:'#00bcd4',color:'#ffffff'}}>
          <Box sx={{display:'flex',justifyContent:'space-between'}}>
            <Typography>Add New Address</Typography>
            <CloseIcon onClick={handleClose} sx={{cursor:'pointer'}} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container sx={{p:'30px 30px 0'}} spacing={2}>
            <Grid item xs={12} lg={6} md={6}>
              <Typography>Address Type*</Typography>
              <select
                value={addressFormData.name}
                onChange={(e) => {
                  setAddressFormData({
                    ...addressFormData,
                    name: e.target.value,
                  });
                }}
                style={{width:'100%',height:'53px',fontSize:'16px',borderRadius:'4px',marginTop:'18px',padding:'12px',cursor:'pointer',background:'#fff',border:'1px solid #bcbcbc',}}
                required
              >
                <option>Select Address Type</option>
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </Grid>
            <Grid item xs={12} lg={6} md={6}>
              <Typography>Country*</Typography>
              <TextField
                margin="normal"
                required
                onChange={(e) => {
                  setAddressFormData({
                    ...addressFormData,
                    country: e.target.value,
                  });
                }}
                style={{ width: "100%" }}
                id="country"
                name="country"
                type="text"
                placeholder="Country"
              />
            </Grid>
            <Grid item xs={12} lg={12} md={12}>
              <Typography>Street address*</Typography>
              <TextField
                margin="normal"
                required
                onChange={(e) => {
                  setAddressFormData({
                    ...addressFormData,
                    street: e.target.value,
                  });
                }}
                style={{ width: "100%" }}
                id="street"
                name="street"
                type="text"
                placeholder="Street address"
              />
            </Grid>
            <Grid item xs={12} lg={6} md={6}>
              <Typography>Landmark*</Typography>
              <TextField
                margin="normal"
                required
                onChange={(e) => {
                  setAddressFormData({
                    ...addressFormData,
                    landmark: e.target.value,
                  });
                }}
                style={{ width: "100%" }}
                id="apartment"
                name="apartment"
                type="text"
                placeholder="Apartment/Suite/Unit"
              />
            </Grid>
            <Grid item xs={12} lg={6} md={6}>
              <Typography>Town/City*</Typography>
              <TextField
                margin="normal"
                onChange={(e) => {
                  setAddressFormData({
                    ...addressFormData,
                    city: e.target.value,
                  });
                }}
                required
                style={{ width: "100%" }}
                id="town/city"
                name="town/city"
                type="text"
                placeholder="Town/City"
              />
            </Grid>
            <Grid item xs={12} lg={6} md={6}>
              <Typography>State*</Typography>
              <TextField
                margin="normal"
                required
                onChange={(e) => {
                  setAddressFormData({
                    ...addressFormData,
                    state: e.target.value,
                  });
                }}
                style={{ width: "100%" }}
                id="state"
                name="state"
                type="text"
                placeholder="State"
              />
            </Grid>
            <Grid item xs={12} lg={6} md={6}>
              <Typography>Postcode/Zip*</Typography>
              <TextField
                margin="normal"
                required
                onChange={(e) => {
                  setAddressFormData({
                    ...addressFormData,
                    zip: e.target.value,
                  });
                }}
                style={{ width: "100%" }}
                id="postcode/zip"
                name="postcode/zip"
                type="text"
                placeholder="Postcode/Zip"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmitAddress} sx={{width:'200px',display:'block',m:'10px auto'}} disabled={addLoading}>
          {addLoading ? 'Please Wait..' : 'Submit'} 
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={addressLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
