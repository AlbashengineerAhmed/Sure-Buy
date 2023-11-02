import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from '../../context/cartContext';

export default function Payment() {
  const { cartId } = useContext(CartContext);
  const navigate = useNavigate();

  async function cashOrder() {
    try {
      const { data } = await axios.post(
        `https://route-ecommerce.onrender.com/api/v1/orders/${localStorage.getItem('cartId')}`,
        {
          shippingAddress: {
            details: document.querySelector('#details').value,
            phone: document.querySelector('#phone').value,
            city: document.querySelector('#city').value,
          },
        },
        {
          headers: { 'token': localStorage.getItem('ahmedToken') },
        }
      );
      if (data.status === 'success') {
        toast.success('Product Added to Payment Successfully', { autoClose: 2000, className: 'text-success' });
        navigate('/allorders');
      }
    } catch (error) {
      console.log('Error:', error.response.data);
    }
  }

  async function creditOrder() {
    try {
      const { data } = await axios.post(
        `https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${localStorage.getItem('cartId')}`,
        {
          shippingAddress: {
            details: document.querySelector('#details').value,
            phone: document.querySelector('#phone').value,
            city: document.querySelector('#city').value,
          },
        },
        {
          headers: { 'token': localStorage.getItem('ahmedToken') },
          params: { 'url': 'http://localhost:3000' },
        }
      );
      if (data.status === 'success') {
        toast.success('Product Added to Payment Successfully', { autoClose: 2000, className: 'text-success' });
        window.open(data.session.url);
      }
    } catch (error) {
      console.log('Error:', error.response.data);
    }
  }

  return (
    <div>
      <h3 className="my-5 pt-5 text-success fw-bolder text-center text-muted">
        Welcome User to Payment <i className="fa-solid fa-money-bill-1-wave text-success"></i>
      </h3>

      {cartId ? (
        <div className="container text-center mb-5">
          <div className="m-auto col-lg-6 col-md-12 col-12 text-start fw-bolder">
            <form>
              <label className="my-2" htmlFor="details">
                Address Details
              </label>
              <input type="text" className="px-3 form-control mb-2" placeholder="Detailed Address" id="details" />

              <label className="my-2" htmlFor="phone">
                Phone Number
              </label>
              <input type="number" className="px-3 form-control mb-2" placeholder="Phone Number" id="phone" />

              <label className="my-2" htmlFor="city">
                City / Area
              </label>
              <input type="text" className="px-3 form-control" placeholder="City / Area" id="city" />

              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-md-12 col-12 d-flex justify-content-between">
                  <button onClick={cashOrder} type="button" className="btn btn-outline-success fw-bolder mx-4 my-3">
                    Cash Payment
                  </button>
                  <button onClick={creditOrder} type="button" className="btn btn-outline-success fw-bolder mx-4 my-3">
                    CreditCard Payment
                  </button>
                </div>
                <div className="col-md-12 col-12 d-flex justify-content-between align-items-center">
                  <i className="fa-solid fa-money-bill-1-wave text-success px-3 fs-4"></i>
                  <img src={require('../../images/amazonpay.png')} style={{ 'width': '25%' }} className="pt-4" alt={'amazonpay'} />
                  <img src={require('../../images/americanexpress.png')} style={{ 'width': '20%' }} alt={'americanexpress'} />
                  <img src={require('../../images/mastercard.png')} style={{ 'width': '20%' }} alt={'mastercard'} />
                  <img src={require('../../images/paypal.png')} style={{ 'width': '30%' }} alt={'paypal'} />
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
}
