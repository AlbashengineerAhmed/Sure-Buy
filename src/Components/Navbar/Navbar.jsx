import React, { useContext } from 'react'
import logo from '../../images/logo.png'
import { Link, NavLink, Navigate } from 'react-router-dom'
import { CartContext } from './../../context/cartContext';
import './Navbar.css'

export default function Navbar({crrUser,clearUserData}) {
  const {numOfCartItems,numOfWishlist} = useContext(CartContext);
  function logoutUser(){
    clearUserData();
    Navigate('/login')
  };

  return (
    <nav className="navbar px-5 fixed-top navbar-expand-lg navbar-light bg-main-light ">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">
      <img src={logo} alt="logo website" style={{'height':'60px'}} />
    </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/categories">Categories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/products">Products</NavLink>
        </li>
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <form className="d-flex">
          <input className="form-control my-2 me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success my-2" type="submit">Search</button>
        </form> 
        { crrUser? <><li className="nav-item position-relative">
        <NavLink to="/cart" type="button" className="nav-link position-relative">
          <i className="text-success fa-solid fa-lg fa-cart-plus"></i>
          <span className="span-icon badge rounded-pill bg-danger">
            {numOfCartItems}
            <span className="visually-hidden">unread messages</span>
          </span>
        </NavLink>
      </li>

      <li className="nav-item position-relative">
        <NavLink type='button' className="nav-link position-relative px-2 mx-2" to="/wishlist">
          <i className="fa-solid fa-heart text-danger fs-4"></i>
          <span className="span-icon badge rounded-pill bg-danger">
            {numOfWishlist}
            <span className="visually-hidden">unread messages</span>
          </span>
        </NavLink>
      </li>
      <li className="nav-item">
      <Link className="nav-link"  to="/allorders">All Orders</Link>
        </li>
        <li className="nav-item">
          <NavLink onClick={logoutUser} className="nav-link" to="#">Log Out</NavLink>
        </li>
        </>:<>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        </>}
      </ul>
    </div>
  </div>
</nav>
  )
}
