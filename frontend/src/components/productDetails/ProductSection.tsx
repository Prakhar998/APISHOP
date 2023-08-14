/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Button, Grid, Rating, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ProductDescription from "./ProductDescription";
import Footer from "../footers/Footer";
import ScrollTop from "../common/Scrolltop";
import MainHeader from "../headers/MainHeader";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addItem } from "../../redux/features/checkout/checkoutSlice";
import noImage from "../../assets/product_img/no-image.jpg";
import { AppDispatch, RootState } from "../../redux/store";
import { addToCart } from "../../api/checkoutApis";
import { toast } from "react-toastify";

const ProductSection = () => {
  const { state } = useLocation();
  const authData = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const addToCartFunction = (item: any) => {
    const data = { ...item };
    if (authData === null) {
      dispatch(addItem(data));
      navigate("/cart");
    } else {
      dispatch(addToCart({ productId: data.id, quantity: 1 })).then(
        (res: any) => {
          if (res.payload.success === true) {
            dispatch(addItem(data));
            toast.success("Item Added to cart successfully");
            navigate("/cart");
          } else {
            toast.error("Not able to add to cart");
          }
        }
      );
    }
  };

  return (
    <>
      <MainHeader />
      <Grid
        container
        justifyContent="space-around"
        style={{ marginBottom: "24px", marginTop: "24px" }}
      >
        <Grid xs={12} lg={4} md={3} item>
          <div>
            <Carousel
              showArrows={false}
              autoPlay
              showStatus={false}
              showIndicators={false}
            >
              {state.images && state.images.length > 0 ? (
                state.images.map((e: any, i: any) => (
                  <div key={i}>
                    <img
                      style={{ width: "70%" }}
                      src={e?.url}
                      alt="No image22"
                    />
                  </div>
                ))
              ) : (
                <img src={noImage} />
              )}
            </Carousel>
          </div>
        </Grid>
        <Grid xs={12} lg={6} md={6} item>
          <div>
            <Typography
              sx={{
                fontSize: "18px",
                padding: "8px",
                marginTop: "32px",
                paddingLeft: "16px",
              }}
            >
              {state?.name}
            </Typography>
            <div
              style={{
                display: "flex",
                marginBottom: "8px",
                paddingLeft: "8px",
              }}
            >
              <Rating
                name="text-feedback"
                value={state?.ratings}
                readOnly
                precision={0.5}
                style={{ padding: "8px" }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 500,
                  marginLeft: "8px",
                  marginTop: "12px",
                  color: "#12121b",
                }}
              >
                {state?.stocks}
              </Typography>
            </div>
            <Typography
              variant="h4"
              sx={{
                marginBottom: "8px",
                marginLeft: "16px",
                marginTop: "4px",
                color: "#12121b",
              }}
            >
              ${state?.price}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                marginBottom: "16px",
                marginLeft: "16px",
                marginTop: "4px",
                color: "#12121b",
              }}
            >
              Overview
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 300,
                marginLeft: "16px",
                marginTop: "4px",
                color: "#888",
              }}
            >
              {state?.description}
            </Typography>

            <div style={{ display: "flex", marginTop: "24px" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#00BCD4",
                  color: "#FFF",
                  borderRadius: "15px",
                  marginLeft: "16px",
                }}
                onClick={() => addToCartFunction(state)}
              >
                Add to Cart
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                marginLeft: "16px",
                marginTop: "24px",
                marginBottom: "16px",
                opacity: "0.5",
              }}
            ></div>
          </div>
        </Grid>
      </Grid>
      <div style={{ margin: "16px" }}>
        <ProductDescription productId={state} />
      </div>
      <Footer />
      <ScrollTop />
    </>
  );
};

export default ProductSection;
