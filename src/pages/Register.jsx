import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa'
import api from '../services/api'

function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'customer'
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const response = await api.register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role
      })

      if (response.success) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        alert('Registration successful!')
        
        // Redirect based on role
        if (response.user.role === 'admin') {
          navigate('/admin')
        } else {
          navigate('/dashboard')
        }
      } else {
        alert(response.message || 'Registration failed')
      }
    } catch (error) {
      alert('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="container" style={{maxWidth: '400px', margin: '0 auto', paddingTop: '2rem'}}>
        <div className="card">
          <h1 style={{textAlign: 'center', marginBottom: '2rem'}}>Create Account</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label><FaUser style={{marginRight: '0.5rem'}} />Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

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
              <label><FaPhone style={{marginRight: '0.5rem'}} />Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+254712345678"
              />
            </div>

            <div className="form-group">
              <label>👤 Account Type</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  background: 'var(--bg-light)',
                  color: 'var(--text)',
                  fontSize: '1rem'
                }}
              >
                <option value="customer">🛒 Customer - Order food and track deliveries</option>
                <option value="admin">🔧 Restaurant Admin - Manage orders and menu</option>
              </select>
            </div>

            <div className="form-group">
              <label><FaLock style={{marginRight: '0.5rem'}} />Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password (min 6 characters)"
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label><FaLock style={{marginRight: '0.5rem'}} />Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
              />
            </div>

            <button type="submit" className="btn" style={{width: '100%', marginTop: '1rem'}} disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div style={{textAlign: 'center', marginTop: '1.5rem'}}>
            <p>Already have an account? <Link to="/login" style={{color: 'var(--primary)'}}>Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register