import { useState } from 'react'
import { Check, Eye, Pencil, RotateCcw, Sparkles } from 'lucide-react'

export function QueuePanel() {
  const [items, setItems] = useState([
    { id: 1, title: 'FAQ: Panel upgrade questions', desc: 'Six question-answer pairs covering costs, timelines, and permits.', urgency: 'high', type: 'FAQ', why: 'ChatGPT cited competitor FAQ 3x last week. This fills the gap.', status: 'pending' },
    { id: 2, title: 'GBP Q&A: Service area answers', desc: 'Pre-written answers for the 4 most asked GBP questions.', urgency: 'high', type: 'GBP', why: 'Unanswered GBP questions reduce AI trust signals.', status: 'pending' },
    { id: 3, title: 'Review reply: 5-star thank you', desc: 'Personalized reply to recent 5-star review from Sarah M.', urgency: 'low', type: 'Review', why: 'Reply velocity affects review freshness scoring.', status: 'pending' },
    { id: 4, title: 'Service page: Frisco electrician', desc: 'Location-specific service page targeting Frisco TX searches.', urgency: 'medium', type: 'Page', why: 'No Frisco-specific content. Competitors have 3+ pages.', status: 'pending' },
    { id: 5, title: 'Schema: LocalBusiness markup update', desc: 'Updated schema with new service areas and hours.', urgency: 'medium', type: 'Schema', why: 'Current schema is 6 months out of date.', status: 'pending' },
  ])

  const approve = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'approved' } : i))
  const approveAll = () => setItems(prev => prev.map(i => ({ ...i, status: 'approved' })))
  const pending = items.filter(i => i.status === 'pending')

  return (
    <>
      <div className="page-header">
        <div>
          <div className="subtitle" style={{ marginBottom: 0 }}>Action Queue</div>
          <h1>Review and approve fixes</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {pending.length > 0 && (
            <button className="btn btn-accent" onClick={approveAll}>
              <Check size={14} /> Approve all ({pending.length})
            </button>
          )}
        </div>
      </div>
      <div className="page-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map((item) => (
            <div key={item.id} className="queue-card" style={{ opacity: item.status === 'approved' ? 0.5 : 1 }}>
              <div className={`queue-urgency ${item.urgency}`} />
              <div className="queue-content">
                <div className="queue-title">
                  {item.title}
                  <span className="status-pill neutral" style={{ marginLeft: 8 }}>{item.type}</span>
                </div>
                <div className="queue-desc">{item.desc}</div>
                <div className="queue-reason">Why: {item.why}</div>
              </div>
              <div className="queue-actions">
                {item.status === 'pending' ? (
                  <>
                    <button className="btn btn-ghost btn-sm"><Eye size={14} /> Preview</button>
                    <button className="btn btn-ghost btn-sm"><Pencil size={14} /> Edit</button>
                    <button className="btn btn-accent btn-sm" onClick={() => approve(item.id)}><Check size={14} /> Approve</button>
                  </>
                ) : (
                  <>
                    <span className="status-pill success"><Check size={12} /> Approved</span>
                    <button className="btn btn-ghost btn-sm"><RotateCcw size={14} /> Revert</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Autopilot graduation prompt */}
        {items.filter(i => i.status === 'approved').length >= 3 && (
          <div className="card" style={{ marginTop: 24, padding: 24, background: 'var(--accent-subtle)', border: '1px solid var(--accent)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <Sparkles size={20} style={{ color: 'var(--accent)' }} />
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Ready for Autopilot?</h3>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
              You've approved {items.filter(i => i.status === 'approved').length} of {items.length} items.
              Enable Autopilot to let Beacon publish fixes automatically.
            </p>
            <button className="btn btn-accent">Enable Autopilot</button>
          </div>
        )}
      </div>
    </>
  )
}
