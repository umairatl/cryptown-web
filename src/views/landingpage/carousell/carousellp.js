import "../carousell/carousel.css";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import pic1 from "../../../asset/b1.png";
import pic2 from "../../../asset/b2.png";
import pic3 from "../../../asset/b3.png";
import pic4 from "../../../asset/b4.png";
import pic5 from "../../../asset/b5.png";


const images = [pic1, pic2, pic3, pic4, pic5];



function Carousallp() {

    const NextArrow = ({onClick}) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    )
  }

  const PrevArrow = ({onClick}) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    )
  }

const [imgIndex,setImgIndex] = useState(0)

const settings = {
  infinite:true,
  lazyLoad: true,
  speed: 300,
  slidesToShow:3,
  centerMode: true,
  centerPadding: 0,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  beforeChange: (current, next) => setImgIndex(next), 
};

const array = ['Crypto News', 'Crypto Favourite','Crypto Details', 'Crypto Coins', 'Exchange Lists' ]


  return (
    <div className="Carousallanding">
      <h3 className="headercarousal">Our<span id="colortext3"> Services</span></h3>
      <Slider {...settings}>
        {console.log(images)}
        {images.map((img, idx) => (
          <div className={idx === imgIndex ? "slide activeSlide" : "slide"}>
                 
            <img src={img} alt={idx} />
            <h1>{array[idx]}</h1>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousallp;