import { Container, Grid, Typography } from '@mui/material';
import MainHeading from '../common/MainHeading';

const AboutPara = () => {
  return (
    <section >
      <Container maxWidth="lg" style={{padding:'70px 0 60px'}}>
        <Grid container justifyContent="center" >
          <Grid item xs={12}>
            <MainHeading bgcolor="#ffffff">About APISHOP</MainHeading>
            <div className="about_us_content">
              <Typography variant="h5" gutterBottom>
                <span>Welcome to Apishop</span>, your one-stop destination for all your online shopping needs. Our mission is to provide you with a convenient, hassle-free shopping experience, where you can find a wide variety of products at affordable prices.
              </Typography>
              <Typography variant="body1" paragraph>
                At Apishop, we understand the importance of quality, reliability, and affordability. That's why we only source our products from trusted suppliers who share our commitment to delivering the best possible products and services.
              </Typography>
              <Typography variant="body1" paragraph>
                We offer a wide range of products, including electronics, fashion, beauty, home goods, and more. Our user-friendly website makes it easy for you to browse our selection and find exactly what you're looking for. Plus, our secure checkout process ensures that your personal and financial information is always safe and protected.
              </Typography>
              <Typography variant="body1" paragraph>
                At Apishop, we pride ourselves on providing excellent customer service. Our dedicated support team is always ready to help you with any questions or concerns you may have. We also offer fast and reliable shipping, so you can get your products as soon as possible.
              </Typography>
              <Typography variant="body1" paragraph>
                Thank you for choosing apishop as your preferred online shopping destination. We look forward to serving you and making your shopping experience a pleasant and enjoyable one.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default AboutPara;