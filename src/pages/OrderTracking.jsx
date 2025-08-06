import { useState, useEffect } from 'react'
import OrderTracking from '../components/OrderTracking'

function OrderTrackingPage() {
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
          {order.items.map((item, index) => (
            <div key={index} style={{padding: '0.5rem 0', borderBottom: '1px solid var(--border)'}}>
              Item #{item.menuId} x {item.quantity} = KSh {item.price * item.quantity}
            </div>
          ))}
        </div>

        <div className="card" style={{marginTop: '2rem'}}>
          <h2>Live Tracking</h2>
          <OrderTracking orderId={order.id} />
        </div>
      </div>
    </div>
  )
}

export default OrderTrackingPage