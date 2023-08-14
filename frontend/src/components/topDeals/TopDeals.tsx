import { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import bg from '../../assets/background_img/deals.jpg'
import { Link } from 'react-router-dom';

const Section = styled("section")(() => ({
  padding: "80px 140px",
  backgroundPosition: "center",
  backgroundSize: "cover",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundScroll:'auto',
    backgroundImage: `url(${bg})`,
    filter:"brightness(40%)"
  },
}));

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TopDeals = () => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDateString = localStorage.getItem('targetDate');
    let targetDate: Date;

    if (targetDateString) {
      targetDate = new Date(targetDateString);
    } else {
      targetDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 7,
        0,
        0,
        0
      );
      localStorage.setItem('targetDate', targetDate.toString());
    }

    const countdownInterval = setInterval(() => {
      const now = new Date().getTime(); // convert to Unix timestamp
      const timeLeft = targetDate.getTime() - now;
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      setTimeRemaining({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <Section>
      <Box style={{textAlign:'center',color:'white',position:'relative'}}>
        <Typography variant="h4" style={{marginBottom:'20px'}}>Deals of the Week</Typography>
        <Typography variant="subtitle1" style={{marginBottom:'40px'}}>Looking for amazing deals on popular products? Check out our weekly roundup of the best deals available, featuring discounts on everything from electronics and gadgets to fashion and beauty products. Don't miss out on these incredible savings!</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Box sx={{ border: '2px solid white', textAlign: 'center', py: 1 }}>
              <Typography variant="h5">{timeRemaining.days<10 ? `0${timeRemaining.days}` : timeRemaining.days}</Typography>
              <Typography variant="subtitle1">Days</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ border: '2px solid white', textAlign: 'center', py: 1 }}>
              <Typography variant="h5">{timeRemaining.hours<10 ? `0${timeRemaining.hours}` : timeRemaining.hours}</Typography>
              <Typography variant="subtitle1">Hours</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
        <Box sx={{ border: '2px solid white', textAlign: 'center', py: 1 }}>
            <Typography variant="h5">{timeRemaining.minutes<10 ? `0${timeRemaining.minutes}` : timeRemaining.minutes}</Typography>
            <Typography variant="subtitle1">Minutes</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ border: '2px solid white', textAlign: 'center', py: 1 }}>
            <Typography variant="h5">{timeRemaining.seconds<10 ? `0${timeRemaining.seconds}` : timeRemaining.seconds}</Typography>
            <Typography variant="subtitle1">Seconds</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12}>
            <Button
              component={Link}
              to="/product-category"
              sx={{
                marginTop: "20px",
                padding:"10px 50px"
              }}
              variant="contained"
            >
              View Deals
            </Button>
        </Grid>
      </Grid>
    </Box>
    </Section>
  );
};

export default TopDeals;