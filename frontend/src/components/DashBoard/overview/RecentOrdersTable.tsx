import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  orderId: string,
  quantity: number,
  totalPrice: number,
  status: string,
  view: JSX.Element
) {
  return { orderId, quantity, totalPrice, status, view };
}

const RecentOrdersTable = () => {
  const allOrders = useSelector((state: RootState) => state.orders);
  const navigate = useNavigate();
  const handleIButtonClick = (identity: string) => {
    navigate("orders/orderDetails", { state: { id: identity } });
  };
  const rows = [
    allOrders.data.length > 0 &&
      allOrders.data
        .filter((item: any) => item.trackingId.OrderStatus === "ordered")
        .slice(0, 5)
        .map((item: any) => {
          return createData(
            item.id,
            item.quantity,
            item.subTotal,
            item.trackingId.OrderStatus,
            <Button onClick={() => handleIButtonClick(item.id)}>
              <VisibilityIcon />
            </Button>
          );
        }),
  ];

  return (
    <div>
      {/* <h3 style={{ paddingLeft: 40, paddingBottom: 30 }}>Recent Orders</h3> */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ height: "30px" }}>
                Order Id
              </StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Total Price</StyledTableCell>
              <StyledTableCell>Order Status</StyledTableCell>
              <StyledTableCell>View</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows[0] !== false &&
              rows[0].map((row: any) => {
                return (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>{row.orderId}</StyledTableCell>
                    <StyledTableCell>{row.quantity}</StyledTableCell>
                    <StyledTableCell>{row.totalPrice}</StyledTableCell>
                    <StyledTableCell>{row.status}</StyledTableCell>
                    <StyledTableCell>{row.view}</StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RecentOrdersTable;
