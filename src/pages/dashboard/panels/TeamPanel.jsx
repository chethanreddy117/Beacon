import { Users } from 'lucide-react'

export function TeamPanel() {
  const members = [
    { name: 'Mike Reynolds', email: 'mike@lonestarelectric.com', role: 'Owner', initials: 'MR' },
    { name: 'Sarah Chen', email: 'sarah@lonestarelectric.com', role: 'Manager', initials: 'SC' },
    { name: 'James Webb', email: 'james@lonestarelectric.com', role: 'Viewer', initials: 'JW' },
  ]
  return (
    <>
      <div className="page-header">
        <div><div className="subtitle" style={{ marginBottom: 0 }}>Team</div><h1>Manage team members</h1></div>
        <button className="btn btn-accent"><Users size={14} /> Invite member</button>
      </div>
      <div className="page-body">
        <div className="card">
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {members.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 0', borderBottom: i < members.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-full)', background: 'linear-gradient(135deg, var(--accent), #3CEFA3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{m.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{m.email}</div>
                </div>
                <span className={`status-pill ${m.role === 'Owner' ? 'info' : 'neutral'}`}>{m.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
