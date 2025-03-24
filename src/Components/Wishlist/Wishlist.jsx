import React, { useContext } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { CartContext } from '../../context/cartContext';
import wishlistImage from '../../images/wishlist-empty.jpg'

export default function Wishlist({crrUser}) {

  const {removeWishlist,wishlistProducts,addProductToCart} = useContext(CartContext);
  async function removeFromWishlish(id){
    await removeWishlist(id);
  }

  return (
    <div>
      <h2>your Wishlist <i className="fa-solid fa-heart text-danger"></i></h2>
      { wishlistProducts !== null ? <div className="container py-3">
        {wishlistProducts.length > 0?
        <div className="row g-5 my-2 ">
        { wishlistProducts.map(function(pro,idx){
          return  <div key={idx} className="col-lg-3 col-md-6 col-12">
          <div className="cart-customize item text-white h-100 rounded-5 position-relative image shadow-sm" >
          <i id={`delWishlist${idx}`} onClick={function(){removeFromWishlish(pro._id,idx)}} className="fa-solid fa-heart fs-4 position-absolute top-0 end-0 m-3 text-danger" ></i>
            <div className='image-container  overflow-hidden '>
              <img src={pro.imageCover} className="w-100 rounded-top-5 image-action" alt={pro.title} style={{'height':'350px'}} />
            </div>
            <h6 className='px-3 text-success text-start pt-3'>{pro.title?.slice( 0,pro.title.indexOf(' ', 10 ))}</h6>
            <h6 className='px-3 text-black'>{pro.category?.name}</h6>
            <div className='d-flex justify-content-between align-items-center'>
                <h6 className='px-3 text-muted py-1'>{ pro.priceAfterDiscount ?  <> <span className='text-decoration-line-through text-danger'>{pro.price} </span> <span className=' fw-bold ps-2 text-success'>{ pro.priceAfterDiscount } EGP</span> </> : <span>{pro.price} EGP</span> }</h6>
                <span className='d-flex px-3'>
                <i className='fas fa-star star-main  px-1 fs-5'></i>
                <h6 className='text-muted'>{ pro.ratingsAverage }</h6>
              </span>
            </div>
              <button id={`addBtn${idx}`} onClick={()=>{addProductToCart(pro._id,idx)}} className='btn btn-main-color w-100 mb-2 rounded-5 fw-bolder'>Add to Cart</button>
          </div>
        </div>})}
      </div>:(
        <div className='d-flex flex-column vh-75 justify-content-center align-items-center'>
          <img src={wishlistImage} className="w-100" style={{ height: '600px' }} alt="wishlistImage" />
        </div>
      )}
      </div> : <LoadingScreen /> };
    </div>
  )
}
