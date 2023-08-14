import ScrollTop from "../common/Scrolltop";
import Footer from "../footers/Footer";
import LatestProduct from "../LatestProduct/LatestProduct";
import NotificationBar from "../common/NotificationBar";
import MainHeader from "../headers/MainHeader";
import BounceButton from "../common/BounceButton";
import TopCategories from "../Categories/TopCategories";
import TopSellers from "../topSellers/TopSellers";
import TopDeals from "../topDeals/TopDeals";
import HomeSlider from "../common/HomeSlider";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: -600, left: 0, behavior: "smooth" });
    console.log('scroll to top');
  }, []);
  return (
    <div style={{ backgroundColor: "#FBFBFB" }}>
      <NotificationBar />
      <MainHeader />
      <HomeSlider />
      <LatestProduct />
      <TopDeals />
      <TopCategories />
      <TopSellers />
      <Footer />
      <div style={{ position: "fixed", right: 12, bottom: 100 }}>
        <BounceButton />
      </div>
      <ScrollTop />
    </div>
  );
};

export default HomePage;
