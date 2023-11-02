import React from 'react'
import './Footer.css'
export default function Footer() {
  return <>
  <footer className="footer">
      <div className="site-section">
        <div className="container">
          <div className="cta d-block d-md-flex align-items-center px-5">
            <div>
              <h2 className="mb-0">Get the Sure Buy App</h2>
              <h3 className="">We will send you a link, open it on your phone to download the app.</h3>
            </div>
            <div className="ms-auto">
              <a href="#" className="btn contact-btn rounded-1 py-3 px-5">Contact us</a>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <a href="#" className="footer-logo">Sure Buy</a>
              <p className="copyright">
                <small>&copyright; Ahmed 2023</small>
              </p>
            </div>
            <div className="col-sm">
              <h3>Customers</h3>
              <ul className="list-unstyled links">
                <li><a href="#">Buyer</a></li>
                <li><a href="#">Supplier</a></li>
              </ul>
            </div>
            <div className="col-sm">
              <h3>Company</h3>
              <ul className="list-unstyled links">
                <li><a href="#">About us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact us</a></li>
              </ul>
            </div>
            <div className="col-sm">
              <h3>Further Information</h3>
              <ul className="list-unstyled links">
                <li><a href="#">Terms &amp; Conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h3>Follow us</h3>
              <ul className="list-unstyled social">
                <li><a href="#"><i className="fa-brands fa-facebook"></i></a></li>
                <li><a href="#"><i className="fa-brands fa-linkedin"></i></a></li>
                <li><a href="#"><i className="fa-brands fa-github"></i></a></li>
                <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </>
}
