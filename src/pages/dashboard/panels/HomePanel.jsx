import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

/* ── HOME PANEL ── */
export function HomePanel({ setActiveTab }) {
  const weeklyData = [
    { label: 'Mon', value: 18 },
    { label: 'Tue', value: 22 },
    { label: 'Wed', value: 25 },
    { label: 'Thu', value: 24 },
    { label: 'Fri', value: 31 },
    { label: 'Sat', value: 29 },
    { label: 'Sun', value: 31 },
  ]
  const maxVal = Math.max(...weeklyData.map(d => d.value))

  return (
    <>
      <div className="page-header">
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.04em' }}>Owner workspace</div>
          <h1>Know what changed. Approve what goes live.</h1>
          <div className="subtitle">Score, competitor gap, weekly progress, and the next fix ready for review.</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-accent" onClick={() => setActiveTab('fix')}>Review first fix</button>
          <button className="btn btn-secondary" onClick={() => setActiveTab('queue')}>Open queue</button>
        </div>
      </div>

      <div className="page-body">
        {/* Stats Row */}
        <div className="grid-3" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div className="stat-label">AI Visibility Score</div>
            <div className="stat-value" style={{ color: 'var(--accent)' }}>31</div>
            <div className="stat-change positive"><ArrowUpRight size={14} /> +8 this week</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Fixes Ready</div>
            <div className="stat-value" style={{ color: 'var(--warning)' }}>5</div>
            <div className="stat-change" style={{ color: 'var(--text-tertiary)' }}>Waiting for approval</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Top Competitor</div>
            <div className="stat-value" style={{ color: 'var(--danger)' }}>8x</div>
            <div className="stat-change negative"><ArrowDownRight size={14} /> cited more often</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20 }}>
          {/* Score Trend Chart */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="card-header">
              <h2>Visibility Score Trend</h2>
              <span className="status-pill info">Last 7 days</span>
            </div>
            <div className="bar-chart">
              <div className="bar-chart-grid">
                {weeklyData.map((d, i) => (
                  <div key={i} className={`bar-col ${d.value === maxVal ? 'peak' : ''}`}>
                    <span className="bar-val">{d.value}</span>
                    <div className="bar-fill" style={{ '--h': `${(d.value / maxVal) * 100}%` }} />
                    <span className="bar-label">{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Digest Preview */}
          <div className="card">
            <div className="card-header">
              <h2>This Week</h2>
              <span className="status-pill warning">Building</span>
            </div>
            <div className="card-body">
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Friday digest is building.</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
                4 fixes shipped, 3 new AI mentions, and 5 approvals are ready before the next digest.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { num: 1, title: 'FAQ page ready', desc: 'Panel upgrade questions written in plain language.', status: 'Ready', statusColor: 'success' },
                  { num: 2, title: 'GBP Q&A next', desc: 'Service area and estimate answers queued.', status: 'Next', statusColor: 'info' },
                ].map((item, i) => (
                  <div key={i} className="queue-card" style={{ padding: '14px 16px' }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: 'var(--radius-sm)',
                      background: 'var(--accent-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', flexShrink: 0
                    }}>{item.num}</div>
                    <div className="queue-content">
                      <div className="queue-title" style={{ fontSize: 13 }}>{item.title}</div>
                      <div className="queue-desc" style={{ fontSize: 12 }}>{item.desc}</div>
                    </div>
                    <span className={`status-pill ${item.statusColor}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Competitor Comparison */}
        <div className="card" style={{ marginTop: 20 }}>
          <div className="card-header">
            <h2>Competitor Benchmark</h2>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { name: 'Lone Star Electric', score: 31, you: true },
                { name: 'Plano Electric Pros', score: 68, you: false },
                { name: 'BrightSpark Electrical', score: 54, you: false },
              ].map((c, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: c.you ? 600 : 400, color: c.you ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {c.name} {c.you && <span className="status-pill info" style={{ marginLeft: 8, fontSize: 10 }}>You</span>}
                    </span>
                    <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 600, color: c.you ? 'var(--accent)' : 'var(--text-tertiary)' }}>{c.score}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${c.score}%`, background: c.you ? 'var(--accent)' : 'var(--bg-4)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
