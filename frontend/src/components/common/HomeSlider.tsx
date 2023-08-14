import 'react-alice-carousel/lib/alice-carousel.css';
import image1 from '../../assets/slider-images/slider-image-1.jpg';
import image2 from '../../assets/slider-images/slider-image-2.jpg';
import image3 from '../../assets/slider-images/slider-image-3.jpg';
import image4 from '../../assets/slider-images/slider-image-4.jpg'
import { Carousel } from 'react-responsive-carousel';
import './style.css'

const HomeSlider = () => {
 return (
<Carousel
  showArrows={false}
  showStatus={false}
  showIndicators={true}
  showThumbs={false}
  stopOnHover={false}
  infiniteLoop={true}
  autoPlay={true}
  dynamicHeight={true}
>
    <div>
        <img src={image1} />
    </div>
    <div>
        <img src={image2} />
    </div>
    <div>
        <img src={image3} />
        </div>
        <div>
        <img src={image4} />
        </div>
</Carousel>
 );
};

export default HomeSlider;