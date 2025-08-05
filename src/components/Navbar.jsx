// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">🍽️ Kitchen<span>Hub</span></div>
      <ul className="navbar__links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/track">Track Order</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/admin-login">Admin</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
