import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {getOrdersById,changeStatus} from "../../../api/dashboardApis";
import { AppDispatch } from "../../../redux/store";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteModal from "../Modal/DeleteModal";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { toast } from "react-toastify";
function createData(Key: any, value: any) {
  return { Key, value };
}

interface OrderDetailsState {
  user: { name: string };
  product: {
    category: {
      title: string;
    };
    name: string;
  };
  addressId: {
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };

  subTotal: number;
  id: string;
  transaction_id: { paymentStatus: string };
  trackingId: { OrderStatus: string };
}
const OrderDetailsDashboard = () => {
  const location = useLocation();
  const id = location.state.id;
  const [orderDetails, setOrderDetails] = useState<[OrderDetailsState]>();
  const [apistatus, setApiStatus] = useState(false);
  const [OrderStatus, setOrderStatus] = useState<any>("");
  const [showModal, setShowModal] = useState(false);
  const [currentOrderStatus, setCurrentOrderStatus] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const closeModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    dispatch(getOrdersById(id))
      .then((res) => {
        setOrderDetails(res.payload.data);
        setCurrentOrderStatus(res.payload.data[0].trackingId.OrderStatus);
      })
      .then(() => {
        setApiStatus(true);
      });
  }, []);

  const rows = orderDetails && [
    createData("Name", orderDetails[0].user.name),
    createData("Phone", 237),
    createData(
      "Address",
      `${orderDetails[0].addressId.address},${orderDetails[0].addressId.city}-${orderDetails[0].addressId.zipCode},${orderDetails[0].addressId.country}`
    ),
    createData("amount", orderDetails[0].subTotal),
  ];
  const handleSubmitOrderChange = () => {
    dispatch(changeStatus({ id, OrderStatus }))
      .then((res:any) => {
        setShowModal(!showModal);
        setApiStatus(true);
        setCurrentOrderStatus(res?.payload?.data?.data?.OrderStatus);
      })
      .then(() => {
        toast.success(<>Status Updated Succesfully</>);
      });
  };
  const handleModal = (e: SelectChangeEvent) => {
    setShowModal(!showModal);
    setOrderStatus(e.target.value);
  };

  return (
    <>
      {apistatus && rows && orderDetails && (
        <>
          <div>
            <h1
              style={{
                marginLeft: "27px",
                marginBottom: "16px",
                marginTop: "4px",
              }}
            >
              Order: #{orderDetails[0].id}
            </h1>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div>
                <h2>Shipping Info:</h2>
                <Table sx={{ width: 150, marginLeft: 1 }}>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {row.Key}
                        </TableCell>
                        <TableCell>{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div style={{ justifyContent: "space-evenly", display: "flex" }}>
                <h2 style={{ marginRight: "24px" }}>
                  &nbsp;Payment Status:
                  {orderDetails[0].transaction_id.paymentStatus}
                </h2>
                <h2>&nbsp; Order Status: {currentOrderStatus}</h2>
              </div>
              <div>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="orderStatus"
                    value={OrderStatus}
                    name="orderStatus"
                    onChange={(e: SelectChangeEvent) => {
                      handleModal(e);
                    }}
                  >
                    <MenuItem value="ordered">ordered</MenuItem>
                    <MenuItem value="packing">packing</MenuItem>
                    <MenuItem value="shipped">shipped</MenuItem>
                    <MenuItem value="Out_for_delivery">
                      Out_for_delivery
                    </MenuItem>
                    <MenuItem value="delivered">delivered</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div style={{ marginLeft: "30px", marginTop: "16px" }}>
            <h2>Order Items:</h2>
            <TableContainer component={Paper}>
              <Table sx={{ width: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">type</TableCell>
                    <TableCell align="right">Total Cost</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <>
                    {orderDetails !== undefined &&
                      orderDetails?.map((values: any,index:number) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{values?.product?.name}</TableCell>
                            <TableCell align="right">
                              {values?.product?.category?.title}
                            </TableCell>
                            <TableCell align="right">{values?.price}</TableCell>
                            <TableCell align="right">
                              {values?.quantity}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
      <DeleteModal
        showModal={showModal}
        closeModal={closeModal}
        handleClose={() => handleSubmitOrderChange()}
        name="Would you like to update the Order Status"
      />
    </>
  );
};

export default OrderDetailsDashboard;
