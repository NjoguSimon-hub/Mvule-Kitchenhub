import { useState, useEffect } from 'react'

function OrderTracking() {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const lastOrder = JSON.parse(localStorage.getItem('lastOrder') || 'null')
    if (lastOrder) {
      setOrder(lastOrder)
    }
  }, [])

  if (!order) {
    return (
      <div className="page">
        <div className="container">
          <h1>Order Tracking</h1>
          <p>No recent orders found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Track Your Order</h1>
        
        <div className="card">
          <h2>Order #{order.id}</h2>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> KSh {order.total}</p>
          
          <h3>Items:</h3>
          {order.items.map(item => (
            <div key={item.id} style={{padding: '0.5rem 0', borderBottom: '1px solid var(--border)'}}>
              {item.name} x {item.quantity} = KSh {item.price * item.quantity}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderTracking