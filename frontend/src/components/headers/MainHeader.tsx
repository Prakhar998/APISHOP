import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Badge,
  InputBase,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { logoutUser } from "../../redux/features/auth/authSlice";
import { RootState } from "../../redux/store";
import { clearData } from "../../redux/features/checkout/checkoutSlice";
import { clearCheckoutAPIData } from "../../redux/features/checkout/checkoutApiSlice";

type Anchor = "top" | "left" | "bottom" | "right";

const MainHeader = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const checkoutData = useSelector((state: RootState) => state.checkout);
  const { data: checkoutData2 } = useSelector(
    (state: RootState) => state.checkout
  );
  const productCategory = useSelector(
    (state: RootState) => state.productCategory
  );
  const { loading } = useSelector((state: RootState) => state.productCategory);
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [openCollapse, setOpenCollapse] = React.useState(false);
  const dispatch = useDispatch<any>();

  const { user, userLoading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  function handleOpenSettings() {
    setOpenCollapse(!openCollapse);
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    dispatch(logoutUser()).then((res: any) => {
      if (res.payload.success === true) {
        navigate("/");
        dispatch(clearData());
        dispatch(clearCheckoutAPIData());
      }
    });
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    color: "#ffffff",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: 250,
        backgroundColor: "primary.main",
        height: "100%",
        position: "relative",
      }}
      role="presentation"
    >
      <Button
        sx={{
          color: "#fff",
          position: "absolute",
          top: "0",
          right: "0",
          zIndex: "2",
        }}
        onClick={toggleDrawer("left", false)}
      >
        <CloseIcon />
      </Button>

      <List
        className="drawer-menu"
        sx={{
          backgroundColor: "primary.main",
          color: "#ffffff",
          marginTop: "20px",
        }}
      >
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <HomeIcon className="drawer-menu-icon" />
            </ListItemIcon>
            <ListItemText
              primary="HOME"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            />
          </ListItemButton>
        </ListItem>
        <ListItem onClick={handleOpenSettings} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CategoryIcon className="drawer-menu-icon" />
            </ListItemIcon>
            <ListItemText primary="CATEGORIES" />
            {openCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openCollapse} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4, p: "2px 16px 2px 32px" }}>
              <ListItemIcon>
                <ChevronRightIcon className="drawer-menu-icon" />
              </ListItemIcon>
              <ListItemText primary="Laptop" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, p: "2px 16px 2px 32px" }}>
              <ListItemIcon>
                <ChevronRightIcon className="drawer-menu-icon" />
              </ListItemIcon>
              <ListItemText primary="Mobile Phones" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, p: "2px 16px 2px 32px" }}>
              <ListItemIcon>
                <ChevronRightIcon className="drawer-menu-icon" />
              </ListItemIcon>
              <ListItemText primary="Wireless Earbuds" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, p: "2px 16px 2px 32px" }}>
              <ListItemIcon>
                <ChevronRightIcon className="drawer-menu-icon" />
              </ListItemIcon>
              <ListItemText primary="Bluetooth Speakers" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon className="drawer-menu-icon" />
            </ListItemIcon>
            <ListItemText
              primary="ABOUT"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon className="drawer-menu-icon" />
            </ListItemIcon>
            <ListItemText
              primary="CONTACT US"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Search sx={{ m: "15px 16px 0" }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          sx={{ width: "100%" }}
        />
      </Search>
    </Box>
  );

  return (
    <AppBar style={{ position: "sticky", top: 0 }}>
      <Container maxWidth="xl">
        <Toolbar
          className="custom-toolbar"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            sx={{ color: "#fff", display: { sm: "block", md: "none" } }}
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </Button>
          <Drawer
            anchor="left"
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>

          <Typography
            component={Link}
            to="/"
            noWrap
            sx={{
              mr: 2,
              textDecoration: "none",
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

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button component={Link} to="/" sx={{ my: 2, color: "white" }}>
              Home
            </Button>
            <Button
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ my: 2, color: "white" }}
              endIcon={<KeyboardArrowDownIcon />}
            >
              CATEGORIES
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block" },
              }}
            >
              {loading
                ? "wait.."
                : productCategory?.data?.data?.map((cat: any) => (
                    <MenuItem
                      component={Link}
                      to={`/product-category?category[_id]=${cat.id}`}
                      key={cat.id}
                      onClick={handleCloseNavMenu}
                    >
                      <Typography textAlign="center" p="0">
                        {cat.title}
                      </Typography>
                    </MenuItem>
                  ))}
            </Menu>
            <Button
              component={Link}
              to="/about"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white" }}
            >
              About
            </Button>
            <Button component={Link}
              to="/contact" onClick={handleCloseNavMenu} sx={{ my: 2, color: "white" }}>
              Contact Us
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            <Search sx={{ display: { xs: "none", md: "block" } }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Badge
              badgeContent={
                checkoutData2?.data
                  ? checkoutData2?.data[0]?.items?.length ||
                    checkoutData2?.length
                  : checkoutData?.data?.length
              }
              color="success"
              title="cart"
              sx={{ m: "0 20px", cursor: "pointer" }}
            >
              <ShoppingCartOutlinedIcon
                onClick={() => navigate("/cart")}
                sx={{ color: "#ffffff", fontSize: "30px" }}
              />
            </Badge>
            {userLoading ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : isAuthenticated ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      src={user?.avatar?.url ? user?.avatar?.url : user?.avatar}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    component={Link}
                    to="/user-profile"
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/user-profile"
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">Order</Typography>
                  </MenuItem>
                  {user?.isAdmin && (
                    <MenuItem
                      component={Link}
                      target="_blank"
                      to="/dashboard"
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      logoutHandler();
                    }}
                  >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <IconButton component={Link} to="/login">
                <AccountCircleIcon
                  sx={{ color: "#f6f6f6", fontSize: "35px", p: 0 }}
                />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MainHeader;
