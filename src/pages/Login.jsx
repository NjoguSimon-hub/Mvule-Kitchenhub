import { useState } from 'react'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simple demo login
    localStorage.setItem('user', JSON.stringify({ email: formData.email, name: 'User' }))
    alert('Login successful!')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="page">
      <div className="container">
        <div className="form">
          <h1 style={{textAlign: 'center', marginBottom: '2rem'}}>Login</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" className="btn" style={{width: '100%'}}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login