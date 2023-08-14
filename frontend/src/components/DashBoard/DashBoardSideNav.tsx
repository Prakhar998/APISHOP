/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { IconButton, SvgIcon, useMediaQuery, Typography } from "@mui/material";
import "./style.css";
import { Link, useLocation } from "react-router-dom";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import InventoryIcon from "@mui/icons-material/Inventory";

const drawerWidth = 240;

const data = [
  {
    id: "1",
    ListName: "Overview",
    to: "/dashboard",
    name: "Overview",
    icon: <ChartBarIcon />,
  },
  {
    id: "2",
    ListName: "Products",
    to: "/dashboard/products",
    name: "Products",
    icon: <ProductionQuantityLimitsIcon />,
  },
  {
    id: "3",
    ListName: "Orders",
    to: "/dashboard/orders",
    name: "Orders",
    icon: <InventoryIcon />,
  },
  {
    id: "4",
    ListName: "User",
    to: "/dashboard/users",
    name: "Users",
    icon: <VerifiedUserIcon />,
  },
];

const DashBoardSideNav = () => {
  const pathName = useLocation();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  return (
    <Box>
      <CssBaseline />
      {!lgUp && (
        <IconButton>
          <SvgIcon fontSize="small">
            <Bars3Icon />
          </SvgIcon>
        </IconButton>
      )}
      <Drawer
        className="dashboard-drawer"
        sx={{
          width: drawerWidth,
          // flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#111927",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{p:'40px 40px 0'}}>
          <Typography
          component={Link}
          to="/"
          title="Home"
          noWrap
          sx={{
            textDecoration: "none",
            textAlign: "cener",
            display: "flex",
            justifyContent: "center",
            color: "#fff",
            fontSize: "20px",
            fontWeight: "700",
            border: "2px solid #fff",
            padding: "10px",
            lineHeight: 1,
          }}
          className="app-logo"
        >
          APISHOP
        </Typography>
        </Box>
        
        <List className="item-list">
          {data.map((item) => {
            const active = item.to ? pathName.pathname === item.to : false;
            return (
              <ListItem key={item.id} disablePadding>
                <Link className="redirect-link" to={item.to}>
                  <ListItemButton className={active ? "item-text-active" : ""}>
                    <ListItemIcon className="item-list-icon">
                      {item.id ? (
                        <SvgIcon
                          className={active ? "item-icon-active" : "item-icon"}
                          fontSize="small"
                        >
                          {item.icon}
                        </SvgIcon>
                      ) : (
                        ""
                      )}
                    </ListItemIcon>
                    <ListItemText className="item-text" primary={item.name} />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      ></Box>
    </Box>
  );
};
export default DashBoardSideNav;
