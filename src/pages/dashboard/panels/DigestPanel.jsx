import { Mail, Check } from 'lucide-react'

export function DigestPanel() {
  return (
    <>
      <div className="page-header">
        <div>
          <div className="subtitle" style={{ marginBottom: 0 }}>Weekly Digest</div>
          <h1>Your weekly AI visibility report</h1>
        </div>
      </div>
      <div className="page-body">
        <div className="card" style={{ padding: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <Mail size={20} style={{ color: 'var(--accent)' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Week of May 12, 2026</div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Sent Friday 7:00 AM</div>
            </div>
          </div>
          <div className="grid-3" style={{ marginBottom: 24 }}>
            <div className="stat-card">
              <div className="stat-label">Score Change</div>
              <div className="stat-value" style={{ color: 'var(--success)' }}>+8</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Fixes Shipped</div>
              <div className="stat-value" style={{ color: 'var(--accent)' }}>4</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">New Citations</div>
              <div className="stat-value" style={{ color: 'var(--chart-amber)' }}>3</div>
            </div>
          </div>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>What we shipped</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            {['FAQ pairs: panel upgrades', 'GBP Q&A: 4 answers', 'Review reply: Sarah M.', 'Schema update: service areas'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                <Check size={14} style={{ color: 'var(--success)' }} />
                {item}
              </div>
            ))}
          </div>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Where you now appear</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { engine: 'ChatGPT', query: '"best electrician Plano TX"', rank: '#3' },
              { engine: 'Gemini', query: '"emergency electrical Plano"', rank: '#5' },
              { engine: 'Perplexity', query: '"panel upgrade cost Texas"', rank: '#2' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-2)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.engine}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-tertiary)', marginLeft: 8 }}>{item.query}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--success)' }}>{item.rank}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
