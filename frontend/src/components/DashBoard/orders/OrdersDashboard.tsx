import { useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { getAllOrders } from "../../../api/dashboardApis";
import { AppDispatch } from "../../../redux/store";
import { Button } from "@mui/material";
import {useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
const OrdersDashboard = () => {
  //const [status, setStatus] = useState(false);
  const [ordersData, setOrdersData] = useState([]);
  const dispatch = useDispatch<AppDispatch>();
  const orderIdRef = useRef("");
  const navigate = useNavigate();
  const handleIButtonClick = (OrderId: any) => {
    orderIdRef.current = OrderId;
    //setStatus((prev) => !prev);
    navigate("orderDetails", { state: { id: orderIdRef.current } });
  };
  useEffect(() => {
    dispatch(getAllOrders()).then((res: any) => {
      setOrdersData(res.payload.data);
    });
  }, []);
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Order ID",
      width: 250,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 150,
    },

    { field: "totalPrice", headerName: "Total Price", width: 150 },
    { field: "status", headerName: "Order Status", width: 150 },
    {
      field: "view",
      headerName: "View",
      width: 150,
      renderCell: (params) => (
        <Button onClick={() => handleIButtonClick(params.id)}>
          <VisibilityIcon />
        </Button>
      ),
    },
    // {
    //   field: "orderStatus",
    //   headerName: "Order Status",
    //   width: 150,
    //   renderCell: () => (
    //     <FormControl fullWidth>
    //       <Select
    //         labelId="demo-simple-select-label"
    //         id="demo-simple-select"
    //         value={status}
    //         label="orderStatus"
    //         name="orderStatus"
    //         onChange={(e) => setStatus(e.target.value)}
    //       >
    //         <MenuItem value="In Progress">In Progress</MenuItem>
    //         <MenuItem value="Shipped">Shipped</MenuItem>
    //         <MenuItem value="Delivered">Delivered</MenuItem>
    //       </Select>
    //     </FormControl>
    //   ),
    // },
  ];
  const rows = ordersData.map((order: any) => ({
    id: order.id,
    quantity: order.quantity,
    totalPrice: order.subTotal,
    status: order.trackingId.OrderStatus,
  }));

  return (
    <div style={{ marginTop: 80, padding: "0 40px 0 40px " }}>
      <div style={{ height: 650 }}>
        <h1>Orders</h1>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
        />
      </div>
    </div>
  );
};

export default OrdersDashboard;
