import React, { useContext, useEffect, useState } from 'react'
import $ from 'jquery';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { CartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';
import BASE_URL from './../Utils/baseUrl';

export default function BrandProduct() {
    const {addToWishlist,removeWishlist} = useContext(CartContext);


const {id} = useParams();

const [allProducts, setAllProducts] = useState(null);
async function getBrandProducts (){
    try {
    const { data } = await axios.get(`${BASE_URL}products`, {
      params: { brand: id },
    });
    setAllProducts(data.data);
    } catch (error) {
        // console.log('Error : ',error);
        // toast.error("error",error)
    }
}

async function addWishlist(id,idx){
    await addToWishlist(id);
    $(`#addWishlist${idx}`).fadeOut(100);
    $(`#delWishlist${idx}`).fadeIn(500);  
}

async function removeFromWishlist(id,idx){
    await removeWishlist(id);
    $(`#delWishlist${idx}`).fadeOut(100);
    $(`#addWishlist${idx}`).fadeIn(500);  
    };

useEffect(function(){
getBrandProducts()
},[])

return (
    <div>
    <h2>Brand Products</h2>
    { allProducts? <div className="container py-4 my-5">
    <div className="row g-5 my-3">
    {allProducts.length == 0 ? <img className='w-75 m-auto' src={require('../../images/no-product-found.png')}/> :
    allProducts.map(function(pro,idx){ return <div key={idx} className="col-md-3 my-4">
            <div className="item text-white h-100 rounded-5 position-relative shadow-sm image">
            <i id={`addWishlist${idx}`} onClick={function(){addWishlist(pro.id,idx)}} className=" fa-regular fa-heart text-dark fs-4 position-absolute top-0 end-0 m-3"></i>
            <i id={`delWishlist${idx}`} onClick={function(){removeFromWishlist(pro.id,idx)}} style={{'display':'none'}} className="fa-solid fa-heart fs-4 position-absolute top-0 end-0 m-3 text-danger" ></i>
            <img src={pro.imageCover} className="w-100 rounded-5 image-action" style={{'height':'300px'}} alt={pro.title} />
            <h5 className='px-3 text-start text-success pt-3'>{pro.title.slice( 0,pro.title.indexOf(' ', 10 ) )}</h5>
            <h6 className='px-3 text-black '>{pro.category.name}</h6>
            <div className='d-flex justify-content-between align-items-center'>
                <h6 className='px-3 text-muted py-1'>{ pro.priceAfterDiscount ?  <> <span className='text-decoration-line-through text-danger'>{pro.price} </span> <span className='text-success fw-bold ps-2'>{ pro.priceAfterDiscount } EGP</span> </> : <span>{pro.price} EGP</span> }</h6>
                <span className='d-flex px-3'>
                <i className='fas fa-star star-main px-1 fs-5'></i>
                <h6 className='text-muted'>{ pro.ratingsAverage }</h6>
                </span>
            </div>
            <Link to={`/prodetails/${pro.id}`}>
            <button className='btn btn-main-color w-100 mb-2 rounded-5 fw-bolder'>Show More about Product</button>
            </Link>
            </div>
    </div>}) }
    </div>
</div> : <LoadingScreen/> }
    </div>
)
}
