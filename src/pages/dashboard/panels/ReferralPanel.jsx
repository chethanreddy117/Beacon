import { Gift } from 'lucide-react'

export function ReferralPanel() {
  return (
    <>
      <div className="page-header"><div><div className="subtitle" style={{ marginBottom: 0 }}>Referral Program</div><h1>Earn $100 per referral</h1></div></div>
      <div className="page-body">
        <div className="card" style={{ padding: 32, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-lg)', background: 'var(--success-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}><Gift size={22} /></div>
            <div><h3 style={{ fontSize: 16, fontWeight: 700 }}>Share Beacon, earn credits</h3><p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>For each business that signs up and starts a trial, you both get $100 off.</p></div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input className="input-field" value="https://beacon.app/ref/lone-star-electric" readOnly style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: 12 }} />
            <button className="btn btn-accent">Copy link</button>
          </div>
        </div>
        <div className="grid-3" style={{ gap: 16 }}>
          <div className="stat-card"><div className="stat-label">Referrals Sent</div><div className="stat-value" style={{ color: 'var(--accent)' }}>3</div></div>
          <div className="stat-card"><div className="stat-label">Signed Up</div><div className="stat-value" style={{ color: 'var(--success)' }}>1</div></div>
          <div className="stat-card"><div className="stat-label">Credits Earned</div><div className="stat-value" style={{ color: 'var(--chart-amber)' }}>$100</div></div>
        </div>
      </div>
    </>
  )
}
