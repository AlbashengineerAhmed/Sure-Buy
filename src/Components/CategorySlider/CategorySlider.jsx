import React, {useEffect, useState} from 'react'
import axios from 'axios'
import BASE_URL from '../Utils/baseUrl.js'
import Slider from "react-slick";
import './CategorySlider.css'
export default function CategorySlider() {
  const [categories, setCategories] = useState([])
  const getAllCategories = async()=>{
    let {data} = await axios.get(`${BASE_URL}categories`)
    // console.log(data.data)
    setCategories(data.data)
  }
  useEffect(() => {
    getAllCategories()
  },[])

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    arrows: false,
    slidesToShow: 5, // Default number of slides to show
    slidesToScroll: 2, // Default number of slides to scroll
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className='mt-5 mx-2'>
      <h3>Shop Popular Categories</h3>
      <Slider {...settings}>
        {categories.map((item) => (
            <div key={item._id} className='p-2 position-relative container-category'>
              <img src={item.image} className='w-100' height={250} alt="slider" />
              <div className='name-category-item'>
                <h5 className='pt-1 fw-bold'>{item.name}</h5>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  )
}
