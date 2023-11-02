import React from 'react'
import Slider from "react-slick";
import slide1 from '../../images/Slider/slider-image-1.jpeg'
import slide2 from '../../images/Slider/slider-image-2.jpeg'
import slide3 from '../../images/Slider/slider-image-3.jpeg'
import './MainSlider.css'
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    fade: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };

  return (
    <div className='row slider m-auto'>
      <Slider {...settings}>
        <div>
          <img src={slide1} alt="slider" />
        </div>
        <div>
          <img src={slide2} alt="slider" />
        </div>
        <div>
          <img src={slide3} alt="slider" />
        </div>
        <div>
          <img src={slide1} alt="slider" />
        </div>
        <div>
          <img src={slide2} alt="slider" />
        </div>
        <div>
          <img src={slide3} alt="slider" />
        </div>
      </Slider>
    </div>
  )
}
