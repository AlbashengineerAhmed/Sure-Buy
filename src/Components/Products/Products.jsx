import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link, useParams } from 'react-router-dom';
import $ from 'jquery';
import { CartContext } from '../../context/cartContext';

import GridView from './../GridView/GridView';
import ListView from './../ListView/ListView';
import { toast } from 'react-toastify';

export default function Products() {
const { id } = useParams();
const { addToWishlist, removeWishlist } = useContext(CartContext);

const [allProducts, setAllProducts] = useState(null);
const [viewType, setViewType] = useState('grid');

async function getCategoryProducts() {
    try {
    const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/products', {
    });
    // console.log(data);
    setAllProducts(data.data);
    } catch (error) {
    // console.log('Error:', error);
    }
}

async function addWishlist(id, idx) {
    await addToWishlist(id);
    $(`#addWishlist${idx}`).fadeOut(100);
    $(`#delWishlist${idx}`).fadeIn(500);
}

async function removeFromWishlist(id, idx) {
    await removeWishlist(id);
    $(`#delWishlist${idx}`).fadeOut(100);
    $(`#addWishlist${idx}`).fadeIn(500);
}

useEffect(function () {
    getCategoryProducts();
}, []);

function toggleViewType() {
    setViewType(viewType === 'grid' ? 'list' : 'grid');
}

return (
    <div className='container'>
    <div className='row align-items-center justify-content-between'>
        <div className="col-4">
        <h2>All Products</h2>
        </div>
        <div className="col-4 d-flex justify-content-end">
        <div className="toggle-view">
            <i className={`fas fa-2x p-2 fa-th ${viewType === 'grid' ? 'active text-success ' : 'text-black'}`} onClick={toggleViewType}></i>
            <i className={`fas fa-2x p-2 fa-list ${viewType === 'list' ? 'active text-success ' : 'text-black'}`} onClick={toggleViewType}></i>
        </div>
    </div>
    </div>
    {allProducts ? (
        <div className="row justify-content-center">
        {viewType === 'grid' ? (
            <GridView allProducts={allProducts} addToWishlist={addWishlist} removeFromWishlist={removeFromWishlist} />
        ) : (
            <ListView allProducts={allProducts} addToWishlist={addWishlist} removeFromWishlist={removeFromWishlist} />
        )}
        </div>
    ) : (
        <LoadingScreen />
    )}
    </div>
);
}
