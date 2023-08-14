import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/features/auth/authApis";
import {
  updateProfileImage,
  userOrderDetails,
} from "../../redux/features/userProflie/userProfileApis";
import { AppDispatch, RootState } from "../../redux/store";
import UserOrderDetailsModal from "./UserOrderDetailsModal";
import { authUser } from "../../redux/features/auth/authSlice";
import noImage from "../../assets/product_img/no-image.jpg";
import { addImage } from "../../redux/features/userProflie/userProfileSlice";
import { toast } from "react-toastify";
import MailIcon from "@mui/icons-material/Mail";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

// Define the styles for the user profile page
const UserProfileBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(4),
}));
const UserAvatar = styled("img")({
  width: "50%",
  height: "5%",
  padding: "5px",
  marginLeft: "50px",
});
const UserDetailsCard = styled(Card)({
  backgroundColor: "white-smoke",
});
const UserOrdersCard = styled(Card)({
  height: "100%",
  display: "flex",
});
const OrderTable = styled("table")({
  width: "100%",
  borderCollapse: "collapse",
});
const OrderTableHead = styled("thead")({
  borderBottom: "1px solid black",
});
const OrderTableBody = styled("tbody")({});
const OrderTableRow = styled("tr")({
  borderBottom: "1px solid black",
});
const OrderTableHeaderCell = styled("th")({
  padding: "10px",
  textAlign: "center",
});
const OrderTableCell = styled("td")({
  padding: "20px",
  textAlign: "center",
});
// Define the user profile page component
const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.auth.user);
  const [name, setName] = useState(userInfo?.name);
  const [phone, setPhone] = useState(userInfo?.phone);
  const [email, setEmail] = useState(userInfo?.email);
  const [isEditing, setIsEditing] = useState(false);
  const [userOrderDetail, setUserOrderDetail] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const orderIdRef = useRef("");
  const [status, setStatus] = useState(false);
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const [refreshState, setRefreshState] = useState(false);

  const handleCloseDialog = () => {
    setIsEditing(false);
    setOpenDialog(false);
  };
  const handleEditClick = () => {
    setIsEditing(true);
    setOpenDialog(true);
  };
  const [hoverBtn, setHoverBtn] = useState("");
  console.log(email, status);
  const handleUpdateDetails = async () => {
    // Update user details here
    const userDetails = {
      name: name,
      phone: phone,
    };
    const response = await dispatch(updateProfile(userDetails));
    if (updateProfile.fulfilled.match(response)) {
      const updatedUserDetails = response.payload;
      setName(updatedUserDetails.name);
      setPhone(updatedUserDetails.phone);
    }
    dispatch(authUser());
    setIsEditing(false);
    setOpenDialog(false);
    setRefreshState((prev) => !prev);
  };
  useEffect(() => {
    dispatch(userOrderDetails()).then((res: any) => {
      if (res?.payload?.success === true) {
        setUserOrderDetail(res?.payload?.data);
      }
    });
  }, [refreshState]);
  const showUserDetailsModal = () => {
    setUserDetailsModal(!userDetailsModal);
  };
  const handleIButtonClick = (OrderId: any) => {
    orderIdRef.current = OrderId;
    setStatus((prev) => !prev);
    setUserDetailsModal(!userDetailsModal);
  };
  const closeOrderModal = () => {
    setUserDetailsModal(!userDetailsModal);
  };
  const handleFileChange = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();
    input.addEventListener("change", (event: any) => {
      const selectedFiles = event.target.files[0];
      const formData = new FormData();
      formData.append("profilepic", selectedFiles);
      const data = {
        values: formData,
      };
      dispatch(updateProfileImage(data))
        .then(() => {
          dispatch(addImage(data));
          setRefreshState((prev) => !prev);
          dispatch(authUser());
        })
        .then(() => {
          toast.success(
            <>
              Image Uploaded Succesfully{" "}
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
        });
      console.log(selectedFiles);
    });
  };
  let NewDate = moment(new Date(userInfo?.createdAt), "DD-MM-YYYY").format();
  NewDate = NewDate.split("T")[0];

  return (
    <UserProfileBox>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <UserDetailsCard>
            <CardContent>
              <Box
                onMouseOver={() => setHoverBtn(userInfo?.id)}
                onMouseOut={() => setHoverBtn("null")}
                sx={{ height: "220px" }}
              >
                <Box
                  className="user-profile-image"
                  sx={{ height: "110px", backgroundColor: "#00bcd4" }}
                >
                  <UserAvatar
                    src={
                      userInfo?.avatar?.url ? userInfo?.avatar?.url : noImage
                    }
                    style={{
                      verticalAlign: "middle",
                      width: "190px",
                      height: "190px",
                      borderRadius: "50%",
                      padding: "20px",
                      marginLeft: "90px",
                      marginTop: "20px",
                    }}
                    alt={userInfo && userInfo.name}
                  />
                </Box>
                {hoverBtn == userInfo?.id && (
                  <Button
                    style={{
                      position: "relative",
                      color: "#ffffff",
                      backgroundColor: "#000000",
                      opacity: "0.8",
                      right: "-151px",
                      top: "-15px",
                    }}
                    title="update Image"
                    onClick={handleFileChange}
                    color="inherit"
                  >
                    <EditIcon />
                  </Button>
                )}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{ fontWeight: "600", fontSize: "1.50rem",textTransform:'capitalize',color:'#00bcd4' }}
                  variant="h6"
                  gutterBottom
                >Welcome&nbsp;
                  {/* Name:{" "} */}
                  {isEditing ? (
                    <span
                      contentEditable
                      onBlur={(e) => {
                        setName(e.target.innerText);
                        handleEditClick();
                      }}
                    >
                      {userInfo.name}
                    </span>
                  ) : userInfo?.success ? (
                    userInfo?.data.name
                  ) : (
                    userInfo?.name
                  )}
                </Typography>
                <Typography
                  sx={{ marginBottom: "0.6em" }}
                  variant="h6"
                  gutterBottom
                >
                  <MailIcon
                    sx={{
                      marginRight: "7px",
                      marginBottom: "-5px",
                      width: "0.8em",
                      color:'#00bcd4'
                    }}
                  />
                  {isEditing ? (
                    <span
                      contentEditable
                      onBlur={(e) => {
                        setEmail(e.target.innerText);
                        handleEditClick();
                      }}
                    >
                      <></> {userInfo.email}
                    </span>
                  ) : userInfo?.success ? (
                    userInfo?.data.email
                  ) : (
                    userInfo?.email
                  )}
                </Typography>
                <Typography
                  sx={{ marginBottom: "0.6em" }}
                  variant="h6"
                  gutterBottom
                >
                  <SmartphoneIcon
                    sx={{
                      marginRight: "7px",
                      marginBottom: "-5px",
                      width: "0.8em",
                      color:'#00bcd4'
                    }}
                  />
                  {isEditing ? (
                    <span
                      contentEditable
                      onBlur={(e) => {
                        setPhone(e.target.innerText);
                        handleEditClick();
                      }}
                    >
                      {userInfo.phone}
                    </span>
                  ) : userInfo?.success ? (
                    userInfo?.data.phone
                  ) : (
                    userInfo?.phone
                  )}
                </Typography>
                <Typography
                  sx={{ marginBottom: "0.6em" }}
                  variant="h6"
                  gutterBottom
                >
                  {" "}
                  <CalendarTodayIcon
                    sx={{
                      marginRight: "7px",
                      marginBottom: "-5px",
                      width: "0.8em",
                      color:'#00bcd4'
                    }}
                  />
                  {NewDate}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ color: "white" }}
                  onClick={handleEditClick}
                >
                  Edit Details
                </Button>
              </Box>
            </CardContent>
          </UserDetailsCard>
        </Grid>
        <Grid item xs={12} md={8}>
          <UserOrdersCard>
            {userDetailsModal && (
              <UserOrderDetailsModal
                closeOrderModal={closeOrderModal}
                showUserDetailsModal={showUserDetailsModal}
                userOrderDetail={userOrderDetail}
                OrderId={orderIdRef.current}
              />
            )}
            {userOrderDetail.length !== 0 ? (
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {" "}
                  Orders{" "}
                </Typography>
                <OrderTable>
                  <OrderTableHead>
                    <OrderTableRow>
                      <OrderTableHeaderCell>View</OrderTableHeaderCell>
                      <OrderTableHeaderCell>
                        No. of Quantity
                      </OrderTableHeaderCell>
                      {/* <OrderTableHeaderCell>Order Id</OrderTableHeaderCell> */}
                      <OrderTableHeaderCell>Date</OrderTableHeaderCell>
                      <OrderTableHeaderCell>
                        Payment Status
                      </OrderTableHeaderCell>
                      <OrderTableHeaderCell>Price</OrderTableHeaderCell>
                      <OrderTableHeaderCell>Status</OrderTableHeaderCell>
                    </OrderTableRow>
                  </OrderTableHead>
                  <OrderTableBody>
                    {" "}
                    {userOrderDetail.map((order: any) => {
                      let NewDate = moment(
                        new Date(order.createdAt),
                        "DD-MM-YYYY"
                      ).format();
                      NewDate = NewDate.split("T")[0];
                      return (
                        <OrderTableRow key={order.id}>
                          <OrderTableCell key={order.id}>
                            <Button
                              onClick={() => {
                                handleIButtonClick(order.id);
                              }}
                            >
                              <VisibilityIcon />
                            </Button>
                          </OrderTableCell>
                          <OrderTableCell>{order.quantity}</OrderTableCell>
                          <OrderTableCell>{NewDate}</OrderTableCell>
                          <OrderTableCell>
                            {order.transaction_id.paymentStatus}
                          </OrderTableCell>
                          <OrderTableCell>
                            ${order.transaction_id.amount}
                          </OrderTableCell>
                          <OrderTableCell>
                            {order.trackingId.OrderStatus}
                          </OrderTableCell>
                        </OrderTableRow>
                      );
                    })}
                  </OrderTableBody>
                </OrderTable>
              </CardContent>
            ) : (
              <Box>
                <Typography
                  style={{ position: "relative", right: "-291px", top: "51%" }}
                >
                  No Order Placed
                </Typography>
              </Box>
            )}
          </UserOrdersCard>
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
              autoFocus
            />
            <TextField
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateDetails} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </UserProfileBox>
  );
};
export default UserProfile;
