import {
  Container,
  Grid,
  IconButton,
  Box,
  Typography
} from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwittwerIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import YouTubeIcon from "@mui/icons-material/YouTube"
import GoogleIcon from "@mui/icons-material/Google"
import PinterestIcon from "@mui/icons-material/Pinterest"
import GoogleImage from "../../assets/app_img/play-store.png"
import AppleImage from "../../assets/app_img/app-store.png"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import SupportAgentIcon from "@mui/icons-material/SupportAgent"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import Divider from "@mui/material/Divider"
import {
  StyledButton,
  StyledTextField,
  themeLight,
  StyledFooter,
  HeadTypography,
  Subtitle,
  LinkStyle,
  HeadRowStyle,
  CardDivStyle
} from "./styles"
import ContactMap from "../ContactUs/ContactMap"

function Footer () {
  const IconStyles = {
    verticalAlign: "middle",
    fontSize: "large"
  }
  return (
    <>
      <Box>
        {/* /Grid */}
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6} md={3}>
            <CardDivStyle>
              <div style={{ padding: 30 }}>
                <LocalShippingIcon style={{ verticalAlign: "middle" }} />
                &nbsp; |&nbsp;FREE SHIPPING
                <div style={{ fontSize: "13px" }}>FOR ORDERS ABOVE $100</div>
                <Divider orientation="vertical" />
              </div>
            </CardDivStyle>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardDivStyle>
              <div style={{ padding: 30 }}>
                <SupportAgentIcon style={{ verticalAlign: "middle" }} />
                &nbsp; |&nbsp;CUSTOMER CARE
                <div style={{ fontSize: "13px" }}>24/7 FRIENDLY SUPPORT</div>
              </div>
            </CardDivStyle>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardDivStyle>
              <div style={{ padding: 30 }}>
                <KeyboardReturnIcon style={{ verticalAlign: "middle" }} />
                &nbsp; |&nbsp;HAPPY RETURNS
                <div style={{ fontSize: "13px" }}>7 DAYS FREE RETURNS</div>
              </div>
            </CardDivStyle>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardDivStyle>
              <div style={{ padding: 30 }}>
                <CreditCardIcon style={{ verticalAlign: "middle" }} />
                &nbsp; |&nbsp;100% MONEY BACK
                <div style={{ fontSize: "13px" }}>IF PRODUCT IS DAMAGED</div>
              </div>
            </CardDivStyle>
          </Grid>
        </Grid>
      </Box>
      <StyledFooter>
        <Box >
          <Grid container spacing={0} style={{alignItems:'space-evenly'}}>
            <Grid item xs={12} sm={6} md={2.3}>
              <Container>
                {/* About US */}
                <HeadTypography>About Us</HeadTypography>
                <Box sx={{borderBottom:"2px solid purple " ,width:"20%" ,margin:"5 auto ",marginLeft:"1%", marginTop:"-16px",marginBottom:'16px'}} color={"whiteSmoke"} />
                <Subtitle variant="subtitle1">
                  APIShop is an ecommerce accessories online shop. We provide
                  100% quality products for your needs.
                </Subtitle>
              </Container>
            </Grid>
            <Grid item xs={12} sm={6} md={2.3}>
              <Container>
                {/* Account */}
                <HeadTypography>Quick Links</HeadTypography>
                <Box sx={{borderBottom:"2px solid purple " ,width:"20%" ,margin:"5 auto ",marginLeft:"1%", marginTop:"-16px",marginBottom:'16px'}} color={"whiteSmoke"} />
                <LinkStyle
                  href="/"
                  underline="none"
                  color={themeLight.palette.common.white}
                >
                  Home
                </LinkStyle>
                <br />
                <LinkStyle
                  href="/about"
                  underline="none"
                  color={themeLight.palette.common.white}
                >
                  About Us
                </LinkStyle>
                <br />
                <LinkStyle
                  href="/contact"
                  underline="none"
                  color={themeLight.palette.common.white}
                >
                  Contact Us
                </LinkStyle>
                <br />
                <LinkStyle
                  href="/cart"
                  underline="none"
                  color={themeLight.palette.common.white}
                >
                  Your Cart
                </LinkStyle>
              </Container>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Container>
                {/* Support */}
                <HeadTypography>Address</HeadTypography>
                <Box sx={{borderBottom:"2px solid purple " ,width:"20%" ,margin:"5 auto ",marginLeft:"1%", marginTop:"-16px",marginBottom:'16px'}} color={"whiteSmoke"} />
                <Typography style={{color:"white"}}>
                1351 North Alma School Road Suite ,
                </Typography>
                <Typography style={{color:"white"}}>
                150 Chandler, AZ 85224 
                </Typography>
                <Typography style={{color:"white"}}>
                  United States
                </Typography>
                <br/>
                <Typography style={{color:"white"}}>
                  	Mobile Number : +1 22345467
                </Typography>
                <br/>
                <Typography style={{color:"white"}}>
                  Helpline Number : +1 22345667,+91 9855644342
                </Typography>
              </Container>
            </Grid>
            <Grid sx={{marginLeft:'40px'}}>
            <HeadTypography sx={{marginLeft:'30px'}}>Map</HeadTypography>
            <Box sx={{borderBottom:"2px solid purple " ,width:"10%" ,margin:"0 auto ",marginLeft:"30px", marginTop:"-16px",marginBottom:'16px'}} color={"whiteSmoke"} />
              <Container style={{marginTop:"4px"}}>
                <Grid item xs={12} sm={12}><ContactMap  /></Grid>
              </Container>
            </Grid>
            <Grid style={{color:"white",marginTop:'32px'}} item xs={12} >
              <Container>
                <Typography>
                  <center>
                Copyright © 2023 - 2024  <span style={{color:"cyan"}}> APISHOP, India </span>— All Rights Reserved — Created By<span style={{color:"cyan"}}> APISPOCC</span>
                </center>
                </Typography>
              </Container>
            </Grid>
          </Grid>
        </Box>
      </StyledFooter>
    </>
  )
}

export default Footer
