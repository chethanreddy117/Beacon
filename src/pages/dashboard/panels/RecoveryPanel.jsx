import { AlertTriangle } from 'lucide-react'

export function RecoveryPanel() {
  return (
    <>
      <div className="page-header"><div><div className="subtitle" style={{ marginBottom: 0 }}>Score Recovery</div><h1>Recovery strategies when score plateaus</h1></div></div>
      <div className="page-body">
        <div className="card" style={{ padding: 24, marginBottom: 20, background: 'var(--warning-muted)', border: '1px solid var(--warning)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <AlertTriangle size={20} style={{ color: 'var(--warning)' }} />
            <div><div style={{ fontWeight: 700, fontSize: 14 }}>Score plateau detected</div><div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Your score has been flat at 31 for 12 days. Here are recommended recovery actions.</div></div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { title: 'Expand FAQ coverage', desc: 'Add 8 more FAQ pairs covering emergency services, warranties, and seasonal topics.', impact: 'High', effort: 'Low', color: 'var(--success)' },
            { title: 'Target new AI queries', desc: 'Create content for 5 high-volume queries where you currently have zero presence.', impact: 'High', effort: 'Medium', color: 'var(--accent)' },
            { title: 'Review velocity boost', desc: 'Send review request SMS after the next 10 completed jobs.', impact: 'Medium', effort: 'Low', color: 'var(--warning)' },
            { title: 'Competitor content audit', desc: 'Analyze top 3 competitor pages and fill identified content gaps.', impact: 'High', effort: 'High', color: 'var(--chart-purple)' },
          ].map((s, i) => (
            <div key={i} className="queue-card">
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, marginTop: 6, flexShrink: 0 }} />
              <div className="queue-content">
                <div className="queue-title">{s.title}</div>
                <div className="queue-desc">{s.desc}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <span className="status-pill" style={{ background: `color-mix(in srgb, ${s.color} 10%, transparent)`, color: s.color }}>Impact: {s.impact}</span>
                <span className="status-pill neutral">Effort: {s.effort}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
