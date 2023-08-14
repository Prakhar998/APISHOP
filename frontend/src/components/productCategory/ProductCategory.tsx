import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import ScrollTop from "../common/Scrolltop";
import Footer from "../footers/Footer";
import { ProductFilter } from "./ProductFilter";
import ProductView from "./ProductView";
import MainHeader from "../headers/MainHeader";
import { useDispatch, useSelector } from "react-redux";
import {AppDispatch, RootState } from "../../redux/store";
import Spinner from "../common/Spinner";
import { fetchCategory, fetchFilterProducts } from "../../redux/features/productFilter/filterSlice";
import { useSearchParams } from "react-router-dom";

const ProductCategory = () => {
  const [searchParams] = useSearchParams();
  const {productLoading, categoryLoading} = useSelector((state:RootState)=>state.filterProducts);
  const [searchToggle, setSearchToggle] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(()=>{
    dispatch(fetchFilterProducts(window.location.search));
    dispatch(fetchCategory());
},[dispatch, searchToggle, searchParams.get('category[_id]')]);

  return (

    <div>
      <MainHeader />
      {productLoading || categoryLoading ? <Spinner /> :
      <>
      <Paper>
        <Grid container sx={{ padding: "60px 3%" }}>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <ProductFilter setSearchToggle={setSearchToggle} searchToggle={searchToggle}  />
          </Grid>
          <Grid item
            xs={12}
            sm={9}
            md={9}
            lg={9}
          >
            <ProductView />
          </Grid>
        </Grid>
      </Paper>
      <Footer />
      <ScrollTop />
      </>
      }
    </div>
  );
};
export default ProductCategory;
