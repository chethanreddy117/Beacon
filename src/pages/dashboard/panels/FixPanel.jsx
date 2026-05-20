import { Check, Pencil } from 'lucide-react'

export function FixPanel() {
  return (
    <>
      <div className="page-header"><div><div className="subtitle">First Fix</div><h1>Review your first content fix</h1></div></div>
      <div className="page-body">
        <div className="card" style={{ padding: 32 }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>FAQ: Panel Upgrade Questions</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 20 }}>6 question-answer pairs written in plain language. Covers costs, timelines, permits, and warranty.</p>
              <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-md)', padding: 20 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8 }}>Preview</div>
                {['How much does a panel upgrade cost?', 'Do I need a permit for electrical panel work?', 'How long does a panel upgrade take?'].map((q, i) => (
                  <div key={i} style={{ marginBottom: 16 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{q}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>A typical panel upgrade for a 200-amp service in the Plano area ranges from $1,800 to $3,200...</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
                <button className="btn btn-accent"><Check size={14} /> Approve & Publish</button>
                <button className="btn btn-secondary"><Pencil size={14} /> Edit</button>
                <button className="btn btn-ghost">Regenerate</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
