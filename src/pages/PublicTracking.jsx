import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaSearch, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import LoadingSpinner from '../components/LoadingSpinner'

function PublicTracking() {
  const [searchParams] = useSearchParams()
  const [trackingInput, setTrackingInput] = useState('')
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const orderParam = searchParams.get('order')
    if (orderParam) {
      setTrackingInput(orderParam)
      setTimeout(() => {
        trackOrder(orderParam)
      }, 500)
    }
  }, [searchParams])

  const trackOrder = async (inputValue = trackingInput) => {
    if (!inputValue.trim()) {
      setError('Please enter order ID or phone number')
      return
    }

    setLoading(true)
    setError('')

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockOrder = {
        id: inputValue,
        status: 'in_transit',
        items: [
          { name: 'Chicken Wings', quantity: 2, price: 650 },
          { name: 'Beef Burger', quantity: 1, price: 500 }
        ],
        total: 1800,
        timeline: [
          { 
            status: 'placed', 
            time: '2:30 PM', 
            completed: true, 
            description: 'Order placed successfully',
            staff: 'System',
            details: 'Order received and payment confirmed'
          },
          { 
            status: 'confirmed', 
            time: '2:35 PM', 
            completed: true, 
            description: 'Restaurant confirmed your order',
            staff: 'Manager - Sarah K.',
            details: 'Order reviewed and approved for preparation'
          },
          { 
            status: 'ingredients_prep', 
            time: '2:42 PM', 
            completed: true, 
            description: 'Ingredients being prepared',
            staff: 'Prep Cook - John M.',
            details: 'Fresh ingredients selected and prepped'
          },
          { 
            status: 'cooking', 
            time: '2:45 PM', 
            completed: true, 
            description: 'Chef is cooking your meal',
            staff: 'Head Chef - Mary W.',
            details: 'Chicken wings marinated and cooking, burger being grilled'
          },
          { 
            status: 'quality_check', 
            time: '3:05 PM', 
            completed: true, 
            description: 'Quality control check',
            staff: 'Kitchen Supervisor - David L.',
            details: 'Food quality and presentation verified'
          },
          { 
            status: 'packaging', 
            time: '3:10 PM', 
            completed: true, 
            description: 'Order being packaged',
            staff: 'Packaging Team - Alice N.',
            details: 'Food carefully packaged with utensils and napkins'
          },
          { 
            status: 'ready', 
            time: '3:12 PM', 
            completed: true, 
            description: 'Order ready for pickup',
            staff: 'Dispatch - Peter K.',
            details: 'Order handed to delivery driver'
          },
          { 
            status: 'in_transit', 
            time: '3:15 PM', 
            completed: true, 
            description: 'Driver is on the way', 
            active: true,
            staff: 'Driver - James Mwangi',
            details: 'En route to your location, ETA 15 minutes'
          },
          { 
            status: 'delivered', 
            time: 'ETA 3:45 PM', 
            completed: false, 
            description: 'Order will be delivered',
            staff: 'Driver - James Mwangi',
            details: 'Delivery in progress'
          }
        ],
        driver: {
          name: 'James Mwangi',
          phone: '+254798765432',
          vehicle: 'Motorcycle - KCA 123A'
        },
        estimatedArrival: '3:45 PM',
        kitchenNotes: [
          { time: '2:45 PM', note: 'Using fresh chicken wings from today delivery', staff: 'Chef Mary' },
          { time: '2:50 PM', note: 'Extra crispy as requested in order notes', staff: 'Chef Mary' },
          { time: '3:05 PM', note: 'Temperature checked - perfect!', staff: 'Supervisor David' }
        ]
      }
      
      setOrderData(mockOrder)
    } catch (err) {
      setError('Order not found. Please check your order ID or phone number.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Track Your Order</h1>
          
          <div className="card" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="Enter Order ID or Phone Number"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    background: 'var(--bg-light)',
                    color: 'var(--text)',
                    fontSize: '1rem'
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && trackOrder()}
                />
              </div>
              <button 
                className={`btn ${loading ? 'loading' : ''}`}
                onClick={trackOrder}
                disabled={loading}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <FaSearch /> {loading ? 'Searching...' : 'Track'}
              </button>
            </div>
            {error && (
              <p style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center' }}>
                {error}
              </p>
            )}
          </div>

          {loading && <LoadingSpinner text="Finding your order..." />}

          {orderData && (
            <div>
              <div className="card" style={{ marginBottom: '2rem' }}>
                <h2>Order #{orderData.id}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                  <div>
                    <strong>Status:</strong>
                    <p style={{ 
                      color: orderData.status === 'delivered' ? '#10b981' : 
                             orderData.status === 'in_transit' ? '#f59e0b' : 
                             '#3b82f6',
                      textTransform: 'capitalize',
                      fontWeight: 'bold'
                    }}>
                      {orderData.status.replace('_', ' ')}
                    </p>
                  </div>
                  <div>
                    <strong>Total:</strong>
                    <p>KSh {orderData.total}</p>
                  </div>
                  <div>
                    <strong>ETA:</strong>
                    <p>{orderData.estimatedArrival}</p>
                  </div>
                </div>
              </div>

              <div className="card" style={{ marginBottom: '2rem' }}>
                <h3>Order Progress</h3>
                <div style={{ marginTop: '1.5rem' }}>
                  {orderData.timeline.map((step, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      marginBottom: '2rem',
                      opacity: step.completed ? 1 : 0.5,
                      padding: '1rem',
                      background: step.active ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                      borderRadius: 'var(--radius)',
                      border: step.active ? '1px solid #f59e0b' : '1px solid transparent'
                    }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: step.completed ? 
                          (step.active ? '#f59e0b' : '#10b981') : 
                          'var(--border)',
                        marginRight: '1rem',
                        flexShrink: 0,
                        border: step.active ? '3px solid #f59e0b' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>
                        {step.completed ? '✓' : index + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <strong style={{ textTransform: 'capitalize', fontSize: '1.1rem' }}>
                            {step.status.replace(/_/g, ' ')}
                          </strong>
                          <span style={{ color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: 'bold' }}>
                            {step.time}
                          </span>
                        </div>
                        <p style={{ color: 'var(--text)', fontSize: '0.95rem', margin: '0.25rem 0 0.5rem 0' }}>
                          {step.description}
                        </p>
                        {step.staff && (
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.5rem',
                            marginBottom: '0.5rem',
                            padding: '0.5rem',
                            background: 'var(--bg-light)',
                            borderRadius: '4px'
                          }}>
                            <span style={{ fontSize: '1rem' }}>👨🍳</span>
                            <span style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: '600' }}>
                              {step.staff}
                            </span>
                          </div>
                        )}
                        {step.details && (
                          <p style={{ 
                            color: 'var(--text-light)', 
                            fontSize: '0.85rem', 
                            fontStyle: 'italic',
                            margin: '0',
                            paddingLeft: '0.5rem',
                            borderLeft: '2px solid var(--primary)'
                          }}>
                            {step.details}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {orderData.kitchenNotes && orderData.kitchenNotes.length > 0 && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    👨🍳 Kitchen Updates
                  </h3>
                  <div style={{ marginTop: '1rem' }}>
                    {orderData.kitchenNotes.map((note, index) => (
                      <div key={index} style={{
                        padding: '1rem',
                        background: 'var(--bg-light)',
                        borderRadius: 'var(--radius)',
                        marginBottom: '1rem',
                        borderLeft: '4px solid var(--primary)'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <strong style={{ color: 'var(--primary)' }}>{note.staff}</strong>
                          <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{note.time}</span>
                        </div>
                        <p style={{ margin: '0', fontStyle: 'italic' }}>"{note.note}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {orderData.status === 'in_transit' && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaMapMarkerAlt style={{ color: 'var(--primary)' }} />
                    Your Driver
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                    <div>
                      <strong>Name:</strong>
                      <p>{orderData.driver.name}</p>
                    </div>
                    <div>
                      <strong>Vehicle:</strong>
                      <p>{orderData.driver.vehicle}</p>
                    </div>
                    <div>
                      <strong>Contact:</strong>
                      <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaPhone style={{ color: 'var(--primary)' }} />
                        {orderData.driver.phone}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="card">
                <h3>Order Items</h3>
                {orderData.items.map((item, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '0.75rem 0',
                    borderBottom: index < orderData.items.length - 1 ? '1px solid var(--border)' : 'none'
                  }}>
                    <div>
                      <strong>{item.name}</strong>
                      <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div style={{ fontWeight: 'bold' }}>
                      KSh {item.price * item.quantity}
                    </div>
                  </div>
                ))}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginTop: '1rem',
                  padding: '1rem 0',
                  borderTop: '2px solid var(--border)',
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}>
                  <span>Total:</span>
                  <span style={{ color: 'var(--primary)' }}>KSh {orderData.total}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PublicTracking