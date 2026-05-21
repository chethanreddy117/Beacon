import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  
  // Default mock credentials pre-loaded on inputs
  const suggestedCreds = {
    email: 'admin@beacon.ai',
    password: 'secure_password_123'
  }

  const [email, setEmail] = useState(suggestedCreds.email)
  const [password, setPassword] = useState(suggestedCreds.password)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    
    setIsSubmitting(true)
    setError('')
    
    // Simulate premium login experience transition
    setTimeout(() => {
      setIsSubmitting(false)
      navigate('/dashboard', { replace: true })
    }, 1200)
  }

  return (
    <div className="ref-login-page">
      {/* Smoky interactive ambient shapes */}
      <div className="ref-login-smoke-1" />
      <div className="ref-login-smoke-2" />
      <div className="ref-login-smoke-3" />

      <div className="ref-login-card">
        {/* Circular Close Button */}
        <button 
          className="ref-login-close-btn" 
          onClick={() => navigate('/')} 
          aria-label="Close"
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header Kicker matching 'Introducing' color */}
        <span className="ref-login-kicker">Welcome Back</span>

        {/* Huge Bold Title */}
        <h2 className="ref-login-title">Sign in to<br />Beacon</h2>

        {/* Short Muted Description */}
        <p className="ref-login-desc">
          Manage your AI visibility checks, view competitor gaps, and approve fixes instantly.
        </p>

        {/* Login Form */}
        <form className="ref-login-form" onSubmit={handleLogin}>
          {error && <div className="ref-login-error">{error}</div>}

          <div className="ref-login-field-wrap">
            <label className="ref-login-label">Email Address</label>
            <input
              type="email"
              className="ref-login-input"
              placeholder="e.g. admin@beacon.ai"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="ref-login-field-wrap">
            <label className="ref-login-label">Password</label>
            <input
              type="password"
              className="ref-login-input"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className={`ref-login-btn ${isSubmitting ? 'is-loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Connecting securely...' : 'Sign In Now'}
          </button>
        </form>

        {/* Bottom Signup Link */}
        <div className="ref-login-footer">
          <span>Don't have an account?</span>
          <a href="#audit" className="ref-login-signup-link" onClick={(e) => {
            e.preventDefault()
            navigate('/')
          }}>
            Sign up free
          </a>
        </div>
      </div>
    </div>
  )
}
