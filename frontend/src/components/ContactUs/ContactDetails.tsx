import { Typography } from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';

const ContactDetails = () => {
  return (
    <>
    <Typography variant="h5">Get In Touch With Us</Typography>
    <Typography>Have questions or need assistance? Contact us today! Our dedicated support team is here to help you with any inquiries or concerns. Reach out to us through email and phone, and we'll get back to you as soon as possible.</Typography>
    <div className="info-box">
        <BusinessIcon />
        <div className="info-sub-box">
            <Typography><strong>Our Address</strong></Typography>
            <Typography>WeWork, Floor 19, C-001/A2, Sector 16B, Noida, UP 201301, India</Typography>
        </div>    
    </div>
    <div className="info-box">
        <PhoneIphoneIcon />
        <div className="info-sub-box">
            <Typography><strong>Phone Number</strong></Typography>
            <Typography>(+91) 8141-4257-80</Typography>
        </div>    
    </div>
    <div className="info-box">
        <EmailIcon />
        <div className="info-sub-box">
            <Typography><strong>Email Address</strong></Typography>
            <Typography>support@apishop.com</Typography>
        </div>    
    </div>


    </>
  )
}

export default ContactDetails