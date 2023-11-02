import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import BASE_URL from "../Utils/baseUrl.js";
import { CartContext } from "../../context/cartContext.js";
import LoadingScreen from "../LoadingScreen/LoadingScreen.jsx";
import { Link } from "react-router-dom";
import './Categories.css'

export default function Categories() {
  const [allcategory, setAllCategory] = useState(null);

  async function getAllCategories() {
    const { data } = await axios.get(
      "https://route-ecommerce.onrender.com/api/v1/categories"
    );
    setAllCategory(data.data);
  }

  useEffect(function () {
    getAllCategories();
  }, []);

  return (
    <div className="container-fluid mt-5">
      <h2>Categories</h2>
      {allcategory ? (
        <div className="row py-5 align-items-center gy-5">
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <div className="textBrands">
              <h3 className="text-success fw-bolder">Our Category</h3>
              <p className="text-muted lead">
                You can see our categories and each category includes the
                products in it
              </p>
            </div>
          </div>
          {allcategory.map(function (category, idx) {
            return (
              <div key={idx} className="col-lg-3 col-md-4 col-sm-6 col-12">
                <Link to={`/categoryproducts/${category._id}`}>
                  <div className="item cart-customize rounded-4 shadow">
                    <div className="overflow-hidden">
                      <img
                        src={category.image}
                        className="w-100 category-image-hover rounded-top-4"
                        alt={category.name}
                        style={{ height: "400px"}}
                      />
                    </div>
                    <h4 className="text-success text-center  py-4">
                      {category.name}
                    </h4>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
}
