import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import {Avatar,Card,CardContent,Stack,SvgIcon,Typography} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export const DashBoardProfit = (props: any) => {
  //const { difference, positive = false, sx } = props;
  const ordersFromRedux = useSelector((state: RootState) => state.orders);

  const findRecentOrders = () => {
    let count = 0;
    ordersFromRedux.data.map((item: any) => {
      if (item.trackingId.OrderStatus === "ordered") {
        count += 1;
      }
    });
    return count;
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
              Recent Orders
            </Typography>
            <Typography variant="h4">
              {ordersFromRedux.data.length > 0 && findRecentOrders()}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "#00563B",
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
