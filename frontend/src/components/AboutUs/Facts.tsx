import { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import bg from '../../assets/background_img/deals.jpg'
import React from "react";

const Section = styled("section")(() => ({
  padding: "80px 0 80px",
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
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    zIndex: -1000,
    backgroundImage: `url(${bg})`,
    filter:"brightness(40%)"
  },
}));

type CoolFactProps={
  value:number,
  label:string,
  delay:number
}

const CoolFact:React.FC<CoolFactProps> = ({ value, label, delay }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        const diff = value - prevCount;
        if (diff <= 1) {
          clearInterval(interval);
        }
        return prevCount + Math.ceil(diff / 10);
      });
    }, 100);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <Grid item xs={12} sm={6} md={3}>
      <div
        style={{
          textAlign: "center",
          animationDelay: `${delay}s`,
          zIndex: 2,
        }}
      >
        <Typography variant="h4" component="span">
          {label === "Years of experience" ? `${count > value ? value+'+' : count+'+'}` : count > value ? value : count}
          {label === "Return Customers" && '%'}
          {label=== "Happy Customers" && '+'}
          {label=== "Team Advisors" && '+'}
        </Typography>
        <Typography variant="h6" component="h6">
          {label}
        </Typography>
      </div>
    </Grid>
  );
};

const Facts = () => {
  return (
    <Section>
      <Container maxWidth="lg">
        <Grid container spacing={4} style={{color:'white'}}>
          <CoolFact value={2} label="Years of experience" delay={0.8}  />
          <CoolFact value={3350} label="Happy Customers" delay={0.6} />
          <CoolFact value={7815} label="Team Advisors" delay={0.4} />
          <CoolFact value={70} label="Return Customers" delay={0.2} />
        </Grid>
      </Container>
    </Section>
  );
};

export default Facts;