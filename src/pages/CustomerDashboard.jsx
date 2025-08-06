import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingBag, FaClock, FaCheckCircle, FaTruck, FaEye } from 'react-icons/fa'

function CustomerDashboard() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    // Mock customer orders - replace with API call
    setTimeout(() => {
      const mockOrders = [
        {
          id: '12345',
          date: '2024-01-15',
          items: [
            { name: 'Chicken Wings', quantity: 2, price: 650 },
            { name: 'Beef Burger', quantity: 1, price: 500 }
          ],
          total: 1800,
          status: 'delivered',
          deliveryAddress: 'Nairobi CBD, Kenya',
          deliveredAt: '2024-01-15T15:30:00Z'
        },
        {
          id: '12344',
          date: '2024-01-10',
          items: [
            { name: 'Chicken Wrap', quantity: 3, price: 450 }
          ],
          total: 1350,
          status: 'delivered',
          deliveryAddress: 'Westlands, Nairobi',
          deliveredAt: '2024-01-10T14:20:00Z'
        },
        {
          id: '12343',
          date: '2024-01-08',
          items: [
            { name: 'Beef Ribs', quantity: 1, price: 850 },
            { name: 'Chicken Wings', quantity: 1, price: 650 }
          ],
          total: 1500,
          status: 'delivered',
          deliveryAddress: 'Karen, Nairobi',
          deliveredAt: '2024-01-08T16:45:00Z'
        }
      ]
      setOrders(mockOrders)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FaClock style={{ color: '#f59e0b' }} />
      case 'in_transit': return <FaTruck style={{ color: '#3b82f6' }} />
      case 'delivered': return <FaCheckCircle style={{ color: '#10b981' }} />
      default: return <FaClock style={{ color: '#6b7280' }} />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b'
      case 'in_transit': return '#3b82f6'
      case 'delivered': return '#10b981'
      default: return '#6b7280'
    }
  }

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
            <p>Loading your orders...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <h1>My Dashboard</h1>
          <p style={{ color: 'var(--text-light)' }}>Welcome back, {user.name}!</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-3" style={{ marginBottom: '3rem' }}>
          <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <FaShoppingBag style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem' }} />
            <h3 style={{ fontSize: '2rem', margin: '0.5rem 0', color: 'var(--primary)' }}>{orders.length}</h3>
            <p style={{ margin: '0', color: 'var(--text-light)' }}>Total Orders</p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <span style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'block' }}>💰</span>
            <h3 style={{ fontSize: '2rem', margin: '0.5rem 0', color: 'var(--primary)' }}>
              KSh {orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
            </h3>
            <p style={{ margin: '0', color: 'var(--text-light)' }}>Total Spent</p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <FaCheckCircle style={{ fontSize: '2rem', color: '#10b981', marginBottom: '0.5rem' }} />
            <h3 style={{ fontSize: '2rem', margin: '0.5rem 0', color: '#10b981' }}>
              {orders.filter(order => order.status === 'delivered').length}
            </h3>
            <p style={{ margin: '0', color: 'var(--text-light)' }}>Completed</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Order History</h2>
            <Link to="/menu" className="btn">
              Order Again
            </Link>
          </div>

          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <FaShoppingBag style={{ fontSize: '4rem', color: 'var(--text-light)', marginBottom: '1rem' }} />
              <h3>No orders yet</h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
                Start by browsing our delicious menu!
              </p>
              <Link to="/menu" className="btn">
                Browse Menu
              </Link>
            </div>
          ) : (
            <div>
              {orders.map((order) => (
                <div key={order.id} className="card" style={{ 
                  marginBottom: '1.5rem', 
                  background: 'var(--bg-light)',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0' }}>Order #{order.id}</h3>
                      <p style={{ margin: '0', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                        {new Date(order.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        marginBottom: '0.5rem'
                      }}>
                        {getStatusIcon(order.status)}
                        <span style={{ 
                          color: getStatusColor(order.status),
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p style={{ margin: '0', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        KSh {order.total.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                      Items Ordered:
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {order.items.map((item, index) => (
                        <span key={index} style={{
                          background: 'var(--bg)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          border: '1px solid var(--border)'
                        }}>
                          {item.name} x{item.quantity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ margin: '0', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                        📍 {order.deliveryAddress}
                      </p>
                      {order.deliveredAt && (
                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                          Delivered: {new Date(order.deliveredAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link 
                        to={`/track?order=${order.id}`}
                        className="btn"
                        style={{ 
                          fontSize: '0.8rem', 
                          padding: '0.5rem 1rem',
                          background: 'var(--secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        <FaEye /> View Details
                      </Link>
                      {order.status === 'delivered' && (
                        <button 
                          className="btn"
                          style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                          onClick={() => {
                            // Add items to cart for reorder
                            const cart = JSON.parse(localStorage.getItem('cart') || '[]')
                            order.items.forEach(item => {
                              const existingItem = cart.find(cartItem => cartItem.name === item.name)
                              if (existingItem) {
                                existingItem.quantity += item.quantity
                              } else {
                                cart.push({ ...item, id: Date.now() + Math.random() })
                              }
                            })
                            localStorage.setItem('cart', JSON.stringify(cart))
                            window.dispatchEvent(new Event('cartUpdated'))
                            alert('Items added to cart!')
                          }}
                        >
                          Reorder
                        </button>
                      )}
                    </div>
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