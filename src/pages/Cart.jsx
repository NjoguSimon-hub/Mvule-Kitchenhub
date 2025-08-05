import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Cart() {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(cart)
  }, [])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  if (cartItems.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <h1>Your Cart</h1>
          <p>Your cart is empty. <Link to="/menu">Browse our menu</Link></p>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Your Cart</h1>
        
        <div className="grid">
          {cartItems.map(item => (
            <div key={item.id} className="card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <h3>{item.name}</h3>
                <p className="price">₹{item.price}</p>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                <button onClick={() => removeItem(item.id)} style={{color: 'red', background: 'none', border: 'none'}}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{marginTop: '2rem', textAlign: 'center'}}>
          <h2>Total: KSh {total}</h2>
          <Link to="/checkout" className="btn" style={{marginTop: '1rem'}}>Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  )
}

export default Cart