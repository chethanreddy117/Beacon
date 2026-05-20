import { useState } from 'react'
import { Bot } from 'lucide-react'

export function AutopilotPanel() {
  const [enabled, setEnabled] = useState(false)
  return (
    <>
      <div className="page-header"><div><div className="subtitle" style={{ marginBottom: 0 }}>Autopilot</div><h1>Automatic fix publishing</h1></div></div>
      <div className="page-body">
        <div className="card" style={{ padding: 32, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Bot size={24} style={{ color: 'var(--accent)' }} />
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>Autopilot Mode</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Beacon publishes fixes automatically when confidence is high.</p>
              </div>
            </div>
            <button onClick={() => setEnabled(!enabled)} style={{ width: 52, height: 28, borderRadius: 14, background: enabled ? 'var(--accent)' : 'var(--bg-4)', position: 'relative', transition: 'background 0.2s', cursor: 'pointer', border: 'none' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: enabled ? 27 : 3, transition: 'left 0.2s' }} />
            </button>
          </div>
          <div className="grid-3" style={{ gap: 16 }}>
            <div className="stat-card"><div className="stat-label">Approval Rate</div><div className="stat-value" style={{ color: 'var(--success)' }}>94%</div><div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>Threshold: 90%</div></div>
            <div className="stat-card"><div className="stat-label">Auto-Published</div><div className="stat-value" style={{ color: 'var(--accent)' }}>12</div><div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>Last 30 days</div></div>
            <div className="stat-card"><div className="stat-label">Reverted</div><div className="stat-value" style={{ color: 'var(--text-tertiary)' }}>0</div><div style={{ fontSize: 11, color: 'var(--success)', marginTop: 4 }}>Perfect record</div></div>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h2>Autopilot Rules</h2></div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { rule: 'FAQ content', status: true, desc: 'Auto-publish FAQ pages when confidence > 85%' },
              { rule: 'Review replies', status: true, desc: 'Auto-reply to 4-5 star reviews using brand voice' },
              { rule: 'Schema updates', status: false, desc: 'Auto-deploy structured data changes' },
              { rule: 'Service pages', status: false, desc: 'Auto-publish location-specific pages' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-2)', borderRadius: 'var(--radius-md)' }}>
                <div><div style={{ fontSize: 13, fontWeight: 600 }}>{r.rule}</div><div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{r.desc}</div></div>
                <span className={`status-pill ${r.status ? 'success' : 'neutral'}`}>{r.status ? 'Active' : 'Manual'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
