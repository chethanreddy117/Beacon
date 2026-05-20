
export function ScorePanel() {
  const score = 31
  const circ = 2 * Math.PI * 54
  const off = circ - (score / 100) * circ

  return (
    <>
      <div className="page-header">
        <div>
          <div className="subtitle" style={{ marginBottom: 0 }}>AI Visibility Score</div>
          <h1>The score explains the gap.</h1>
        </div>
      </div>
      <div className="page-body">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div className="card" style={{ padding: 32, textAlign: 'center' }}>
            <div className="score-ring" style={{ width: 140, height: 140, margin: '0 auto 20px' }}>
              <svg width="140" height="140" viewBox="0 0 120 120">
                <circle className="score-track" cx="60" cy="60" r="54" />
                <circle className="score-fill" cx="60" cy="60" r="54" strokeDasharray={circ} strokeDashoffset={off} />
              </svg>
              <span className="score-number" style={{ fontSize: 36 }}>{score}</span>
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>out of 100</div>
            <div style={{ marginTop: 8, color: 'var(--warning)', fontSize: 13, fontWeight: 600 }}>Needs improvement</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'ChatGPT mentions', val: '12%', color: 'var(--chart-blue)' },
              { label: 'Gemini mentions', val: '8%', color: 'var(--chart-green)' },
              { label: 'Perplexity mentions', val: '18%', color: 'var(--chart-purple)' },
              { label: 'Review quality', val: '67%', color: 'var(--chart-amber)' },
              { label: 'Schema coverage', val: '42%', color: 'var(--chart-teal)' },
            ].map((item, i) => (
              <div key={i} className="stat-card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.label}</span>
                  <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 600, color: item.color }}>{item.val}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: item.val, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
