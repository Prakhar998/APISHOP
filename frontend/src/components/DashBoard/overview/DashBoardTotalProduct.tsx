import InventoryIcon from "@mui/icons-material/Inventory";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
const DashBoardTotalProduct = (props: any) => {
  const { sx } = props;
  const ordersFromRedux = useSelector((state: RootState) => state.orders);
  let totalProducts = 0;
  const computeTotalProducts = () => {
    ordersFromRedux?.data?.map((item: any) => {
      totalProducts += item.quantity;
    });
    return totalProducts;
  };
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              sx={{ fontWeight: "bold" }}
              color="text.secondary"
              variant="overline"
            >
              Total sold items
            </Typography>
            <Typography variant="h4">
              {ordersFromRedux.data.length > 0 && computeTotalProducts()}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "warning.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <InventoryIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DashBoardTotalProduct;
