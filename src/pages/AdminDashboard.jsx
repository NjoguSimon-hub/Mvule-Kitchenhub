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

  const toggleFeatured = (itemId) => {
    const currentFeatured = data.featured || []
    let newFeatured
    
    if (currentFeatured.includes(itemId)) {
      newFeatured = currentFeatured.filter(id => id !== itemId)
    } else {
      newFeatured = [...currentFeatured, itemId]
    }
    
    setData({...data, featured: newFeatured})
    alert(`Item ${currentFeatured.includes(itemId) ? 'removed from' : 'added to'} Today's Specials!`)
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

        <div className="card" style={{marginBottom: '2rem'}}>
          <h2>Manage Today's Specials</h2>
          <div className="grid grid-3">
            {data.menu?.map(item => {
              const isFeatured = data.featured?.includes(item.id)
              return (
                <div key={item.id} className="card" style={{padding: '1rem', background: isFeatured ? 'var(--primary)' : 'var(--bg-light)'}}>
                  <h4 style={{marginBottom: '0.5rem', color: isFeatured ? 'white' : 'var(--text)'}}>{item.name}</h4>
                  <p style={{fontSize: '0.9rem', color: isFeatured ? 'rgba(255,255,255,0.8)' : 'var(--text-light)'}}>KSh {item.price}</p>
                  <button 
                    onClick={() => toggleFeatured(item.id)}
                    className="btn" 
                    style={{
                      marginTop: '0.5rem',
                      fontSize: '0.8rem',
                      padding: '0.5rem 1rem',
                      background: isFeatured ? 'white' : 'var(--primary)',
                      color: isFeatured ? 'var(--primary)' : 'white'
                    }}
                  >
                    {isFeatured ? 'Remove' : 'Feature'}
                  </button>
                </div>
              )
            })}
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