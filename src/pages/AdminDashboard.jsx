import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUsers, FaShoppingCart, FaDollarSign, FaArrowUp, FaClock, FaEye, FaChartBar } from 'react-icons/fa'

function AdminDashboard() {
  const [data, setData] = useState({ orders: [], menu: [], analytics: {} })
  const [timeFilter, setTimeFilter] = useState('today')
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      if (user.role !== 'admin') {
        navigate('/login')
        return
      }
    } catch (error) {
      console.error('Auth error:', error)
      navigate('/login')
      return
    }

    // Professional analytics data
    const mockData = {
      orders: [
        { id: 1, customer: 'John Doe', total: 1200, status: 'pending', date: '2024-01-15', items: 3 },
        { id: 2, customer: 'Jane Smith', total: 850, status: 'completed', date: '2024-01-15', items: 2 },
        { id: 3, customer: 'Mike Johnson', total: 2100, status: 'in_transit', date: '2024-01-15', items: 5 },
        { id: 4, customer: 'Sarah Wilson', total: 750, status: 'completed', date: '2024-01-14', items: 2 }
      ],
      analytics: {
        totalSales: 25750,
        totalOrders: 67,
        avgOrderValue: 384,
        newCustomers: 12,
        completionRate: 94.2,
        avgDeliveryTime: 28,
        topSellingItems: [
          { name: 'Chicken Wings', sales: 45, revenue: 29250 },
          { name: 'Beef Burger', sales: 32, revenue: 16000 },
          { name: 'Chicken Wrap', sales: 28, revenue: 12600 }
        ],
        ordersByStatus: {
          pending: 8,
          confirmed: 12,
          preparing: 6,
          in_transit: 4,
          completed: 35,
          cancelled: 2
        }
      },
      menu: [
        { id: 1, name: 'Chicken Wings', price: 650, category: 'Wings', sales: 45 },
        { id: 2, name: 'Beef Burger', price: 500, category: 'Burgers', sales: 32 },
        { id: 3, name: 'Chicken Wrap', price: 450, category: 'Wraps', sales: 28 },
        { id: 4, name: 'Beef Ribs', price: 850, category: 'Meat', sales: 18 }
      ],
      featured: [1, 2]
    }
    setData(mockData)
  }, [timeFilter, navigate])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
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
  }

  return (
    <div className="page">
      <div className="container">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
          <h1>Admin Dashboard</h1>
          <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <select 
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value)}
              style={{padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)'}}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <button onClick={logout} className="btn" style={{background: 'var(--secondary)'}}>Logout</button>
          </div>
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-4" style={{marginBottom: '2rem'}}>
          <div className="card" style={{textAlign: 'center', padding: '1.5rem'}}>
            <FaDollarSign style={{fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem'}} />
            <h3 style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}>Total Sales</h3>
            <p style={{fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary)'}}>KSh {data.analytics.totalSales?.toLocaleString()}</p>
          </div>
          <div className="card" style={{textAlign: 'center', padding: '1.5rem'}}>
            <FaShoppingCart style={{fontSize: '2rem', color: 'var(--accent)', marginBottom: '0.5rem'}} />
            <h3 style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}>Total Orders</h3>
            <p style={{fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--accent)'}}>{data.analytics.totalOrders}</p>
          </div>
          <div className="card" style={{textAlign: 'center', padding: '1.5rem'}}>
            <FaUsers style={{fontSize: '2rem', color: 'green', marginBottom: '0.5rem'}} />
            <h3 style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}>New Customers</h3>
            <p style={{fontSize: '1.8rem', fontWeight: 'bold', color: 'green'}}>{data.analytics.newCustomers}</p>
          </div>
          <div className="card" style={{textAlign: 'center', padding: '1.5rem'}}>
            <FaClock style={{fontSize: '2rem', color: 'orange', marginBottom: '0.5rem'}} />
            <h3 style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}>Avg Delivery</h3>
            <p style={{fontSize: '1.8rem', fontWeight: 'bold', color: 'orange'}}>{data.analytics.avgDeliveryTime}min</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-2" style={{marginBottom: '2rem'}}>
          <div className="card">
            <h3 style={{marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <FaChartBar style={{color: 'var(--primary)'}} /> Order Status Distribution
            </h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem'}}>
              {Object.entries(data.analytics.ordersByStatus || {}).map(([status, count]) => (
                <div key={status} style={{textAlign: 'center', padding: '1rem', background: 'var(--bg-light)', borderRadius: 'var(--radius)'}}>
                  <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)'}}>{count}</p>
                  <p style={{fontSize: '0.8rem', textTransform: 'capitalize'}}>{status}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 style={{marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <FaArrowUp style={{color: 'var(--primary)'}} /> Top Selling Items
            </h3>
            {data.analytics.topSellingItems?.map((item, index) => (
              <div key={index} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--border)'}}>
                <div>
                  <p style={{fontWeight: 'bold'}}>{item.name}</p>
                  <p style={{fontSize: '0.8rem', color: 'var(--text-light)'}}>{item.sales} orders</p>
                </div>
                <p style={{fontWeight: 'bold', color: 'var(--primary)'}}>KSh {item.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Items Management */}
        <div className="card" style={{marginBottom: '2rem'}}>
          <h2>Manage Today's Specials</h2>
          <div className="grid grid-4">
            {data.menu?.map(item => {
              const isFeatured = data.featured?.includes(item.id)
              return (
                <div key={item.id} className="card" style={{padding: '1rem', background: isFeatured ? 'var(--primary)' : 'var(--bg-light)'}}>
                  <h4 style={{marginBottom: '0.5rem', color: isFeatured ? 'white' : 'var(--text)'}}>{item.name}</h4>
                  <p style={{fontSize: '0.9rem', color: isFeatured ? 'rgba(255,255,255,0.8)' : 'var(--text-light)'}}>KSh {item.price}</p>
                  <p style={{fontSize: '0.8rem', color: isFeatured ? 'rgba(255,255,255,0.6)' : 'var(--text-light)'}}>{item.sales} sold</p>
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

        {/* Recent Orders */}
        <div className="card">
          <h2>Recent Orders</h2>
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{borderBottom: '2px solid var(--border)'}}>
                  <th style={{padding: '1rem', textAlign: 'left'}}>Order ID</th>
                  <th style={{padding: '1rem', textAlign: 'left'}}>Customer</th>
                  <th style={{padding: '1rem', textAlign: 'left'}}>Items</th>
                  <th style={{padding: '1rem', textAlign: 'left'}}>Total</th>
                  <th style={{padding: '1rem', textAlign: 'left'}}>Status</th>
                  <th style={{padding: '1rem', textAlign: 'left'}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.orders?.map(order => (
                  <tr key={order.id} style={{borderBottom: '1px solid var(--border)'}}>
                    <td style={{padding: '1rem'}}>#{order.id}</td>
                    <td style={{padding: '1rem'}}>{order.customer}</td>
                    <td style={{padding: '1rem'}}>{order.items}</td>
                    <td style={{padding: '1rem', fontWeight: 'bold'}}>KSh {order.total}</td>
                    <td style={{padding: '1rem'}}>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '1rem',
                        fontSize: '0.8rem',
                        background: order.status === 'completed' ? 'green' : order.status === 'pending' ? 'orange' : 'blue',
                        color: 'white'
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{padding: '1rem'}}>
                      <button className="btn" style={{fontSize: '0.8rem', padding: '0.5rem 1rem'}}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard