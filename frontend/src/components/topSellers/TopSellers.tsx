import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ProductCard from "../LatestProduct/ProductCard";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const TopSellers = () => {
  const bestSeller = useSelector((state: RootState) => state.bestSeller.data);
  const topRated = useSelector((state: RootState) => state.topRated.data);
  const [buttonHighlightState, setButtonHighlightState] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (data === null && topRated && topRated.length > 0) {
      setData(topRated);
    }
  }, [topRated]);

  useEffect(() => {
    setData(
      !buttonHighlightState
        ? bestSeller.slice(0, 5).map((item: any) => item.product_info)
        : topRated
    );
  }, [buttonHighlightState]);
  const handleTopSellers = () => {
    setButtonHighlightState(true);
  };
  const handleBestRated = () => {
    setButtonHighlightState(false);
  };
  return (
    <>
      <Box
        className="latest-product-wrapper"
        style={{
          boxSizing: "border-box",
        }}
      >
        <Button
          style={{ border: "none" }}
          variant={buttonHighlightState ? "contained" : "outlined"}
          onClick={handleTopSellers}
        >
          <Typography className="heading" variant="h6">
            TOP SELLERS
          </Typography>
        </Button>
        <Button
          style={{ border: "none" }}
          onClick={handleBestRated}
          variant={!buttonHighlightState ? "contained" : "outlined"}
        >
          <Typography className="heading" variant="h6">
            BEST RATED
          </Typography>
        </Button>
        <div
          style={{
            borderBottom: "7px solid #34aadc",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        ></div>
        <Box sx={{display:'flex',gap:'30px',flexWrap:'wrap'}}>
          <ProductCard data={data} autoPlayStatus={false} />
        </Box>
      </Box>
    </>
  );
};

export default TopSellers;
