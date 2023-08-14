/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, Container} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import noImage from "../../assets/product_img/no-image.jpg";
import { DeleteButton, TableCellWidth, ImageSize } from "./styles";
import { CheckoutComponentUtils } from "../../utils/constants";
import ScrollTop from "../common/Scrolltop";
import Footer from "../footers/Footer";
import { useDispatch, useSelector } from "react-redux";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import "./checkoutstyle.css";
import {
  decreaseQuantity,
  deleteItem,
  increaseQuantity,
  multiplyQuantityAndPrice,
} from "../../redux/features/checkout/checkoutSlice";
import { useNavigate } from "react-router-dom";
import MainHeader from "../headers/MainHeader";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import {
  currentUserApi,
  decreaseQuantityByOne,
  deleteFromCart,
  getCart,
  increaseQuantityByOne,
} from "../../api/checkoutApis";
import { totalQuantityReducer } from "../../redux/features/checkout/checkoutTotalQuantitySlice";
import { toast } from "react-toastify";
import { addCartId } from "../../redux/features/checkout/checkoutCartIdSlice";
import EmptyCart from "./EmptyCart";

const Checkout = ({ flag, props }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const prop = props;
  const [checkoutData, setCheckoutData] = useState<any>([{}]);
  const authData = useSelector((state: RootState) => state.auth.user);
  const [quantityUpdatedFlag, setQuantityUpdatedFlag] = useState<boolean>(
    false
  );
  const [totalSum, setTotalSum] = useState(0);
  const navigate = useNavigate();
  const reduxCheckoutData = useSelector(
    (state: RootState) => state.checkout.data
  );
  const totalQuantity = useSelector(
    (state: RootState) => state.totalquantity.data
  );
  const {loading, data: checkoutData2} = useSelector((state:RootState)=>state.checkoutApis);

  console.log(checkoutData2);

  useEffect(() => {
    let sum = 0;
    setTotalSum(0);
    if (authData === null) {
      reduxCheckoutData.map((item: any) => {
        sum = sum + item.quantity;
      });
      reduxCheckoutData.map((item: any) => {
        dispatch(multiplyQuantityAndPrice(item.id));
        setTotalSum((prev) => prev + item.sellingPrice);
      });
    } else {
      checkoutData[0]?.items?.map((item: any) => {
        sum = sum + item.quantity;
      });
    }
    dispatch(totalQuantityReducer(sum));
  }, [reduxCheckoutData, checkoutData]);
  useEffect(() => {
    if (authData === null) {
      setCheckoutData(reduxCheckoutData);
    } else {
      dispatch(getCart()).then((result: any) => {
        console.log(result);
        setCheckoutData(result.payload.data);
        dispatch(addCartId(result.payload.data[0].id));
      });
    }
  }, [authData, quantityUpdatedFlag]);
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: -600, left: 0, behavior: "smooth" });
    console.log('scroll to top');
  }, []);
  
  const handleDelete = (key: number) => {
    dispatch(deleteFromCart({ productId: key })).then((res) => {
      if (res.payload.success === true) {
        dispatch(deleteItem(key));
        toast.success("Product removed from cart");
      } else {
        toast.error("Product not able to remove from cart");
      }
      setQuantityUpdatedFlag((prev) => !prev);
    });
  };

  const handleIncreaseQuantityByOne = (id: any) => {
    dispatch(increaseQuantityByOne({ productId: id }))
      .then((res) => {
        setCheckoutData(res.payload.data);
      })
      .then(() => {
        setQuantityUpdatedFlag((prev) => !prev);
      });
  };

  const handleDecreaseQuantityByOne = (id: any) => {
    dispatch(decreaseQuantityByOne({ productId: id }))
      .then((res) => {
        setCheckoutData(res.payload.data);
      })
      .then(() => {
        setQuantityUpdatedFlag((prev) => !prev);
      });
  };

  const handleCheckoutButtonClick = () => {
    dispatch(currentUserApi()).then((res) => {
      if (res.payload.error) {
        navigate("/login");
      } else navigate("/checkout");
    });
  };

  const handleDecreaseQuantityByOneInRedux = async (id: any) => {
    dispatch(decreaseQuantity(id));
  };
  const handleIncreaseQuantityByOneInRedux = (id: any) => {
    dispatch(increaseQuantity(id));
  };
  const handleDeleteReduxItemInCart = (id: any) => {
    dispatch(deleteItem(id));
  };
  if ((checkoutData2?.data ? (checkoutData2?.data[0]?.items?.length == 0 || checkoutData2?.data?.length ==0 ) : checkoutData2?.length==0) && reduxCheckoutData.length==0) {
    return (
      <>
        <MainHeader />
        <EmptyCart />
        <Footer />
      </>
    );
  }
  return (
    <div>
      {flag ? (
        <>
          <MainHeader />
        </>
      ) : (
        ""
      )}
      <Container sx={{ padding: prop ? "30px 0" : "80px 0" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h2>Your Cart: {checkoutData[0]?.items?.length || reduxCheckoutData.length} items</h2>
          </Grid>
          <Grid item xs={9}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {prop == undefined && <TableCellWidth>
                      <DeleteIcon />
                    </TableCellWidth>}
                    <TableCellWidth>
                      <b>Image</b>
                    </TableCellWidth>
                    <TableCellWidth>
                      <b>{CheckoutComponentUtils.index.TableHeading.Product}</b>
                    </TableCellWidth>
                    <TableCellWidth>
                      <b>{CheckoutComponentUtils.index.TableHeading.Price}</b>
                    </TableCellWidth>
                    <TableCellWidth>
                      <b>
                        {CheckoutComponentUtils.index.TableHeading.Quantity}
                      </b>
                    </TableCellWidth>
                    <TableCellWidth>
                      <b>{CheckoutComponentUtils.index.TableHeading.Total}</b>
                    </TableCellWidth>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {checkoutData && authData !== null
                    ? checkoutData[0]?.items?.map((items: any, key: number) => {
                        return (
                          <TableRow key={key}>
                            {prop == undefined &&
                            <TableCellWidth>
                              <DeleteButton
                                onClick={() => {
                                  handleDelete(items?.product.id);
                                }}
                              >
                                <ClearIcon />
                              </DeleteButton>
                            </TableCellWidth>}
                            <TableCellWidth>
                              <img
                                src={
                                  items?.product?.images?.length > 0
                                    ? items?.product.images[0]?.url
                                    : noImage
                                }
                                style={ImageSize}
                              />
                            </TableCellWidth>
                            <TableCellWidth>
                              {items?.product.name}
                            </TableCellWidth>
                            <TableCellWidth>{items?.price}</TableCellWidth>
                            <TableCellWidth>
                            {prop ? (items.quantity || 1) :
                              <Box className="quantity-box">
                                <IndeterminateCheckBoxIcon
                                  sx={{ color: "#ff0000", cursor: "pointer" }}
                                  onClick={() =>
                                    items.quantity === 1
                                      ? handleDelete(items.product.id)
                                      : handleDecreaseQuantityByOne(
                                          items.product.id
                                        )
                                  }
                                />
                                {items.quantity || 1}

                                <AddBoxIcon
                                  sx={{ color: "#00bcd4", cursor: "pointer" }}
                                  onClick={() =>
                                    handleIncreaseQuantityByOne(
                                      items.product.id
                                    )
                                  }
                                />
                              </Box> }
                            </TableCellWidth>
                            <TableCellWidth>
                              <div>{items?.total}</div>
                            </TableCellWidth>
                          </TableRow>
                        );
                      })
                    : reduxCheckoutData?.map((items: any, key: number) => (
                        <TableRow key={key}>
                          <TableCellWidth>
                            <DeleteButton
                              onClick={() => {
                                handleDeleteReduxItemInCart(items?.id);
                              }}
                            >
                              <ClearIcon />
                            </DeleteButton>
                          </TableCellWidth>
                          <TableCellWidth>
                            <img
                              src={
                                items?.images?.length > 0
                                  ? items?.images[0]?.url
                                  : noImage
                              }
                              style={ImageSize}
                            />
                          </TableCellWidth>
                          <TableCellWidth>{items?.name}</TableCellWidth>
                          <TableCellWidth>{items?.price}</TableCellWidth>
                          <TableCellWidth>
                            <Box className="quantity-box">
                              <IndeterminateCheckBoxIcon
                                sx={{ color: "#ff0000", cursor: "pointer" }}
                                onClick={() => {
                                  handleDecreaseQuantityByOneInRedux(
                                    items.id
                                  );
                                  //   items.quantity,
                                  //   items.id
                                  // );
                                }}
                              />
                              {items.quantity === 0
                                ? handleDeleteReduxItemInCart(items.id)
                                : items.quantity}

                              <AddBoxIcon
                                sx={{ color: "#00bcd4", cursor: "pointer" }}
                                onClick={() => {
                                  handleIncreaseQuantityByOneInRedux(items.id);
                                }}
                              />
                            </Box>
                          </TableCellWidth>
                          <TableCellWidth>{items.sellingPrice}</TableCellWidth>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={3}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCellWidth align="left" colSpan={2}>
                      <strong>Order Summary</strong> 
                    </TableCellWidth>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCellWidth sx={{width:'55%'}}><strong>Total Items :</strong></TableCellWidth>
                    <TableCellWidth>{totalQuantity}</TableCellWidth>
                  </TableRow>
                  <TableRow>
                    <TableCellWidth><strong>Total amount :</strong></TableCellWidth>
                    <TableCellWidth>{authData === null ? totalSum : checkoutData[0]?.subTotal}</TableCellWidth>
                  </TableRow>
                  {prop ? (
                    <></>
                  ) : (
                    <TableRow>
                      <TableCellWidth colSpan={2}>
                        <Button
                          onClick={handleCheckoutButtonClick}
                          style={{
                            backgroundColor: "#00bcd4",
                            borderRadius: "4px",
                            width: "100%",
                            color: "#fff",
                            padding: "10px 20px 10px 20px",
                          }}
                        >
                          Checkout
                        </Button>
                      </TableCellWidth>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
      {prop ? <></> : <Footer />}
      <ScrollTop />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
export default Checkout;
