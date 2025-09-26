import { useState } from 'react'
import { FaSearch, FaMapMarkerAlt, FaClock, FaPhone } from 'react-icons/fa'

function PublicTracking() {
  const [orderId, setOrderId] = useState('')
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = async (e) => {
    e.preventDefault()
    if (!orderId.trim()) return

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const mockOrder = {
        id: orderId,
        status: 'in_transit',
        items: ['Chicken Wings', 'Beef Burger'],
        total: 1150,
        estimatedDelivery: '25 minutes',
        driver: {
          name: 'John Kamau',
          phone: '+254712345678',
          vehicle: 'Motorcycle - KCA 123A'
        },
        address: 'Nairobi CBD, Kenya'
      }
      setOrderData(mockOrder)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="page">
      <div className="container">
        <h1 style={{textAlign: 'center', marginBottom: '2rem'}}>Track Your Order</h1>
        
        <div style={{maxWidth: '500px', margin: '0 auto'}}>
          <form onSubmit={handleTrack} className="card">
            <div className="form-group">
              <label><FaSearch style={{marginRight: '0.5rem'}} />Order ID</label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your order ID (e.g., 12345)"
                required
              />
            </div>
            <button type="submit" className="btn" style={{width: '100%'}} disabled={loading}>
              {loading ? 'Tracking...' : 'Track Order'}
            </button>
          </form>

          {orderData && (
            <div className="card" style={{marginTop: '2rem'}}>
              <h2>Order #{orderData.id}</h2>
              
              <div style={{marginBottom: '1.5rem'}}>
                <h3>Status: <span style={{color: 'var(--primary)'}}>{orderData.status.replace('_', ' ').toUpperCase()}</span></h3>
                <p><FaClock style={{marginRight: '0.5rem'}} />Estimated delivery: {orderData.estimatedDelivery}</p>
                <p><FaMapMarkerAlt style={{marginRight: '0.5rem'}} />Delivery to: {orderData.address}</p>
              </div>

              <div style={{marginBottom: '1.5rem'}}>
                <h4>Order Items:</h4>
                <ul>
                  {orderData.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p style={{fontWeight: 'bold'}}>Total: KSh {orderData.total}</p>
              </div>

              {orderData.driver && (
                <div style={{
                  padding: '1rem',
                  background: 'var(--bg-light)',
                  borderRadius: 'var(--radius)',
                  marginTop: '1rem'
                }}>
                  <h4>Driver Information:</h4>
                  <p>👤 {orderData.driver.name}</p>
                  <p><FaPhone style={{marginRight: '0.5rem'}} />{orderData.driver.phone}</p>
                  <p>🏍️ {orderData.driver.vehicle}</p>
                </div>
              )}

              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'var(--primary)',
                color: 'white',
                borderRadius: 'var(--radius)',
                textAlign: 'center'
              }}>
                <p style={{margin: 0}}>Your order is on the way! 🚀</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PublicTracking