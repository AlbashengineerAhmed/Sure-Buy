import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../context/cartContext';
import Slider from 'react-slick';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import './ProductDetails.css'
import BASE_URL from '../Utils/baseUrl';

export default function ProductDetails() {

  const  {addProductToCart,removeCartItem } = useContext(CartContext);

  async function addToCart(id){
    await addProductToCart(id)
  };

  async function removeFromCart(id){
    await removeCartItem(id)
    };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };  

  const { id } = useParams();

  const [productDetails, setProductDetails] = useState(null);

  async function getProductDetails(){
    
    try {
      const { data } = await axios.get(`${BASE_URL}products/${id}`);
      setProductDetails(data.data);
      // console.log(data.data); 
      
    } catch (error) {
      // console.log('Error : ', error);
    }
  };

  useEffect(function(){
    getProductDetails()
  },[]);

  return (
    <>
      <div className="container">
        
        {productDetails ? (
          <div className="row align-items-center gx-5">
            <div className="col-md-6 col-12 align-items-center pb-4 g-5 ">
            <Slider {...settings}>
              {productDetails.images.map(function(img,idx){return <img key={idx} src={img} className='w-100 image-details my-5 rounded-5 ' alt={productDetails.title} />})}
            </Slider>
            </div>
            <div className="col-md-6 col-12 m-auto py-5">
              <h4 className='text-success'>{productDetails.title}</h4>
              <p>{productDetails.description}</p>
              <h6 className='text-muted py-1'>
                Price: {productDetails.priceAfterDiscount ? (
                  <>
                    <span className='text-decoration-line-through text-danger'>{productDetails.price}</span>
                    <span className='fw-bold ps-2 text-success'>{productDetails.priceAfterDiscount} EGP</span>
                  </>
                ) : (
                  <span>{productDetails.price} EGP</span>
                )}
              </h6>
              <h6 className='py-2 text-muted'>Quantity: {productDetails.quantity}</h6>

              <p>Additional Information:</p>
              <ul className='list-unstyled'>
                <li>Color: {productDetails.color?productDetails.color:"not available"}</li>
                <li>Size: {productDetails.size?productDetails.size:"not available"}</li>
                <li>Brand: {productDetails.brand.name}</li>
                <li>Category: {productDetails.category.name}</li>
                <li>Sold: {productDetails.sold}</li>
                <li>Ratings Average: {productDetails.ratingsAverage}</li>
                <li>Ratings Quantity: {productDetails.ratingsQuantity}</li>
              </ul>

              <button id='addBtn' onClick={() => addToCart(productDetails.id)} className='btn btn-main-color w-100 mt-4'>
                Add to Cart
              </button>
              <button id='delBtn' onClick={() => removeFromCart(productDetails.id)} style={{'display':'none'}} className="w-100 mt-4 btn btn-danger">
                Remove From Cart
              </button>
            </div>
          </div>
        ) : (
          <LoadingScreen/>
        )}
      </div>
    </>
  ) 
}
