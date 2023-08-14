import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import DashBoardOveriewBudget from "./overview/DashBoardOveriewBudget";
import DashBoardTotalProduct from "./overview/DashBoardTotalProduct";
import DashBoardCategoryProduct from "./overview/DashBoardCategoryProduct ";
import { DashBoardProfit } from "./overview/DashBoardProfit";
import PieCharts from "./overview/PieCharts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getAllOrders } from "../../api/dashboardApis";
import { addOrders } from "../../redux/features/dashboard/dashboardOrdersSlice";
import RecentOrdersTable from "./overview/RecentOrdersTable";
import BarCharts from "./overview/BarCharts";
import MainHeading from "../common/MainHeading";

function DashBoardPage() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllOrders()).then((res) => {
      dispatch(addOrders(res.payload.data));
    });
  }, []);
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          paddingTop: "98px",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <DashBoardOveriewBudget
                difference={12}
                positive
                sx={{ height: "100%", backgroundColor: "#00BCD4" }}
                value="$24k"
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <DashBoardTotalProduct
                positive={false}
                sx={{ height: "100%", backgroundColor: "#FBCEB1" }}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <DashBoardCategoryProduct
                sx={{ height: "100%", backgroundColor: "#7CB9E8" }}
                value={75.5}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <DashBoardProfit
                difference={16}
                positive={false}
                sx={{ height: "100%", backgroundColor: "#32de84" }}
                value="1.6k"
              />
            </Grid>
            <Grid xs={12} lg={8}></Grid>
            <Grid xs={12} md={6} lg={4}></Grid>
            <Grid xs={12} md={12} lg={8}></Grid>
          </Grid>
        </Container>
        {/* <h1
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Stats
        </h1> */}
        <MainHeading bgcolor="#ffffff">Orders Overview</MainHeading>
        <br />
        <div
          style={{
            display: "flex",
          }}
        >
          <div style={{ marginRight: 100, marginLeft: 100 }}>
            <RecentOrdersTable />
          </div>

          <div>
            <PieCharts type="OrderStatus" />
          </div>
        </div>
        <br />
        <br />
        <center>
          <BarCharts />
        </center>
      </Box>
    </>
  );
}

export default DashBoardPage;
