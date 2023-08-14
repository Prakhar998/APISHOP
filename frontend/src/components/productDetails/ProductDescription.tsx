import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { displayAllProducts, userReview } from "../../api/productCategoryApis";
import { toast } from "react-toastify";
import noImage from "../../assets/product_img/no-image.jpg";
import Stack from "@mui/material/Stack";

const ProductDescription = (props: any) => {
  const { productId } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({ review: "" });
  const [userRating, setUserRating] = useState(null);
  const [allReviewData, setAllReviewData] = useState([]);
  const [refreshState, setRefreshState] = useState(false);
  const { review } = formData;
  const userInfo = useSelector((state: RootState) => state.auth.user);

  const allValues = {
    formData,
    userRating,
    productId,
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const reset = () => {
    setUserRating(null);
    setFormData({ review: "" });
  };

  const handleSubmit = (event: any) => {
    setRefreshState((prev) => !prev);
    event.preventDefault();
    dispatch(userReview(allValues))
      .then((res: any) => {
        if (res.payload.error) {
          toast.error(
            <>
              Rating is required{" "}
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "#fff",
                  border: "none",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              ></button>
            </>
          );
        } else {
          toast.success(
            <>
              Review & Rating Added Successfully{" "}
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "#fff",
                  border: "none",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              ></button>
            </>
          );
        }
      })
      .then(() => {
        setRefreshState((prev) => !prev);
      });
    reset();
  };

  useEffect(() => {
    dispatch(displayAllProducts()).then((res) => {
      setAllReviewData(res.payload.data);
    });
  }, [refreshState]);

  return (
    <div
      style={{
        borderTop: "2px solid #ddd",
        marginTop: "-24px",
        marginRight: "8px",
      }}
    >
      <Typography sx={{ paddingTop: "16px" }}></Typography>
      {userInfo ? (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, position: "relative" }}
        >
          <Typography>Review</Typography>
          <TextField
            margin="normal"
            required
            type="text"
            id="review"
            name="review"
            value={review}
            onChange={onChangeHandler}
            placeholder="Review"
            fullWidth
          />
          <Stack spacing={1}>
            <Rating
              name="half-rating"
              precision={0.5}
              value={userRating}
              onChange={(_, newValue: any) => {
                setUserRating(newValue);
              }}
            />
          </Stack>
          <Typography></Typography>
          <Button
            type="submit"
            sx={{
              backgroundColor: "#00bcd4",
              borderRadius: " 15px",
              color: "#fff",
              fontSize: "15px",
              padding: " 0 30px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontWeight: 700,
              marginTop: "20px",
              marginBottom: "15px",
              p: "10px 20px 10px 20px",
              "&:hover": {
                backgroundColor: "#00bcd4",
              },
            }}
          >
            {"Submit"}
          </Button>
        </Box>
      ) : (
        <Typography
          sx={{
            p: "50px",
            textAlign: "center",
            fontWeight: "700",
            fontSize: "18px",
          }}
        >
          Please login to view Review & Rating
        </Typography>
      )}

      <Box sx={{ width: "100%" }}>
        {allReviewData?.map((value: any) => {
          return (
            <Box key={value.id}>
              {productId.id === value.id &&
                value?.reviews?.map((items: any) => {
                  const originalDate = new Date(items.createdAt);
                  const reviewDate = originalDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });
                  return (
                    <Card style={{ backgroundColor: "transparent" }}>
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ bgcolor: "red[500]" }}
                            aria-label="recipe"
                          >
                            <img
                              style={{ height: "50px", width: "50px" }}
                              src={
                                items?.user?.avatar?.url
                                  ? items?.user?.avatar?.url
                                  : noImage
                              }
                            />
                          </Avatar>
                        }
                        title={items?.user?.name}
                        subheader={reviewDate}
                      />
                      <CardContent>
                        <Rating
                          name="read-only"
                          value={items?.rating}
                          precision={0.5}
                          readOnly
                        />
                        <Typography variant="body2" color="text.secondary">
                          {items?.comment}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })}
            </Box>
          );
        })}
      </Box>
    </div>
  );
};

export default ProductDescription;
