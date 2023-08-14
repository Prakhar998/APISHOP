import { Box, Typography } from "@mui/material";

const MainHeading = (props: any) => {
  return (
    <Box sx={{display:'flex',justifyContent:'center',borderTop:'3px solid #00bcd4',margin:'0 auto 10px',width:'60%'}}>
        <Typography sx={{color:'#00bcd4',bgcolor:props.bgcolor,p:'0 15px',marginTop:'-19px'}} variant="h5">{props.children}</Typography>
    </Box>
  )
}

export default MainHeading;