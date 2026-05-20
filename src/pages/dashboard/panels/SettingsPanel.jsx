import { Check } from 'lucide-react'

export function SettingsPanel() {
  return (
    <>
      <div className="page-header"><div><div className="subtitle" style={{ marginBottom: 0 }}>Settings</div><h1>Account & integrations</h1></div></div>
      <div className="page-body">
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header"><h2>Business Information</h2></div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Business name', value: 'Lone Star Electric' },
              { label: 'Service area', value: 'Plano, Frisco, McKinney, Allen TX' },
              { label: 'Website', value: 'https://lonestarelectric.com' },
              { label: 'Phone', value: '(972) 555-0142' },
            ].map((f, i) => (
              <div key={i}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', display: 'block', marginBottom: 6 }}>{f.label}</label>
                <input className="input-field" defaultValue={f.value} />
              </div>
            ))}
            <button className="btn btn-accent" style={{ alignSelf: 'flex-start', marginTop: 8 }}><Check size={14} /> Save changes</button>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h2>Integrations</h2></div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { name: 'Google Business Profile', status: 'Connected', connected: true },
              { name: 'ServiceTitan', status: 'Not connected', connected: false },
              { name: 'Slack', status: 'Connected', connected: true },
              { name: 'Zapier', status: 'Not connected', connected: false },
            ].map((int, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-2)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{int.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className={`status-pill ${int.connected ? 'success' : 'neutral'}`}>{int.status}</span>
                  <button className={`btn btn-sm ${int.connected ? 'btn-ghost' : 'btn-secondary'}`}>{int.connected ? 'Manage' : 'Connect'}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
