import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import api from '../services/api'

function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await api.login(formData)

      if (response.success) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        
        // Redirect based on role
        if (response.user.role === 'admin') {
          navigate('/admin')
        } else {
          navigate('/dashboard')
        }
      } else {
        alert(response.message || 'Login failed')
      }
    } catch (error) {
      alert('Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="container" style={{maxWidth: '400px', margin: '0 auto', paddingTop: '2rem'}}>
        <div className="card">
          <h1 style={{textAlign: 'center', marginBottom: '2rem'}}>Welcome Back</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label><FaEnvelope style={{marginRight: '0.5rem'}} />Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label><FaLock style={{marginRight: '0.5rem'}} />Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="btn" style={{width: '100%', marginTop: '1rem'}} disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div style={{textAlign: 'center', marginTop: '1.5rem'}}>
            <p>Don't have an account? <Link to="/register" style={{color: 'var(--primary)'}}>Sign Up</Link></p>
          </div>

          <div style={{textAlign: 'center', marginTop: '1rem', padding: '1rem', background: 'var(--bg-light)', borderRadius: 'var(--radius)'}}>
            <p style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}>Demo Admin Login:</p>
            <p style={{fontSize: '0.8rem', color: 'var(--text-light)'}}>Email: admin@mvulecatering.com</p>
            <p style={{fontSize: '0.8rem', color: 'var(--text-light)'}}>Password: password</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login