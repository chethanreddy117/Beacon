
export function PricingPanel() {
  return (
    <>
      <div className="page-header"><div><div className="subtitle" style={{ marginBottom: 0 }}>Subscription</div><h1>Manage your plan</h1></div></div>
      <div className="page-body">
        <div className="card" style={{ padding: 24, marginBottom: 20, background: 'var(--accent-subtle)', border: '1px solid var(--accent)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 4 }}>Current Plan</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Pro &middot; $499/mo</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>Next billing date: June 1, 2026</div>
            </div>
            <button className="btn btn-secondary">Change plan</button>
          </div>
        </div>
        <div className="grid-3" style={{ gap: 16 }}>
          <div className="stat-card"><div className="stat-label">Prompts Used</div><div className="stat-value" style={{ color: 'var(--accent)' }}>38</div><div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>of 50 included</div></div>
          <div className="stat-card"><div className="stat-label">Fixes Shipped</div><div className="stat-value" style={{ color: 'var(--success)' }}>22</div><div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>This billing cycle</div></div>
          <div className="stat-card"><div className="stat-label">Days Active</div><div className="stat-value" style={{ color: 'var(--chart-amber)' }}>41</div><div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>Since April 3</div></div>
        </div>
      </div>
    </>
  )
}
