/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box} from "@mui/material";
import "../LatestProduct/style.css";
import {useSelector } from "react-redux";
import "react-alice-carousel/lib/alice-carousel.css";
import {RootState } from "../../redux/store";
import Skeleton from '@mui/material/Skeleton';
import ProductCard from "./ProductCard";
import MainHeading from "../common/MainHeading";

const LatestProduct = () => {
  const {loading, data } = useSelector((state: RootState) => state.product);

  return (
    <>
      <Box className="latest-product-wrapper">
        <MainHeading bgcolor="#fbfbfb">Explore Products</MainHeading>
        <Box sx={{display:'flex',gap:'30px',flexWrap:'wrap',marginTop:'30px'}}>
        {loading ? (
          <>
          {[...Array(10).keys()].map((item)=>(
            <div key={item}>
            <Skeleton variant="rectangular" width={250} height={200} sx={{marginBottom:'10px'}} />
            <Skeleton variant="rectangular" width={250} height={100} />
            </div>
          ))}
          </>
        ) : (
          <ProductCard data={data} autoPlayStatus={false} />
        )}
        </Box>
      </Box>
    </>
  );
};
export default LatestProduct;
