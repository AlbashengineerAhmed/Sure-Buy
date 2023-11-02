import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { toast } from 'react-toastify';

export default function AllOrders({ crrUser }) {
  const [allOrders, setAllOrders] = useState(null);

  async function getAllOrders() {
    try {
      const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${crrUser.id}`);
      setAllOrders(data);
    } catch (error) {
      // console.log('Error:', error);
      // toast.error("error",error)
    }
  }

  useEffect(function () {
    getAllOrders();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">All Orders</h1>
      {allOrders ? (
        allOrders.length > 0 ? (
          <div className="row">
            {allOrders.map(function (order, idx) {
              return (
                <div key={idx} className="card">
                    <div className="card-header">
                      <h5>Order #{idx + 1}</h5>
                    </div>
                    <div className="card-body d-flex flex-wrap">
                      {order.cartItems.map(function (item, index) {
                        return (
                          <div key={index} className="mb-3  col-lg-4 col-md-6 col-12">
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              className="img-fluid"
                            />
                            <h5 className="card-title">{item.product.title}</h5>
                            <p className="card-text">
                              Brand: {item.product.brand.name}
                            </p>
                            <p className="card-text">
                              Category: {item.product.category.name}
                            </p>
                            <p className="card-text">
                              Count: {item.count}
                            </p>
                            <p className="card-text">
                              Price: {item.price} EGP
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="card-footer bg-light">
                      <p className="card-text">
                        Total Price: {order.totalOrderPrice} EGP
                      </p>
                      <p className="card-text">
                        Taxes Price: {order.taxPrice} EGP
                      </p>
                      <p className="card-text">
                        Payment Method: {order.paymentMethodType}
                      </p>
                    </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="d-flex flex-column vh-75 justify-content-center align-items-center">
            <img
              src={require('../../images/emptyOrder.jpg')}
              className="w-50"
              style={{ height: '600px' }}
              alt=""
            />
            <h2 className="mt-4 fw-bold font-monospace fst-italic">No orders available</h2>
          </div>
        )
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
}
