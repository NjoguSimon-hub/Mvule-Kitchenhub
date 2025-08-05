import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/db.json')
      const data = await response.json()
      const admin = data.admins.find(a => 
        a.username === credentials.username && a.password === credentials.password
      )
      
      if (admin) {
        localStorage.setItem('adminAuth', JSON.stringify(admin))
        navigate('/admin')
      } else {
        alert('Invalid credentials')
      }
    } catch {
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        localStorage.setItem('adminAuth', JSON.stringify({ id: 1, username: 'admin' }))
        navigate('/admin')
      } else {
        alert('Invalid credentials')
      }
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="form">
          <h1 style={{textAlign: 'center', marginBottom: '2rem'}}>Admin Login</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
              />
            </div>
            
            <button type="submit" className="btn" style={{width: '100%'}}>
              Login as Admin
            </button>
          </form>
          
          <p style={{textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-light)'}}>
            Demo: admin / admin123
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin