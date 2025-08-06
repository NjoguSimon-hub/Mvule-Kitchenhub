import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCheckCircle, FaUser, FaEnvelope, FaLock } from 'react-icons/fa'
import api from '../services/api'

function GuestCheckoutSuccess({ orderData, onAccountCreated }) {
  const [showAccountForm, setShowAccountForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [accountData, setAccountData] = useState({
    name: orderData?.customerName || '',
    email: orderData?.customerEmail || '',
    phone: orderData?.phone || '',
    password: '',
    confirmPassword: ''
  })

  const handleCreateAccount = async (e) => {
    e.preventDefault()
    
    if (accountData.password !== accountData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const response = await api.register({
        name: accountData.name,
        email: accountData.email,
        phone: accountData.phone,
        password: accountData.password
      })

      if (response.success) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        alert('Account created successfully! You can now track all your orders.')
        onAccountCreated && onAccountCreated()
      } else {
        alert(response.message || 'Failed to create account')
      }
    } catch (error) {
      alert('Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card" style={{ textAlign: 'center', padding: '2rem', marginTop: '2rem' }}>
      <FaCheckCircle style={{ fontSize: '4rem', color: '#10b981', marginBottom: '1rem' }} />
      <h2 style={{ color: '#10b981', marginBottom: '1rem' }}>Order Placed Successfully!</h2>
      <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
        Your order #{orderData?.id} has been confirmed and is being prepared.
      </p>

      <div style={{ marginBottom: '2rem' }}>
        <Link 
          to={`/track?order=${orderData?.id}`} 
          className="btn" 
          style={{ marginRight: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          Track Your Order
        </Link>
        <Link to="/menu" className="btn" style={{ background: 'var(--secondary)' }}>
          Continue Shopping
        </Link>
      </div>

      {!localStorage.getItem('token') && (
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--bg-light)', 
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>Want to track all your orders?</h3>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-light)' }}>
            Create an account to view order history, save addresses, and get exclusive offers!
          </p>
          
          {!showAccountForm ? (
            <div>
              <button 
                onClick={() => setShowAccountForm(true)}
                className="btn"
                style={{ marginRight: '1rem' }}
              >
                Create Account
              </button>
              <Link to="/login" style={{ color: 'var(--primary)' }}>
                Already have an account? Sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleCreateAccount} style={{ textAlign: 'left' }}>
              <div className="form-group">
                <label><FaUser style={{ marginRight: '0.5rem' }} />Full Name</label>
                <input
                  type="text"
                  value={accountData.name}
                  onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label><FaEnvelope style={{ marginRight: '0.5rem' }} />Email</label>
                <input
                  type="email"
                  value={accountData.email}
                  onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label><FaLock style={{ marginRight: '0.5rem' }} />Password</label>
                <input
                  type="password"
                  value={accountData.password}
                  onChange={(e) => setAccountData({ ...accountData, password: e.target.value })}
                  required
                  minLength="6"
                  placeholder="Minimum 6 characters"
                />
              </div>

              <div className="form-group">
                <label><FaLock style={{ marginRight: '0.5rem' }} />Confirm Password</label>
                <input
                  type="password"
                  value={accountData.confirmPassword}
                  onChange={(e) => setAccountData({ ...accountData, confirmPassword: e.target.value })}
                  required
                  placeholder="Confirm your password"
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button 
                  type="submit" 
                  className="btn" 
                  disabled={loading}
                  style={{ flex: 1 }}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowAccountForm(false)}
                  className="btn"
                  style={{ background: 'var(--secondary)', flex: 1 }}
                >
                  Skip for Now
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

export default GuestCheckoutSuccess