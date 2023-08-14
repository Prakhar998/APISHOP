import { useEffect } from "react";
import Footer from "../footers/Footer";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../checkout/BreadCrumb";
import MainHeader from "../headers/MainHeader";

const ErrorPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 300, left: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <MainHeader />
      <BreadCrumb name="404" path="/" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "-24px",
        }}
      >
        <Typography
          style={{
            fontSize: "150px",
            textShadow: "3px 4px 5px rgba(0, 0, 0, 0.3",
          }}
        >
          404
        </Typography>
      </div>
      <Typography
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: 700,
        }}
      >
        Oops! Page Not Found
      </Typography>
      <Typography
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "14px",
          marginTop: "3vh",
        }}
      >
        Sorry! the page you looking for is not found. Make sure that you have
        typed the currect URL
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "3vh",
          marginTop: "3vh",
        }}
      >
        <Button
          style={{
            alignItems: "center",
            padding: "10px 20px 10px 20px",
            backgroundColor: "#00bcd4",
            color: "#fff",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          Go Home
        </Button>
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;
