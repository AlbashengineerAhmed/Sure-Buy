import React from 'react';
import { Link } from 'react-router-dom';

export default function GridView({ allProducts, addToWishlist, removeFromWishlist }) {
return (
    <div className="row g-5 my-2">
    {allProducts.map(function (pro, idx) {
        return (
        <div key={idx} className="col-md-3">
            <div className="rounded-3 position-relative rounded-5 image">
            <i
                id={`addWishlist${idx}`}
                onClick={() => addToWishlist(pro.id, idx)}
                className="fa-regular fa-heart text-dark fs-4 position-absolute top-0 end-0 m-3"
            ></i>
            <i
                id={`delWishlist${idx}`}
                onClick={() => removeFromWishlist(pro.id, idx)}
                style={{ display: 'none' }}
                className="fa-solid fa-heart fs-4 position-absolute top-0 end-0 m-3 text-danger"
            ></i>
            <div className='overflow-hidden'>
                <img src={pro.imageCover} className="w-100 image-action" alt={pro.title} style={{ 'height': '300px' }} />
            </div>
            <h6 className='px-3 text-success text-start pt-3'>{pro.title.slice(0, pro.title.indexOf(' ', 10))}</h6>
            <h6 className='px-3 text-black'>{pro.category.name}</h6>
            <div className='d-flex justify-content-between align-items-center'>
                <h6 className='px-3 text-muted py-1'>
                {pro.priceAfterDiscount ? (
                    <>
                    <span className='text-decoration-line-through text-danger'>{pro.price}</span>{' '}
                    <span className='text-success fw-bold ps-2'>{pro.priceAfterDiscount} EGP</span>{' '}
                    </>
                ) : (
                    <span>{pro.price} EGP</span>
                )}
                </h6>
                <span className='d-flex px-3'>
                <i className='icon-rating fas fa-star star-main px-1 fs-5'></i>
                <h6 className='text-muted'>{pro.ratingsAverage}</h6>
                </span>
            </div>
            <Link to={`/product-details/${pro.id}`}>
                <button className='btn btn-main-color w-100 mb-2 rounded-5 fw-bolder'>Add Product</button>
            </Link>
            </div>
        </div>
        );
    })}
    </div>
);
}
