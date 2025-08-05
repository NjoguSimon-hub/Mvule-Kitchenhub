import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [featuredItems, setFeaturedItems] = useState([])

  useEffect(() => {
    fetch('/db.json')
      .then(res => res.json())
      .then(data => setFeaturedItems(data.menu.slice(0, 3)))
      .catch(() => {
        setFeaturedItems([
          { id: 1, name: 'Chicken Biryani', price: 500 },
          { id: 2, name: 'Burger', price: 350 }
        ])
      })
  }, [])

  return (
    <div className="page">
      <section className="hero">
        <div className="container">
          <h1>🍽️ Welcome to KitchenHub</h1>
          <p>Experience authentic flavors delivered fresh to your doorstep</p>
          <p style={{fontSize: '1rem', marginBottom: '2rem', opacity: 0.8}}>From traditional Kenyan dishes to international favorites</p>
          <Link to="/menu" className="btn" style={{fontSize: '1.1rem', padding: '1rem 2rem'}}>🛒 Order Now</Link>
        </div>
      </section>
      
      <div className="container">
        <section style={{textAlign: 'center', margin: '4rem 0'}}>
          <h2 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>Why Choose KitchenHub?</h2>
          <div className="grid grid-3" style={{marginTop: '3rem'}}>
            <div className="card" style={{textAlign: 'center', padding: '2rem'}}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🚚</div>
              <h3>Fast Delivery</h3>
              <p>Fresh food delivered in 30 minutes or less</p>
            </div>
            <div className="card" style={{textAlign: 'center', padding: '2rem'}}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>👨‍🍳</div>
              <h3>Expert Chefs</h3>
              <p>Prepared by experienced chefs with love</p>
            </div>
            <div className="card" style={{textAlign: 'center', padding: '2rem'}}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🌟</div>
              <h3>Quality Guaranteed</h3>
              <p>Fresh ingredients, authentic recipes</p>
            </div>
          </div>
        </section>

        <section>
          <h2 style={{textAlign: 'center', margin: '3rem 0 2rem', fontSize: '2.5rem'}}>🔥 Today's Specials</h2>
          <div className="grid grid-2">
            {featuredItems.map(item => (
              <div key={item.id} className="card" style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <div style={{fontSize: '4rem'}}>🍽️</div>
                <div>
                  <h3 style={{marginBottom: '0.5rem'}}>{item.name}</h3>
                  <div className="price" style={{fontSize: '1.3rem'}}>KSh {item.price}</div>
                  <Link to="/menu" className="btn" style={{marginTop: '1rem', fontSize: '0.9rem'}}>Order Now</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{textAlign: 'center', margin: '4rem 0', padding: '3rem', background: 'var(--bg-light)', borderRadius: 'var(--radius)'}}>
          <h2 style={{fontSize: '2rem', marginBottom: '1rem'}}>📱 Download Our App</h2>
          <p style={{marginBottom: '2rem', fontSize: '1.1rem'}}>Get exclusive deals and faster ordering</p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <button className="btn" style={{background: '#000', padding: '1rem 2rem'}}>📱 App Store</button>
            <button className="btn" style={{background: '#01875f', padding: '1rem 2rem'}}>🤖 Google Play</button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home