// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

function Navbar() {
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    const updateCartInfo = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const count = cart.reduce((sum, item) => sum + item.quantity, 0)
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      setCartCount(count)
      setCartTotal(total)
    }

    updateCartInfo()
    window.addEventListener('storage', updateCartInfo)
    window.addEventListener('cartUpdated', updateCartInfo)
    
    return () => {
      window.removeEventListener('storage', updateCartInfo)
      window.removeEventListener('cartUpdated', updateCartInfo)
    }
  }, [])

  return (
    <nav className="navbar">
      <div className="navbar__logo" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
        <img 
          src="/Chef logo for restaurant _ Premium Vector.jpeg" 
          alt="Chef Logo" 
          style={{width: '40px', height: '40px', borderRadius: '50%'}}
        />
        Mvule<span>Catering</span>
      </div>
      <ul className="navbar__links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li>
          <Link to="/cart" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative'}}>
            <FaShoppingCart />
            Cart
            {cartCount > 0 && (
              <span style={{
                background: 'var(--primary)',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                position: 'absolute',
                top: '-8px',
                right: '-8px'
              }}>
                {cartCount}
              </span>
            )}
          </Link>
          {cartTotal > 0 && (
            <div style={{fontSize: '0.8rem', color: 'var(--text-light)', textAlign: 'center', marginTop: '2px'}}>
              KSh {cartTotal}
            </div>
          )}
        </li>
        <li><Link to="/track">Track Order</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/admin-login">Admin</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;