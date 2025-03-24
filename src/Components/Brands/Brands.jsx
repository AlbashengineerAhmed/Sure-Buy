import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import BASE_URL from './../Utils/baseUrl';

export default function Brands() {
    const [allBrands, setAllBrands] = useState(null);

    async function getAllBrands(){
    const { data } = await axios.get(`${BASE_URL}brands`);
    // console.log(data);
    setAllBrands(data.data);
    }

    useEffect(function () {
        getAllBrands();
    }, []);
return (
    <div>
        { allBrands ? <div className="container py-5 my-5">
        <h2>Brands</h2>
        <div className="row align-items-center">
        <div className="col-md-3">
            <div className="textBrands">
            <h3 className='text-success fw-bolder'>Our Brands</h3>
            <p className='text-muted lead'>Explore our wide range of brands, each offering a curated collection of products.</p>
            </div>
        </div>
        { allBrands.map(function( brand,idx ){ return <div key={idx} className="col-md-3 rounded-5 my-3 ">
            <Link to={ `/brandproducts/${brand._id}` }>
            <div className="brand-item item rounded shadow-lg">
            <img src={brand.image}alt={brand.name} className="w-100" />
            <h4 className='text-success text-center py-4'>{brand.name}</h4>
            </div>
            </Link>
        </div>
        })}
        </div>
        </div> : <LoadingScreen /> }
    </div>
)
}
