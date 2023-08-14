import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./style.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/features/checkout/checkoutSlice";
import { AppDispatch, RootState } from "../../redux/store";
import noImage from "../../assets/product_img/no-image.jpg";
import { addToCart } from "../../api/checkoutApis";
import { totalQuantityReducer } from "../../redux/features/checkout/checkoutTotalQuantitySlice";
import { useEffect, useState } from "react";
import { getCart } from "../../api/checkoutApis";
import { toast } from "react-toastify";

const ProductCard = (props: any) => {
  const { data } = props;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authData = useSelector((state: RootState) => state.auth.user);
  const reduxCheckoutData = useSelector(
    (state: RootState) => state.checkout.data
  );
  const [buttonChange, setButtonChange] = useState<string[]>([]);
  const [checkoutData, setCheckoutData] = useState<any>([{}]);
  const [quantityUpdatedFlag, setQuantityUpdatedFlag] =
    useState<boolean>(false);
  useEffect(() => {
    let sum = 0;
    const tempArray: string[] = [];
    if (authData === null) {
      reduxCheckoutData.map((item: any) => {
        sum = sum + item.quantity;
        tempArray.push(item.id);
      });
      setButtonChange(tempArray);
    } else {
      checkoutData[0]?.items?.map((item: any) => {
        sum = sum + item.quantity;
      });
    }

    dispatch(totalQuantityReducer(sum));
  }, [reduxCheckoutData, checkoutData]);
  useEffect(() => {
    const tempArray: string[] = [];
    if (authData === null) {
      setCheckoutData(reduxCheckoutData);
    } else {
      dispatch(getCart()).then((result: any) => {
        setCheckoutData(result.payload.data);

        result?.payload?.data[0]?.items?.map((item: any) => {
          tempArray.push(item.product.id);
        });
      });
      setButtonChange(tempArray);
    }
  }, [dispatch, quantityUpdatedFlag]);

  const addToCartFunction = (item: any) => {
    const data = { ...item };

    if (authData === null) {
      dispatch(addItem(data));
    } else {
      dispatch(addToCart({ productId: data.id, quantity: 1 })).then((res) => {
        if (res.payload.success === true) {
          dispatch(addItem(data));
          toast.success("Item Added to cart successfully");
        } else {
          toast.error("Not able to add to cart");
        }
        setQuantityUpdatedFlag((prev) => !prev);
      });
    }
  };

  return (
    <>
      {data &&
        data.map((item: any) => {
          return (
            <Box
              key={item?.id}
              className="product-card"
              data-testid="ProductList"
            >
              <img
                src={item?.images?.[0]?.url ? item?.images?.[0]?.url : noImage}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/product-details/${item.id}`, {
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
                  {item?.name.slice(0, 22)}
                </Box>
                <Box className="product-details-price">
                  ${item?.price}
                  <span className="product-details-reducedPrice">
                    ${item?.sellingPrice}
                  </span>
                </Box>
                {item.stock === 0 ? (
                  <Typography
                    sx={{ textAlign: "center", marginTop: "4px", color: "red" }}
                  >
                    *Out of Stock
                  </Typography>
                ) : (
                  <Button
                    className="view-product-btn"
                    variant="contained"
                    sx={{ color: "#fff", bgcolor: "success" }}
                    color={
                      buttonChange.includes(item.id) ? "success" : "primary"
                    }
                    onClick={() => {
                      buttonChange.includes(item.id)
                        ? navigate("/cart")
                        : addToCartFunction(item);
                    }}
                  >
                    {buttonChange.includes(item.id) ? (
                      <>
                        <ShoppingCartIcon /> Go To Cart
                      </>
                    ) : (
                      <>Add to Cart</>
                    )}
                  </Button>
                )}
              </Box>
            </Box>
          );
        })}
    </>
  );
};

export default ProductCard;
