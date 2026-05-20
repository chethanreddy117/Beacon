import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import './App.css'
import './landing-ref.css'
import './landing-ref2.css'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('beacon-theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('beacon-theme', theme)
    
    // Smooth scroll behavior for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1)
        if (!targetId) return
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          e.preventDefault()
          const top = targetElement.getBoundingClientRect().top + window.scrollY - 88
          window.scrollTo({ top, behavior: 'smooth' })
        }
      })
    })
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/dashboard/*" element={<Dashboard theme={theme} toggleTheme={toggleTheme} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
