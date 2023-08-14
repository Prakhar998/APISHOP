import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    typography:{
      fontFamily:['Open Sans','sans-serif'].join(',') 
    },
    palette: {
      primary: {
        main: '#00bcd4',
        contrastText: '#ffffff'
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        // light: will be calculated from palette.primary.main,
        main: '#fb8802',
        // dark: will be calculated from palette.primary.main,
        contrastText: '#ffffff'
      }
    }
  });

export default theme
