import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductList({ allProducts, addToWishlist, removeFromWishlist }) {
  return (
    <div className="container py-5">
    {allProducts.map((product, idx) => (
        <div key={idx} className="row justify-content-center mb-3">
        <div className="col-md-12 col-xl-10">
            <div className="card shadow-0 border rounded-3">
            <div className="card-body">
                <div className="row">
                <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                    <div className="bg-image hover-zoom ripple rounded ripple-surface">
                    <img src={product.imageCover} className="w-100" style={{height:"250px"}} alt={product.title} />
                    <a href="#!">
                        <div className="hover-overlay">
                        <div
                            className="mask"
                            style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)'}}
                        ></div>
                        </div>
                    </a>
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 m-auto">
                    <h5>{product.title}</h5>
                    <div className="d-flex flex-row">
                    <div className="text-warning mb-1 me-2">
                        {[1, 2, 3, 4].map((star) => (
                        <i key={star} className="fa fa-star"></i>
                        ))}
                    </div>
                    <span>{product.ratingsAverage}</span>
                    </div>
                    <div className="mt-1 mb-0 text-muted small">
                    <span>100% cotton</span>
                    <span className="text-primary"> • </span>
                    <span>Light weight</span>
                    <span className="text-primary"> • </span>
                    <span>Best finish<br /></span>
                    </div>
                    <div className="mb-2 text-muted small">
                    <span>Unique design</span>
                    <span className="text-primary"> • </span>
                    <span>{product.category.name}</span>
                    <span className="text-primary"> • </span>
                    <span>Casual<br /></span>
                    </div>
                    <p className="text-truncate mb-4 mb-md-0">
                    {product.description}
                    </p>
                </div>
                <div className="col-md-6 col-lg-3 col-xl-3 m-auto border-sm-start-none border-start">
                    <div className="d-flex flex-row align-items-center mb-1">
                    <h4 className="mb-1 me-1">
                        {product.priceAfterDiscount ? `$${product.priceAfterDiscount}` : `$${product.price}`}
                    </h4>
                    {product.priceAfterDiscount && (
                        <span className="text-danger">
                        <s>{`$${product.price}`}</s>
                        </span>
                    )}
                    </div>
                    <h6 className="text-success">Free shipping</h6>
                    <div className="d-flex flex-column mt-4">
                    <Link to={`/product-details/${product.id}`}>
                        <button className="btn btn-success btn-sm w-100" type="button">
                        Details
                        </button>
                    </Link>
                    <button
                        onClick={() => addToWishlist(product.id, idx)}
                        className="btn btn-outline-warning w-100 btn-sm mt-2"
                        type="button"
                    >
                        Add to wishlist
                    </button>
                    <button
                        onClick={() => removeFromWishlist(product.id, idx)}
                        className="btn btn-danger w-100 btn-sm mt-2"
                        type="button"
                        style={{ display: 'none' }}
                    >
                        Remove from wishlist
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    ))}
    </div>
  );
}
