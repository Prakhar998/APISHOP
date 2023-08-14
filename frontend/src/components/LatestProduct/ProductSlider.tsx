import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "../LatestProduct/style.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/features/checkout/checkoutSlice";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { AppDispatch } from "../../redux/store";
import noImage from "../../assets/product_img/no-image.jpg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ProductSlider = (props: any) => {
  const { data, autoPlayStatus } = props;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const renderNextButton = () => {
    return (
      <ArrowForwardIcon
        style={{
          position: "absolute",
          right: "10px",
          top: "-15px",
          cursor: "pointer",
          color: "#00bcd4",
        }}
      />
    );
  };

  const renderPrevButton = () => {
    return (
      <ArrowBackIcon
        style={{
          position: "absolute",
          right: "63px",
          top: "-15px",
          cursor: "pointer",
          color: "#00bcd4",
        }}
      />
    );
  };

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 4 },
  };
  const addToCart = (item: any) => {
    const data = { ...item };
    dispatch(addItem(data));
  };
  const items =
    data &&
    data.map((item: any) => {
      return (
        <Box key={item?.id} className="product-list" data-testid="ProductList">
          <img
            src={item?.images?.[0]?.url ? item?.images?.[0]?.url : noImage}
            alt="no image"
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate("/product-details", {
                state: item,
              })
            }
          />
          <Box className="product-details">
            <Box
              className="product-details-name"
              onClick={() =>
                navigate("/product-details", {
                  state: item,
                })
              }
            >
              {item?.name.slice(0, 15)}
            </Box>
            <Box className="product-details-price">
              ${item?.price}
              <span className="product-details-reducedPrice">
                ${item?.sellingPrice}
              </span>
            </Box>

            <Button
              className="view-product-btn"
              style={{
                color: "#fff",
                marginTop: "2vh",
                backgroundColor: "#00bcd4",
              }}
              onClick={() => {
                addToCart(item);
              }}
            >
              <ShoppingCartIcon />
              Add to Cart
            </Button>
          </Box>
        </Box>
      );
    });
  return (
    <Box className="product-list-wrapper" style={{ display: "flex" }}>
      <AliceCarousel
        items={items}
        mouseTracking
        responsive={responsive}
        autoPlay={autoPlayStatus}
        autoPlayInterval={autoPlayStatus ? 3000 : 0}
        infinite
        renderPrevButton={renderPrevButton}
        renderNextButton={renderNextButton}
        disableDotsControls
        animationType="fadeout"
      />
    </Box>
  );
};

export default ProductSlider;
