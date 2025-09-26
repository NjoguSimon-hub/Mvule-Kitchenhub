import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaClock, FaUser, FaMapMarkerAlt } from 'react-icons/fa'

function CustomerDashboard() {
  const [user, setUser] = useState({})
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}')
    setUser(userData)

    // Mock recent orders
    setRecentOrders([
      {
        id: 1,
        items: ['Chicken Wings', 'Beef Burger'],
        total: 1150,
        status: 'delivered',
        date: '2024-01-15'
      },
      {
        id: 2,
        items: ['Chicken Wrap'],
        total: 450,
        status: 'in_transit',
        date: '2024-01-16'
      }
    ])
  }, [])

  return (
    <div className="page">
      <div className="container">
        <h1>Welcome back, {user.name}!</h1>
        
        <div className="grid grid-3" style={{marginBottom: '2rem'}}>
          <Link to="/menu" className="card" style={{textDecoration: 'none', textAlign: 'center', padding: '2rem'}}>
            <FaShoppingCart style={{fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem'}} />
            <h3>Browse Menu</h3>
            <p>Discover delicious meals</p>
          </Link>
          
          <Link to="/my-orders" className="card" style={{textDecoration: 'none', textAlign: 'center', padding: '2rem'}}>
            <FaClock style={{fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem'}} />
            <h3>My Orders</h3>
            <p>Track your orders</p>
          </Link>
          
          <Link to="/track" className="card" style={{textDecoration: 'none', textAlign: 'center', padding: '2rem'}}>
            <FaMapMarkerAlt style={{fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem'}} />
            <h3>Track Delivery</h3>
            <p>Real-time tracking</p>
          </Link>
        </div>

        <div className="card">
          <h2>Recent Orders</h2>
          {recentOrders.length === 0 ? (
            <p>No orders yet. <Link to="/menu">Start ordering!</Link></p>
          ) : (
            <div>
              {recentOrders.map(order => (
                <div key={order.id} style={{
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--border)'
                }}>
                  <div>
                    <h4>Order #{order.id}</h4>
                    <p>{order.items.join(', ')}</p>
                    <p style={{fontSize: '0.9rem', color: 'var(--text-light)'}}>{order.date}</p>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <p style={{fontWeight: 'bold'}}>KSh {order.total}</p>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '1rem',
                      fontSize: '0.8rem',
                      background: order.status === 'delivered' ? 'green' : 'orange',
                      color: 'white'
                    }}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard