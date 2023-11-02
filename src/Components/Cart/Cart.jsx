import React, { useContext } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { CartContext } from '../../context/cartContext';
import './Cart.css'
import { Link } from 'react-router-dom';
export default function Cart() {
  const { totalCartPrice, clearCart ,cartProducts, removeCartItem, numOfCartItems, updateCount } = useContext(CartContext);
  async function removeItemFromCart(id) {
    await removeCartItem(id);
  }
  // console.log(cartProducts);
  async function updateProductCount(id, newCount) {
    await updateCount(id, newCount);
  }
  return (
    <div className="container">
      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="row">
          <div className="col-lg-9 col-md-12 col-12">
            <div className="ibox">
              <div className="ibox-title">
              <h5>Items in your cart</h5>
                <span className="pull-right">(<strong>{numOfCartItems}</strong>) items</span>
              </div>
              <div className="ibox-content">
                {cartProducts ? (
                  <div className="table-responsive">
                    {cartProducts.length > 0 ?(
                      <table className="table shoping-cart-table">
                      <tbody>
                        {cartProducts.map((cart, idx) => (
                          <tr key={idx}>
                            <td>
                              <div className="cart-product-imitation">
                                <img src={cart.product.imageCover} className='w-100' style={{height:"100px"}} alt={cart.product.title} />
                              </div>
                            </td>
                            <td className="desc">
                              <h6>
                                <a href="#" className="text-navy">
                                  {cart.product.title}
                                </a>
                              </h6>
                              <p className="small">
                                {cart.product.brand.name}
                              </p>
                              <dl className="small m-b-none">
                                <dt>Description lists</dt>
                                <dd>{cart.product.category.name}</dd>
                              </dl>
                              <div className="m-t-sm">
                                <button className='btn btn-outline-danger p-2' onClick={() => removeItemFromCart(cart.product.id)}>
                                <i className="fa fa-trash"></i> Remove
                                </button>
                              </div>
                            </td>
                            <td width="65" className='pe-3'>
                              <input
                                type="text"
                                className="form-control"
                                value={cart.count}
                                onChange={(e) => updateProductCount(cart.product.id, e.target.value)}
                              />
                              <h4 className='mt-2'>{`$${cart.price * cart.count}`}</h4>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    ):(
                      <div className='d-flex flex-column vh-75 justify-content-center align-items-center'>
                        <dotlottie-player
                          src="https://lottie.host/b99a2c34-f4da-4ced-8b14-d1308b555539/EgUgGDuk8Y.json"
                          background="#FFFFFF"
                          speed="1"
                          style={{ width: '300px', height: '300px' }}
                          direction="1"
                          mode="normal"
                          loop
                          autoplay
                          hover
                        ></dotlottie-player>

                      </div>
                    )}
                  </div>
                ) : (
                  <LoadingScreen/>
                )}
              </div>
              <div className="ibox-content d-flex justify-content-between flex-wrap my-1">
                <Link to='/payment'>
                  <button className="btn my-1 btn-outline-success pull-right">
                    <i className="fa fa-shopping-cart"></i> Checkout
                  </button>
                </Link>
                <button className="btn my-1 btn-outline-danger pull-right" onClick={clearCart}>
                  <i className="fa fa-shopping-cart"></i> Clear
                </button>
                <Link to="/">
                  <button className="btn my-1 btn-outline-warning">
                    <i className="fa fa-arrow-left"></i> Continue shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-12 col-12">
            <div className="ibox">
              <div className="ibox-title">
                <h5>Cart Summary</h5>
              </div>
              <div className="ibox-content">
                <span>Total</span>
                <h2 className="font-bold">{`$${totalCartPrice}`}</h2>
                <hr />
                <span className="text-muted small">
                  *For United States, France, and Germany applicable sales tax will be applied
                </span>
                <div className="m-t-sm">
                  <div className="mt-2 w-100">
                    <Link to='/payment'>
                      <button className="btn btn-outline-success w-100">
                        <i className="fa fa-shopping-cart"></i> Checkout
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="ibox">
              <div className="ibox-title">
                <h5>Support</h5>
              </div>
              <div className="ibox-content text-center">
                <h5><i className="fa fa-phone"></i> +43 100 783 001</h5>
                <span className="small">
                  Please contact us if you have any questions. We are available 24h.
                </span>
              </div>
              <hr/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
