import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok, FaWhatsapp, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img 
                src="/Chef logo for restaurant _ Premium Vector.jpeg" 
                alt="Chef Logo" 
                style={{width: '50px', height: '50px', borderRadius: '50%'}}
              />
              <h3>Mvule Catering</h3>
            </div>
            <p>Experience authentic flavors delivered fresh to your doorstep</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/track">Track Order</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <p><FaMapMarkerAlt style={{marginRight: '0.5rem', color: 'var(--primary)'}} /> Nairobi, Kenya</p>
            <p><FaPhone style={{marginRight: '0.5rem', color: 'var(--primary)'}} /> +254 700 123 456</p>
            <p><FaEnvelope style={{marginRight: '0.5rem', color: 'var(--primary)'}} /> info@mvulecatering.com</p>
            <p><FaClock style={{marginRight: '0.5rem', color: 'var(--primary)'}} /> Mon-Sun: 8AM - 10PM</p>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" className="social-link"><FaFacebook style={{marginRight: '0.5rem'}} /> Facebook</a>
              <a href="#" className="social-link"><FaInstagram style={{marginRight: '0.5rem'}} /> Instagram</a>
              <a href="#" className="social-link"><FaTwitter style={{marginRight: '0.5rem'}} /> Twitter</a>
              <a href="#" className="social-link"><FaTiktok style={{marginRight: '0.5rem'}} /> TikTok</a>
              <a href="#" className="social-link"><FaWhatsapp style={{marginRight: '0.5rem'}} /> WhatsApp</a>
              <a href="#" className="social-link"><FaYoutube style={{marginRight: '0.5rem'}} /> YouTube</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Mvule Catering. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer