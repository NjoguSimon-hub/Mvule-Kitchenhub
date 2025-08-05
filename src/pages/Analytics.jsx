import { useState, useEffect } from 'react'

function Analytics() {
  const [analytics, setAnalytics] = useState([])

  useEffect(() => {
    fetch('/db.json')
      .then(res => res.json())
      .then(data => setAnalytics(data.analytics || []))
      .catch(() => console.log('Failed to load analytics'))
  }, [])

  return (
    <div className="page">
      <div className="container">
        <h1>Analytics</h1>
        
        <div className="grid grid-2">
          {analytics.map(item => (
            <div key={item.id} className="card">
              <h2>{item.month}</h2>
              <p><strong>Total Sales:</strong> KSh {item.totalSales}</p>
              <p><strong>Orders:</strong> {item.orders}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Analytics