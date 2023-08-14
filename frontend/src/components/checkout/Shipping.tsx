import BreadCrumb from "./BreadCrumb";
import Footer from "../footers/Footer";
import ScrollTop from "../common/Scrolltop";
import CartTabView from "./CartTabView";
import MainHeader from "../headers/MainHeader";

const Shipping = () => (
  
    <div>
      <MainHeader />
      <BreadCrumb name="cart" path="/cart" />
      <CartTabView />
      <Footer />
      <ScrollTop />
    </div>
  );

export default Shipping;
