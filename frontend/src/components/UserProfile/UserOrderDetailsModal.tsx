import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Box, CardContent, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import noImage from "../../assets/product_img/no-image.jpg";
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
const UserOrderDetailsModal = (props: any) => {
  const {
    showUserDetailsModal,
    userOrderDetail,
    closeOrderModal,
    OrderId,
  } = props;

  return (
    <div>
      {showUserDetailsModal && (
        <Dialog
          open={showUserDetailsModal}
          PaperProps={{
            style: {
              // margin: "10px",
              // width: "25%",
            },
          }}
          onClose={closeOrderModal}
        >
          <Box
            style={{
              display: "flex",
              padding: "25px",
              justifyContent: "space-between",
            }}
          >
            <Box className="image-modal-heading" id="customized-dialog-title">
              User Order Detail
            </Box>
            <IconButton
              aria-label="close"
              onClick={closeOrderModal}
              sx={{
                padding: "0px",
              }}
            >
              <CloseIcon style={{ padding: "0px" }} />
            </IconButton>
          </Box>
          <DialogContent style={{ padding: "8px 14px" }} dividers>
            <Box className="image-upload">
              <CardContent>
                <OrderTable>
                  <OrderTableHead>
                    <OrderTableRow>
                      <OrderTableHeaderCell>Product Name</OrderTableHeaderCell>
                      <OrderTableHeaderCell>Image</OrderTableHeaderCell>
                    </OrderTableRow>
                  </OrderTableHead>
                  <OrderTableBody>
                    {" "}
                    {userOrderDetail.map(
                      (order: any) =>
                        order.id === OrderId && (
                          <>
                            <OrderTableRow key={order.id}>
                              <OrderTableCell
                                style={{
                                  padding: "18px 10px 10px 6px",
                                  textAlign: "left",
                                  width: "60%",
                                }}
                              >
                                {order?.product?.name}
                              </OrderTableCell>
                              <OrderTableCell
                                key={order.id}
                                style={{ padding: "15px" }}
                              >
                                <img
                                  style={{ width: "73px", height: "53px" }}
                                  src={
                                    order?.product?.images[0]?.url
                                      ? order?.product?.images[0]?.url
                                      : noImage
                                  }
                                />
                              </OrderTableCell>
                            </OrderTableRow>
                            <OrderTableRow>
                            <OrderTableCell colSpan={2}>
                              <Alert severity="info" icon={false} sx={{display:'flex',textTransform:'capitalize',fontSize:'16px'}}><LocationOnIcon /> {order.addressId.address}, {order.addressId.landmark}, {order.addressId.city}, {order.addressId.state}, {order.addressId.zipCode}, {order.addressId.country}</Alert>
                            
                            </OrderTableCell>
                            </OrderTableRow>
                          </>
                        )
                    )}
                  </OrderTableBody>
                </OrderTable>
              </CardContent>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UserOrderDetailsModal;
