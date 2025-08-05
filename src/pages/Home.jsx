import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaTruck, FaUserTie, FaStar, FaShoppingCart, FaFire, FaMobile, FaAndroid, FaApple } from 'react-icons/fa'

function Home() {
  const [featuredItems, setFeaturedItems] = useState([])

  useEffect(() => {
    fetch('/db.json')
      .then(res => res.json())
      .then(data => {
        const featuredIds = data.featured || [1, 4, 8]
        const featured = data.menu.filter(item => featuredIds.includes(item.id))
        setFeaturedItems(featured)
      })
      .catch(() => {
        setFeaturedItems([
          { id: 1, name: 'Chicken Wings', price: 650, image: '/images/The Easiest Smoked Chicken Wings Recipe.jpeg' },
          { id: 4, name: 'Chicken Wrap', price: 450, image: '/images/Healthy Chicken Ranch Wraps for Busy Days.jpeg' }
        ])
      })
  }, [])

  return (
    <div className="page">
      <section className="hero">
        <div className="container">
          <h1>Welcome to Mvule Catering</h1>
          <p>Experience authentic flavors delivered fresh to your doorstep</p>
          <p style={{fontSize: '1.1rem', marginBottom: '2.5rem', opacity: 0.9}}>From traditional Kenyan dishes to international favorites</p>
          <Link to="/menu" className="btn" style={{fontSize: '1.2rem', padding: '1.2rem 2.5rem', background: 'var(--primary)', boxShadow: '0 4px 15px rgba(255,107,53,0.3)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}>
            <FaShoppingCart /> Order Now
          </Link>
        </div>
      </section>
      
      <div className="container">
        <section style={{textAlign: 'center', margin: '4rem 0'}}>
          <h2 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>Why Choose Mvule Catering?</h2>
          <div className="grid grid-3" style={{marginTop: '3rem'}}>
            <div className="card" style={{textAlign: 'center', padding: '2rem'}}>
              <FaTruck style={{fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)'}} />
              <h3>Lightning Fast Delivery</h3>
              <p>We don't just deliver food, we deliver happiness straight to your doorstep. Hot, fresh, and faster than your cravings can wait! 🚀</p>
            </div>
            <div className="card" style={{textAlign: 'center', padding: '2rem'}}>
              <FaUserTie style={{fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)'}} />
              <h3>Culinary Wizards</h3>
              <p>Our chefs don't just cook - they create edible masterpieces that'll make your taste buds do a happy dance. Pure kitchen magic! ✨</p>
            </div>
            <div className="card" style={{textAlign: 'center', padding: '2rem'}}>
              <FaStar style={{fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)'}} />
              <h3>Flavor That Hits Different</h3>
              <p>We're not just serving food, we're serving experiences. Every bite is a journey to flavor town - no passport required! 🎯</p>
            </div>
          </div>
        </section>

        <section>
          <h2 style={{textAlign: 'center', margin: '3rem 0 2rem', fontSize: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
            <FaFire style={{color: 'var(--primary)'}} /> Today's Specials
          </h2>
          <div className="grid grid-2">
            {featuredItems.map(item => (
              <div key={item.id} className="card" style={{display: 'flex', alignItems: 'center', gap: '1rem', overflow: 'hidden'}}>
                <div style={{width: '120px', height: '120px', flexShrink: 0}}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius)'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div style={{
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    fontSize: '3rem',
                    background: 'var(--bg-light)',
                    borderRadius: 'var(--radius)'
                  }}>
                    🍽️
                  </div>
                </div>
                <div>
                  <h3 style={{marginBottom: '0.5rem'}}>{item.name}</h3>
                  {item.description && (
                    <p style={{color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                      {item.description}
                    </p>
                  )}
                  <div className="price" style={{fontSize: '1.3rem', marginBottom: '1rem'}}>KSh {item.price}</div>
                  <Link to="/menu" className="btn" style={{fontSize: '0.9rem'}}>Order Now</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{textAlign: 'center', margin: '4rem 0', padding: '3rem', background: 'var(--bg-light)', borderRadius: 'var(--radius)'}}>
          <h2 style={{fontSize: '2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
            <FaMobile style={{color: 'var(--primary)'}} /> Download Our App
          </h2>
          <p style={{marginBottom: '2rem', fontSize: '1.1rem'}}>Get exclusive deals and faster ordering</p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <button className="btn" style={{background: '#000', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <FaApple /> App Store
            </button>
            <button className="btn" style={{background: '#01875f', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <FaAndroid /> Google Play
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home