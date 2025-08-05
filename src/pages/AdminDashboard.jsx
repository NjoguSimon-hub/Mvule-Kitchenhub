import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const [data, setData] = useState({ orders: [], menu: [] })
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, pendingOrders: 0 })
  const navigate = useNavigate()

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth')
    if (!adminAuth) {
      navigate('/admin-login')
      return
    }

    fetch('/db.json')
      .then(res => res.json())
      .then(data => {
        setData(data)
        const totalOrders = data.orders?.length || 0
        const totalRevenue = data.orders?.reduce((sum, order) => sum + order.total, 0) || 0
        const pendingOrders = data.orders?.filter(order => order.status === 'pending').length || 0
        setStats({ totalOrders, totalRevenue, pendingOrders })
      })
      .catch(() => console.log('Failed to load data'))
  }, [])

  const logout = () => {
    localStorage.removeItem('adminAuth')
    navigate('/admin-login')
  }

  const updateOrderStatus = (orderId, newStatus) => {
    alert(`Order #${orderId} status updated to ${newStatus}`)
  }

  return (
    <div className="page">
      <div className="container">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
          <h1>Admin Dashboard</h1>
          <button onClick={logout} className="btn" style={{background: 'var(--secondary)'}}>Logout</button>
        </div>
        
        <div className="grid grid-3" style={{marginBottom: '2rem'}}>
          <div className="card" style={{textAlign: 'center'}}>
            <h3>Total Orders</h3>
            <p style={{fontSize: '2rem', color: 'var(--primary)', fontWeight: 'bold'}}>{stats.totalOrders}</p>
          </div>
          <div className="card" style={{textAlign: 'center'}}>
            <h3>Total Revenue</h3>
            <p style={{fontSize: '2rem', color: 'var(--primary)', fontWeight: 'bold'}}>KSh {stats.totalRevenue}</p>
          </div>
          <div className="card" style={{textAlign: 'center'}}>
            <h3>Pending Orders</h3>
            <p style={{fontSize: '2rem', color: 'var(--accent)', fontWeight: 'bold'}}>{stats.pendingOrders}</p>
          </div>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <h2>Recent Orders</h2>
            {data.orders?.map(order => (
              <div key={order.id} style={{padding: '1rem 0', borderBottom: '1px solid var(--border)'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <p><strong>Order #{order.id}</strong></p>
                    <p>Status: <span style={{color: order.status === 'pending' ? 'var(--accent)' : 'green'}}>{order.status}</span></p>
                    <p>Total: KSh {order.total}</p>
                  </div>
                  <div>
                    <button 
                      onClick={() => updateOrderStatus(order.id, 'completed')}
                      className="btn" 
                      style={{fontSize: '0.8rem', padding: '0.5rem 1rem'}}
                    >
                      Complete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <h2>Menu Management</h2>
            {data.menu?.map(item => (
              <div key={item.id} style={{padding: '1rem 0', borderBottom: '1px solid var(--border)'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <p><strong>{item.name}</strong></p>
                    <p>Price: KSh {item.price}</p>
                    <p>Category: {item.category}</p>
                  </div>
                  <div>
                    <button 
                      className="btn" 
                      style={{fontSize: '0.8rem', padding: '0.5rem 1rem', background: 'var(--secondary)'}}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard