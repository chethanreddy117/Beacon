import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sun, Moon, Zap, Menu } from 'lucide-react'
import { DASHBOARD_TABS } from './dashboardTabs'
import {
  HomePanel,
  ScorePanel,
  QueuePanel,
  DigestPanel,
  FixPanel,
  DailyPanel,
  AutopilotPanel,
  RecoveryPanel,
  PricingPanel,
  TeamPanel,
  ReferralPanel,
  SettingsPanel,
} from './panels'

const SIDEBAR_MIN = 52       // icon-only collapsed width
const SIDEBAR_ICON = 64      // icon-only expanded (shows icons + no labels)
const SIDEBAR_DEFAULT = 220  // default compact width
const SIDEBAR_MAX = 300      // max draggable width
const COLLAPSE_THRESHOLD = 150 // collapse dynamically below this width

export default function Dashboard({ theme, toggleTheme }) {
  const [activeTab, setActiveTab] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT)
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const dragging = useRef(false)
  const startX = useRef(0)
  const startW = useRef(0)

  // Derived — true when sidebar is narrow enough to show icon-only
  const isIconOnly = collapsed || sidebarWidth < COLLAPSE_THRESHOLD

  const toggleCollapse = () => {
    if (collapsed || sidebarWidth < COLLAPSE_THRESHOLD) {
      setCollapsed(false)
      setSidebarWidth(SIDEBAR_DEFAULT)
    } else {
      setCollapsed(true)
      setSidebarWidth(SIDEBAR_ICON)
    }
  }

  // Drag-to-resize handlers
  const onMouseDown = useCallback((e) => {
    dragging.current = true
    startX.current = e.clientX
    startW.current = sidebarWidth
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [sidebarWidth])

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return
      const delta = e.clientX - startX.current
      const newW = Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, startW.current + delta))
      setSidebarWidth(newW)
      setCollapsed(newW < COLLAPSE_THRESHOLD)
    }
    const onMouseUp = () => {
      if (!dragging.current) return
      dragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  const effectiveWidth = isIconOnly ? SIDEBAR_ICON : sidebarWidth

  return (
    <div className="app-layout dash-layout" style={{ '--dash-sidebar-w': `${effectiveWidth}px` }}>
      {/* ── Mobile header ── */}
      <header className="mobile-header">
        <button className="btn-ghost" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <Menu size={20} />
        </button>
        <button type="button" className="mobile-brand mobile-brand-link" onClick={() => navigate('/')} style={{ cursor: 'pointer', background: 'none', border: 'none', font: 'inherit' }}>
          Beacon
        </button>
        <button className="btn-ghost" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* ── Mobile overlay ── */}
      {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}

      {/* ── Sidebar ── */}
      <aside
        className={`dash-sidebar ${mobileOpen ? 'mobile-open' : ''} ${isIconOnly ? 'icon-only' : ''}`}
        style={{ width: `${effectiveWidth}px` }}
      >
        {/* Brand row */}
        <div className="dash-sidebar-brand">
          <button type="button" className="dash-brand-logo" onClick={() => navigate('/')} title="Back to home">
            <div className="brand-mark">
              <Zap size={13} color="#fff" />
            </div>
          </button>

          {!isIconOnly && (
            <button type="button" className="dash-brand-name" onClick={() => navigate('/')}>
              <span className="dash-beacon-text">Beacon</span>
              <span className="dash-sub-text">Lone Star Electric</span>
            </button>
          )}

          {/* Hamburger / collapse toggle — always visible */}
          <button
            className={`dash-collapse-btn ${isIconOnly ? 'is-collapsed' : ''}`}
            onClick={toggleCollapse}
            aria-label={isIconOnly ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isIconOnly ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Menu size={16} />
          </button>
        </div>

        {/* Nav items — no overflow scroll */}
        <nav className="dash-sidebar-nav">
          {DASHBOARD_TABS.map((tab, i) => {
            if (tab.divider) return <div key={i} className="dash-divider" />
            if (tab.section) {
              return !isIconOnly
                ? <div key={i} className="dash-section-label">{tab.section}</div>
                : <div key={i} className="dash-divider dash-divider-sm" />
            }
            const Icon = tab.icon
            return (
              <button
                key={i}
                className={`dash-nav-item ${activeTab === tab.id ? 'active' : ''} ${isIconOnly ? 'icon-only' : ''}`}
                onClick={() => { setActiveTab(tab.id); setMobileOpen(false) }}
                title={isIconOnly ? tab.label : undefined}
              >
                <Icon size={16} className="dash-nav-icon" />
                {!isIconOnly && <span className="dash-nav-label">{tab.label}</span>}
                {tab.badge && !isIconOnly && <span className="dash-badge">{tab.badge}</span>}
                {tab.badge && isIconOnly && <span className="dash-badge-dot" />}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className={`dash-sidebar-footer ${isIconOnly ? 'icon-only' : ''}`}>
          <div className="dash-avatar">MR</div>
          {!isIconOnly && (
            <div className="dash-user-info">
              <div className="dash-user-name">Mike Reynolds</div>
              <div className="dash-user-plan">Pro · Day 41</div>
            </div>
          )}
          <button className="btn-ghost dash-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        {/* Drag resize handle */}
        <div className="dash-resize-handle" onMouseDown={onMouseDown} title="Drag to resize" />
      </aside>

      {/* ── Main content ── */}
      <main className="dash-main" style={{ marginLeft: `${effectiveWidth}px` }}>
        {activeTab === 'home' && <HomePanel setActiveTab={setActiveTab} />}
        {activeTab === 'score' && <ScorePanel />}
        {activeTab === 'queue' && <QueuePanel />}
        {activeTab === 'digest' && <DigestPanel />}
        {activeTab === 'fix' && <FixPanel />}
        {activeTab === 'daily' && <DailyPanel />}
        {activeTab === 'autopilot' && <AutopilotPanel />}
        {activeTab === 'recovery' && <RecoveryPanel />}
        {activeTab === 'pricing' && <PricingPanel />}
        {activeTab === 'team' && <TeamPanel />}
        {activeTab === 'referral' && <ReferralPanel />}
        {activeTab === 'settings' && <SettingsPanel />}
      </main>
    </div>
  )
}
