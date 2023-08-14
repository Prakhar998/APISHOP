/* eslint-disable @typescript-eslint/prefer-as-const */
import { useTheme } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { green } from "@mui/material/colors";
import { SxProps } from "@mui/system";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";


const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};
const fabGreenStyle = {
  color: "common.white",
  bgcolor: "primary",
  "&:hover": {
    bgcolor: green[600],
  },
};
export default function BounceButton() {
  const theme = useTheme();
  const {data:checkoutData} = useSelector((state: RootState) => state.checkout);
  //const { data:checkoutData2 } = useSelector((state: RootState) => state.checkoutApis);
  const navigate = useNavigate();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  const fab = [
    {
      color: "primary" as const,
      sx: fabStyle as SxProps,
      icon: <AddIcon />,
      label: "Add",
    },
  ];
  const itemCount = checkoutData?.length;

  if (itemCount > 0) {
    return (
      <Zoom
        key={"aa"}
        in
        timeout={transitionDuration}
        style={{
          transitionDelay: `transitionDuration.exit ms`,
        }}
        unmountOnExit
      >
        <Fab sx={fabGreenStyle} aria-label={fab[0].label} color="primary">
          <Badge
            badgeContent={checkoutData?.length}
            sx={{ m: "0 20px", marginTop: "4px", color: "#ffffff" }}
          >
            <ShoppingCartOutlinedIcon
              onClick={() => navigate("/cart")}
              sx={{ color: "#ffffff", fontSize: "30px" }}
            />
          </Badge>
        </Fab>
      </Zoom>
    );
  }
  return <></>;
}
