import AboutPara from './AboutPara'
import Facts from './Facts'
import MainHeader from '../headers/MainHeader'
import Footer from '../footers/Footer'
import BreadCrumb from '../checkout/BreadCrumb'
import PopularBrands from './PopularBrands'
import { useEffect } from 'react'

const About = () => {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 300, left: 0, behavior: "smooth" });
    console.log('scroll to top');
  }, []);
  return (
    <>
        <MainHeader />
        <BreadCrumb name="about" path="/about" />
        <AboutPara />
        <Facts />
        <PopularBrands />
        <Footer />
    </>
  )
}

export default About