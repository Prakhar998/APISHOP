import MainHeader from '../headers/MainHeader'
import Footer from '../footers/Footer'
import BreadCrumb from '../checkout/BreadCrumb'
import { Container, Grid } from '@mui/material'
import ContactDetails from './ContactDetails'
import ContactMap from './ContactMap'
import './styles.css';
import { useEffect } from 'react'

const Contactus = () => {
    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 300, left: 0, behavior: "smooth" });
        console.log('scroll to top');
      }, []);
  return (
    <>
        <MainHeader />
        <BreadCrumb name="contact" path="/contact" />
        <Container sx={{padding:'70px 0 60px'}}>
            <Grid container spacing={10}>
                <Grid className="contact-details" item xs={12} sm={6}>
                    <ContactDetails />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ContactMap />
                </Grid>
            </Grid>
        </Container>
        <Footer />
    </>
  )
}

export default Contactus