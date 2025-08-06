import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import GuestCheckoutSuccess from '../components/GuestCheckoutSuccess'

function Checkout() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  })

  const isLoggedIn = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Create order via backend
      const orderData = {
        items: cartItems.map(item => ({
          menuId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        deliveryAddress: formData.address,
        phone: formData.phone,
        customerLocation: { lat: -1.2864, lng: 36.8172 }, // Default Nairobi
        notes: `Customer: ${formData.name}, Email: ${formData.email}`
      }
      
      const orderResponse = await api.createOrder(orderData)
      
      if (orderResponse.success) {
        // Initiate M-Pesa payment
        const paymentData = {
          phone: formData.phone.replace('+', ''),
          amount: total,
          orderId: orderResponse.data.id
        }
        
        const paymentResponse = await api.initiatePayment(paymentData)
        
        // Clear cart and save order
        localStorage.removeItem('cart')
        localStorage.setItem('lastOrder', JSON.stringify(orderResponse.data))
        window.dispatchEvent(new Event('cartUpdated'))
        
        // Show success component instead of alert and redirect
        setOrderSuccess({
          ...orderResponse.data,
          customerName: formData.name,
          customerEmail: formData.email,
          paymentMessage: paymentResponse.success ? 
            'Check your phone for M-Pesa payment prompt.' : 
            'Payment will be processed shortly.'
        })
      } else {
        alert('Failed to place order. Please try again.')
      }
    } catch (error) {
      console.error('Order error:', error)
      alert(`Failed to place order: ${error.message}. Make sure backend is running on port 5002.`)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (orderSuccess) {
    return (
      <div className="page">
        <div className="container">
          <GuestCheckoutSuccess 
            orderData={orderSuccess} 
            onAccountCreated={() => navigate('/my-orders')}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1>Checkout</h1>
          {isLoggedIn && (
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: '0', color: 'var(--primary)' }}>Welcome back, {user.name}!</p>
              <p style={{ margin: '0', fontSize: '0.9rem', color: 'var(--text-light)' }}>Signed in as {user.email}</p>
            </div>
          )}
        </div>
        
        <div className="grid grid-2">
          <div>
            <h2>Order Summary</h2>
            {cartItems.map(item => (
              <div key={item.id} className="card" style={{marginBottom: '1rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>KSh {item.price * item.quantity}</span>
                </div>
              </div>
            ))}
            <div className="card">
              <h3>Total: KSh {total}</h3>
            </div>
          </div>

          <div>
            <h2>Delivery Information</h2>
            {!isLoggedIn && (
              <div style={{ 
                padding: '1rem', 
                background: 'var(--bg-light)', 
                borderRadius: 'var(--radius)',
                marginBottom: '1.5rem',
                border: '1px solid var(--border)'
              }}>
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Ordering as Guest</p>
                <p style={{ margin: '0', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                  You can create an account after placing your order to track future orders.
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button type="submit" className="btn" style={{width: '100%'}} disabled={loading}>
                {loading ? 'Processing Order...' : 'Place Order & Pay with M-Pesa'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout