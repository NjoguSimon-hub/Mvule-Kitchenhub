import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Checkout() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  })

  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Clear cart and redirect
    localStorage.removeItem('cart')
    localStorage.setItem('lastOrder', JSON.stringify({
      id: Date.now(),
      items: cartItems,
      total,
      customer: formData,
      status: 'confirmed'
    }))
    window.dispatchEvent(new Event('cartUpdated'))
    navigate('/track')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Checkout</h1>
        
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
              
              <button type="submit" className="btn" style={{width: '100%'}}>
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout