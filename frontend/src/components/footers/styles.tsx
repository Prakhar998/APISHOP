import { styled, createTheme} from "@mui/material/styles"

import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
const StyledButton = styled(Button)({
  color: "white",
  borderColor: "white",
  fontSize: 16,
  width: 200,
  marginTop: "10px",
  marginBottom: "10px"
})
const StyledTextField = styled(TextField)({
  fontSize: 16,
  width: 200,

  "& .MuiInputBase-input": {
    color: "white" // customize the input text color
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white"
    },
    "&.Mui-focused fieldset": {
      borderColor: "white"
    }
  }
})

const themeLight = createTheme({
  palette: {
    secondary: {
      main: "#19B5FE"
    },
    background: {
      default: "#12131b"
    },
    common: {
      white: "#fff"
    }
  }
})

const StyledFooter = styled("footer")({
  backgroundColor: themeLight.palette.background.default,
  display: "flex",
  padding: "0px 50px"
})
const HeadTypography = styled(Typography)({
  padding: "20px 0px",
  color: themeLight.palette.common.white
})
const Subtitle = styled(Typography)({
  lineHeight: "20px",
  justifyContent: "center",
  fontSize: "14px",
  padding: "0px 0px 20px 0px",
  color: themeLight.palette.common.white
})
const LinkStyle = styled(Link)({
  lineHeight: "25px",
  justifyContent: "center",
  fontSize: "14px",
  padding: "20px 0px 20px 0px",
  "&:hover": {
    padding: "5px"
  }
})
const HeadRowStyle = styled(Typography)({
  color: themeLight.palette.common.white,
  display: "flex",
  flexDirection: "column"
})
const CardDivStyle = styled("div")({
  backgroundColor: "#12131b",
  borderRadius: 0,
  textAlign: "center",
  color: themeLight.palette.common.white,
  "&:hover": {
    backgroundColor: themeLight.palette.secondary.main
  }
})
export {
  StyledButton,
  StyledFooter,
  StyledTextField,
  themeLight,
  HeadRowStyle,
  CardDivStyle,
  HeadTypography,
  Subtitle,
  LinkStyle
}
