import { useState, useEffect } from 'react'
import api from '../services/api'

function OrderTracking({ orderId }) {
  const [trackingData, setTrackingData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const response = await api.trackOrder(orderId)
        if (response.success) {
          setTrackingData(response.data)
        }
      } catch (error) {
        console.error('Tracking error:', error)
      } finally {
        setLoading(false)
      }
    }

    if (orderId) {
      fetchTracking()
      const interval = setInterval(fetchTracking, 30000)
      return () => clearInterval(interval)
    }
  }, [orderId])

  if (loading) return <div>Loading tracking information...</div>
  if (!trackingData) return <div>No tracking data available</div>

  return (
    <div className="tracking-info">
      <h3>Order #{trackingData.orderId} - {trackingData.status}</h3>
      
      <div className="driver-info card" style={{marginBottom: '1rem'}}>
        <h4>Driver Information</h4>
        <p><strong>Name:</strong> {trackingData.driverInfo.name}</p>
        <p><strong>Phone:</strong> {trackingData.driverInfo.phone}</p>
        <p><strong>Vehicle:</strong> {trackingData.driverInfo.vehicle}</p>
        <p><strong>ETA:</strong> {new Date(trackingData.estimatedArrival).toLocaleTimeString()}</p>
      </div>

      {trackingData.route && (
        <div className="route-info card">
          <h4>Delivery Route</h4>
          <p><strong>Distance:</strong> {trackingData.route.distance}</p>
          <p><strong>Duration:</strong> {trackingData.route.duration}</p>
        </div>
      )}

      <div className="location-info" style={{marginTop: '1rem'}}>
        <p><strong>Driver Location:</strong> {trackingData.driverLocation.lat.toFixed(4)}, {trackingData.driverLocation.lng.toFixed(4)}</p>
        <p style={{fontSize: '0.9rem', color: 'var(--text-light)'}}>Last updated: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  )
}

export default OrderTracking