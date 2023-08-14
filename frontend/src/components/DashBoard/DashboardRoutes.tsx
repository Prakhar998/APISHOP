import MenuIcon from "@mui/icons-material/Menu";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Route, Routes} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/features/auth/authSlice";
import { RootState } from "../../redux/store";
import DashBoardSideNav from "../DashBoard/DashBoardSideNav";
import ProductDashBoard from "../DashBoard/ProductDashBoard/ProductDashBoard";
import DashBoardLayout from "../DashBoard/layout/DashBoardLayout";
import UserDashBoard from "./User/UserDashBoard";
import OrdersDashboard from "./orders/OrdersDashboard";
import OrderDetailsDashboard from "./orders/OrderDetailsDashboard";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LogoutIcon from "@mui/icons-material/Logout";
function DashboardRoutes() {
  const [sandwichState, setSandwichState] = useState(true);
  const userInfo = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<any>();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  const handleSandwich = () => {
    setSandwichState((prev) => !prev);
  };
  const sendToMainSite = () => {
    window.open("/", "_blank");
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <div>{sandwichState && <DashBoardSideNav />}</div>
        <div style={{ width: "100%" }}>
          <Box>
            <div
              color="transparent"
              style={{
                backgroundColor: "#111927",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  {
                    <MenuIcon
                      onClick={handleSandwich}
                      style={{
                        color: "white",
                        margin: "10px 0px 0px -2px",
                        cursor: "pointer",
                      }}
                    />
                  }
                </div>

                <Box
                  style={{
                    marginRight: "24px",
                    display: "flex",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <Typography
                    style={{
                      textTransform: "capitalize",
                      color: "white",
                      marginRight: "20px",
                    }}
                  >
                    Hi, {userInfo.name}
                  </Typography>
                  <Button
                    onClick={sendToMainSite}
                    variant="contained"
                    style={{ marginRight: "10px", color: "white" }}
                    startIcon={<VisibilityIcon />}
                  >
                    Visit Site
                  </Button>
                  <Button
                    onClick={logoutHandler}
                    variant="contained"
                    style={{ marginRight: "10px", color: "white" }}
                    startIcon={<LogoutIcon />}
                  >
                    Logout
                  </Button>
                </Box>
              </div>
            </div>
          </Box>

          <Routes>
            <Route path="/" element={<DashBoardLayout />} />
            <Route path="/products" element={<ProductDashBoard />} />
            <Route path="/overview" element={<DashBoardLayout />} />
            <Route path="/users" element={<UserDashBoard />} />
            <Route path="/orders" element={<OrdersDashboard />} />
            <Route
              path="/orders/orderDetails"
              element={<OrderDetailsDashboard />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default DashboardRoutes;
