import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const DashBoardOveriewBudget = (props: any) => {
  //const { difference, positive = false, sx } = props;
  const ordersFromRedux = useSelector((state: RootState) => state.orders);
  let overallSalesValue = 0;
  const findOverallSales = () => {
    ordersFromRedux?.data?.map((item: any) => {
      overallSalesValue += item.subTotal;
    });
    return overallSalesValue.toFixed(2);
  };
  return (
    <Card sx={props.sx}>
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
              Overall Sales
            </Typography>
            <Typography variant="h4" color="text.secondary">
              {ordersFromRedux.data.length > 0 && findOverallSales()}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "#0295A8",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {/* {difference && (
          <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
            <Stack alignItems="center" direction="row" spacing={0.5}>
              <SvgIcon color={positive ? "success" : "error"} fontSize="small">
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              <Typography
                color={positive ? "success.main" : "error.main"}
                variant="body2"
              >
                {difference}%
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="caption">
              Since last month
            </Typography>
          </Stack>
        )} */}
      </CardContent>
    </Card>
  );
};

export default DashBoardOveriewBudget;
