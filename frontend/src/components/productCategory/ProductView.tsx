/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ProductCard from "../LatestProduct/ProductCard";
import { Box } from "@mui/material";
import noProduct from "../../assets/product_img/no-product-found.jpg";

const ProductView = () => {
  const {filterResults,products} = useSelector((state:RootState)=>state.filterProducts);


  const productDatas = filterResults.length > 0 ? filterResults : products.data;

  return (
    <>
    {productDatas.length==0 ? <Box><img src={noProduct} /></Box> : <Box sx={{display:'flex',rowGap:'40px',columnGap:'90px',flexWrap:'wrap'}}>
      <ProductCard data={productDatas} autoPlayStatus={false} />
    </Box>}
    </>
  )
};

export default ProductView;
