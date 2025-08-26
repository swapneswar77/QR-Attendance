import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">🚀 QR Attendance</div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">🏠 Home</Link>
        <Link to="/scan" className="nav-link">📸 Scanner</Link>
      </div>
    </nav>
  );
};

export default Navbar;
