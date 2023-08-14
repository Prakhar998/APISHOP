import fi from '../../assets/img/partner-img/1.png';
import si from '../../assets/img/partner-img/2.png';
import ti from '../../assets/img/partner-img/3.png';
import foi from '../../assets/img/partner-img/4.png';
import fii from '../../assets/img/partner-img/5.png';
import sii from '../../assets/img/partner-img/6.png';
import AliceCarousel from 'react-alice-carousel';
import './styles.css';
import MainHeading from '../common/MainHeading';



const PopularBrands = () => {
  const brands = [
    { id: 1, img: fi },
    { id: 2, img: si },
    { id: 3, img: ti },
    { id: 4, img: foi },
    { id: 5, img: fii },
    { id: 6, img: sii },
  ];

  const item = brands.map((brand) => (
    <div key={brand.id} className="singleBrands">
      <img src={brand.img} alt="" />
    </div>
  ));

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
  };

  return (
    <section className="popularBrandsArea">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="popularSectionHeading">
              <MainHeading bgcolor="#f7f7f7">Popular Brands</MainHeading>
            </div>
          </div>
          <div className="col-12">
            <div className="popularBrandsSlide">
              <AliceCarousel
                items={item}
                mouseTracking
                responsive={responsive}
                autoPlay
                autoPlayInterval={1000}
                infinite
                disableButtonsControls
                disableDotsControls
                animationType="fadeout"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularBrands;