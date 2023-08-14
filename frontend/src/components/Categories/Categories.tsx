/* eslint-disable @typescript-eslint/no-explicit-any */
import bgImage from "../../assets/product_img/background.jpg";
import "../Categories/style.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { displayAllProductCategory } from "../../api/productCategoryApis";
import { AppDispatch, RootState } from "../../redux/store";
import AliceCarousel from "react-alice-carousel";

// const data = [
//   {
//     id: "1",
//     name: "Laptops",
//     img: bgImage,
//     text: "Shop Now",
//   },
//   {
//     id: "2",
//     name: "Blueetooth Speaker",
//     img: bgImage,
//     text: "Shop Now",
//   },
//   {
//     id: "3",
//     name: "Iphone",
//     img: bgImage,
//     text: "Shop Now",
//   },
// ];

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [productDetail, setProductDetail] = useState([]);
  const { loading } = useSelector((state: RootState) => state.productCategory);

  useEffect(() => {
    dispatch(displayAllProductCategory()).then((res: any) => {
      if (res.payload.success === true) {
        setProductDetail(res.payload.data);
      }
    });
  }, [dispatch]);

  const navgiate = useNavigate();
  const items =
    productDetail &&
    productDetail.map((item: any, i: number) => {
      return (
        <Box className="box-list" key={i}>
          <Box className="single_catagory">
            <img src={bgImage} alt="" />
            <Button
              onClick={() =>
                navgiate(`/product-category/${item.title}/${item.id}`, {
                  state: { id: item.id },
                })
              }
            >
              <Box className="single_cata_desc">
                <span>{item.title}</span>
                <span>
                  Shop Now
                  <KeyboardArrowRightIcon className="right-arrow" />
                </span>
              </Box>
            </Button>
          </Box>
        </Box>
      );
    });
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 4 },
  };
  return (
    <>
      <Box className="categories-section-wrapper">
        <Typography className="categories-heading">Catagories</Typography>
        <Typography className="categories-heading">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </Typography>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box className="box-wrapper">
            <AliceCarousel
              items={items}
              mouseTracking
              responsive={responsive}
              autoPlay
              autoPlayInterval={1000}
              infinite
              disableButtonsControls
              disableDotsControls
              animationType="fadeout"
            />
          </Box>
        )}
      </Box>
    </>
  );
};
export default Categories;
