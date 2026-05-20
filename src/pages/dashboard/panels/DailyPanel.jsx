import { Check } from 'lucide-react'

export function DailyPanel() {
  const scans = [
    { time: '6:00 AM', engine: 'ChatGPT', status: 'done', result: 'No new mentions', change: null },
    { time: '6:15 AM', engine: 'Gemini', status: 'done', result: '+1 new mention for "Plano electrician"', change: 'positive' },
    { time: '6:30 AM', engine: 'Perplexity', status: 'done', result: 'Position dropped from #2 to #4', change: 'negative' },
    { time: '7:00 AM', engine: 'Competitor scan', status: 'done', result: 'BrightSpark added 2 new FAQ pages', change: 'negative' },
    { time: '7:15 AM', engine: 'Review monitor', status: 'done', result: '1 new 5-star review detected', change: 'positive' },
    { time: 'Tomorrow 6:00 AM', engine: 'Next full scan', status: 'pending', result: 'Scheduled', change: null },
  ]
  return (
    <>
      <div className="page-header">
        <div><div className="subtitle" style={{ marginBottom: 0 }}>Daily Loop</div><h1>Today's AI engine scan results</h1></div>
        <span className="status-pill success"><Check size={12} /> 5 of 5 complete</span>
      </div>
      <div className="page-body">
        <div className="grid-3" style={{ marginBottom: 24 }}>
          <div className="stat-card"><div className="stat-label">Scans Today</div><div className="stat-value" style={{ color: 'var(--accent)' }}>5</div></div>
          <div className="stat-card"><div className="stat-label">New Mentions</div><div className="stat-value" style={{ color: 'var(--success)' }}>+1</div></div>
          <div className="stat-card"><div className="stat-label">Competitor Changes</div><div className="stat-value" style={{ color: 'var(--warning)' }}>2</div></div>
        </div>
        <div className="card">
          <div className="card-header"><h2>Scan Timeline</h2></div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {scans.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: i < scans.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-quaternary)', width: 110, flexShrink: 0 }}>{s.time}</span>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.status === 'done' ? 'var(--success)' : 'var(--text-quaternary)', flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 600, width: 130, flexShrink: 0 }}>{s.engine}</span>
                <span style={{ fontSize: 13, color: s.change === 'positive' ? 'var(--success)' : s.change === 'negative' ? 'var(--danger)' : 'var(--text-tertiary)', flex: 1 }}>{s.result}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
