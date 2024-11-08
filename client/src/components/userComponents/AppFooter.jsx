import React from "react";
import { Link } from "react-router-dom";
import "./AppFooter.css";

function AppFooter() {
  return (
    <footer className="footer-section" style={{ backgroundColor: "#000", color: "white", padding: "1rem" }}>
      <div className="container">
        <div className="footer-content pt-4 pb-4">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="single-cta">
                <i className="fas fa-map-marker-alt"></i>
                <div className="cta-text">
                  <h4>Find us</h4>
                  <span>A-106 Sector 108,Noida,201301</span>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="single-cta">
                <i className="fas fa-phone"></i>
                <div className="cta-text">
                  <h4>Call us</h4>
                  <span>8882581541</span>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="single-cta">
                <i className="far fa-envelope-open"></i>
                <div className="cta-text">
                  <h4>Mail us</h4>
                  <span>gccreation2018@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-menu text-center">
          <ul className="d-flex justify-content-center" style={{ gap: "20px", listStyle: "none", padding: 0 }}>
            <li>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>Home</Link>
            </li>
            <li>
              <Link to="/contact" style={{ textDecoration: "none", color: "white" }}>Contact</Link>
            </li>
            <li>
              <Link to="/about" style={{ textDecoration: "none", color: "white" }}>About</Link>
            </li>
            <li>
              <Link to="/policy" style={{ textDecoration: "none", color: "white" }}>Policy</Link>
            </li>
          </ul>
        </div>
        <div className="copyright-area text-center mt-3">
          <p>Copyright &copy; 2024, All Right Reserved by <a href="/" style={{ color: "#0E6B06" }}>The Crazynyt</a></p>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
