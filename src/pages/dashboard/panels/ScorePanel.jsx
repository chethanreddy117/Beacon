import { Info, MessageSquare, Sparkles, Search, Star, Code, ShieldAlert, Terminal, Layers, Compass, Award, Database } from 'lucide-react'

export function ScorePanel() {
  const score = 31
  const circ = 2 * Math.PI * 54
  const off = circ - (score / 100) * circ

  return (
    <>
      <div className="page-header" style={{ marginBottom: 28 }}>
        <div>
          <div className="subtitle" style={{ 
            fontSize: 12, 
            textTransform: 'uppercase', 
            letterSpacing: '0.08em', 
            color: 'var(--text-tertiary)',
            fontWeight: 700,
            marginBottom: 6
          }}>AI Visibility Score</div>
          <h1 style={{ 
            fontSize: 32, 
            fontWeight: 800, 
            letterSpacing: '-0.02em', 
            background: 'linear-gradient(135deg, var(--text-primary) 30%, var(--text-secondary) 100%)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent' 
          }}>
            The score explains the gap.
          </h1>
        </div>
      </div>
      <div className="page-body" style={{ paddingTop: 0 }}>
        {/* Metric Overview Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1.85fr', gap: 24, marginBottom: 28 }}>
          
          {/* Circular Score Radial Card */}
          <div className="card" style={{ 
            padding: 32, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'var(--bg-1)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div className="score-ring" style={{ width: 140, height: 140, margin: '0 auto 20px', position: 'relative' }}>
              <svg width="140" height="140" viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="scoreRedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ea580c" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>
                <circle className="score-track" cx="60" cy="60" r="54" style={{ stroke: 'var(--border)', strokeWidth: 8 }} />
                <circle className="score-fill" cx="60" cy="60" r="54" strokeDasharray={circ} strokeDashoffset={off} style={{ stroke: 'url(#scoreRedGradient)', strokeWidth: 8, strokeLinecap: 'round' }} />
              </svg>
              <div className="score-number" style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                fontSize: 38,
                fontWeight: 800,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)'
              }}>{score}</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>out of 100</div>
            <div style={{ 
              color: '#ea580c', 
              fontSize: 14, 
              fontWeight: 700, 
              letterSpacing: '0.04em', 
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <ShieldAlert size={16} /> Needs improvement
            </div>
            
            {/* Visual Tags under the score */}
            <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
              <span className="status-pill" style={{ background: 'var(--bg-2)', color: 'var(--text-secondary)', border: '1px solid var(--border)', fontSize: 10, fontWeight: 600, letterSpacing: '0.04em' }}>critical status</span>
              <span className="status-pill neutral" style={{ border: '1px solid var(--border)', background: 'transparent', fontSize: 10, fontWeight: 600, letterSpacing: '0.04em' }}>needs action</span>
            </div>
            
            <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 18, lineHeight: 1.5, textAlign: 'center' }}>
              Your visibility across top AI search models is critically low, meaning <strong>69% of potential customers</strong> are currently recommended a local competitor instead.
            </p>

            {/* Diagnostic Telemetry Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: 12, 
              width: '100%', 
              marginTop: 22, 
              borderTop: '1px solid var(--border)', 
              paddingTop: 16 
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Scan Depth</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>48 Core Nodes</div>
              </div>
              <div style={{ textAlign: 'center', borderLeft: '1px solid var(--border)' }}>
                <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Deficit Rating</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#ea580c', marginTop: 4 }}>Severe (69%)</div>
              </div>
            </div>
          </div>

          {/* Model Mentions Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { 
                label: 'chatgpt mentions', 
                val: '1.2%', 
                icon: <Terminal size={14} />,
                color: '#3b82f6',
                tag: 'critical', 
                tagColor: '#3b82f6', 
                bg: 'rgba(59, 130, 246, 0.08)',
                desc: 'Not appearing in high-intent commercial emergency search queries.'
              },
              { 
                label: 'gemini mentions', 
                val: '8%', 
                icon: <Layers size={14} />,
                color: '#10b981',
                tag: 'weak', 
                tagColor: '#10b981', 
                bg: 'rgba(16, 185, 129, 0.08)',
                desc: 'Failing coordinate match; AI agent cannot verify business location directories.'
              },
              { 
                label: 'perplexity mentions', 
                val: '18%', 
                icon: <Compass size={14} />,
                color: '#6366f1',
                tag: 'action required', 
                tagColor: '#6366f1', 
                bg: 'rgba(99, 102, 241, 0.08)',
                desc: 'Competitor citation coverage is preferred in 92% of recommendation queries.'
              },
              { 
                label: 'review quality', 
                val: '67%', 
                icon: <Award size={14} />,
                color: '#f59e0b',
                tag: 'warning', 
                tagColor: '#f59e0b', 
                bg: 'rgba(245, 158, 11, 0.08)',
                desc: 'Average rating (3.8 stars) is below the 4.5 star standard AI model threshold.'
              },
              { 
                label: 'schema coverage', 
                val: '42%', 
                icon: <Database size={14} />,
                color: '#64748b',
                tag: 'incomplete', 
                tagColor: '#64748b', 
                bg: 'rgba(100, 116, 139, 0.08)',
                desc: 'Structured metadata (PostalAddress, GeoCoordinates) is missing on local pages.'
              },
            ].map((item, i) => (
              <div key={i} className="card" style={{ 
                padding: '16px 20px', 
                background: 'var(--bg-1)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                gap: 10
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: item.color, display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                    <span style={{ 
                      fontSize: 13, 
                      fontWeight: 500, 
                      fontFamily: '"IBM Plex Mono", monospace',
                      letterSpacing: '0.04em',
                      textTransform: 'lowercase',
                      color: 'var(--text-primary)' 
                    }}>{item.label}</span>
                    <span className="status-pill" style={{ 
                      background: item.bg, 
                      color: item.tagColor, 
                      fontSize: 10, 
                      fontWeight: 650,
                      padding: '2px 8px',
                      border: `1px solid ${item.bg}`
                    }}>{item.tag}</span>
                  </div>
                  <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 600, color: item.color }}>{item.val}</span>
                </div>
                
                {/* Micro Description under the progress bar to add content */}
                <p style={{ margin: 0, fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                  {item.desc}
                </p>

                <div className="progress-bar" style={{ height: 6, background: 'var(--border)', borderRadius: 99 }}>
                  <div className="progress-fill" style={{ width: item.val, background: item.color, borderRadius: 99, height: '100%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Section: Actionable Gap Analysis */}
        <div style={{ marginTop: 40, borderTop: '1px solid var(--border)', paddingTop: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>AI Visibility Citation Gap Analysis</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>Identified algorithmic deficits causing the score plateau</p>
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Info size={14} /> Updated hourly
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              {
                title: 'Missing Schema Markup on Local Pages',
                desc: 'Structured metadata is missing on your emergency service directories. Search models (Gemini & Perplexity) cannot verify physical business coordinates to cross-reference search requests.',
                impact: 'high impact',
                impactColor: '#64748b',
                tag: '#schema',
                color: '#64748b',
                bg: 'rgba(100, 116, 139, 0.08)',
                borderColor: 'var(--border)'
              },
              {
                title: 'ChatGPT citation deficit for emergency keywords',
                desc: 'Lone Star Electric has zero presence in directories queried by ChatGPT for "24/7 emergency electrician". Competitors maintain citation coverage that pushes them to the top of answers.',
                impact: 'critical deficit',
                impactColor: '#3b82f6',
                tag: '#chatgpt',
                color: '#3b82f6',
                bg: 'rgba(59, 130, 246, 0.08)',
                borderColor: 'var(--border)'
              },
              {
                title: 'Unanswered GBP query matching deficit',
                desc: 'Perplexity is answering local intent questions using GBP Q&A posts from nearby services. Your profile has 3 customer inquiries unanswered, losing critical algorithmic visibility.',
                impact: 'medium impact',
                impactColor: '#f59e0b',
                tag: '#gbp-q&a',
                color: '#f59e0b',
                bg: 'rgba(245, 158, 11, 0.08)',
                borderColor: 'var(--border)'
              }
            ].map((gap, idx) => (
              <div key={idx} className="card" style={{ 
                padding: '18px 22px', 
                display: 'flex', 
                gap: 18, 
                alignItems: 'flex-start',
                background: 'var(--bg-1)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: gap.color, marginTop: 5, flexShrink: 0 }} />
                <div className="queue-content" style={{ flex: 1 }}>
                  <div className="queue-title" style={{ fontSize: 15, fontWeight: 650, color: 'var(--text-primary)' }}>{gap.title}</div>
                  <div className="queue-desc" style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.5 }}>{gap.desc}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0, alignSelf: 'center' }}>
                  <span className="status-pill" style={{ background: gap.bg, color: gap.impactColor, border: `1px solid ${gap.bg}`, fontSize: 11, fontWeight: 650, textTransform: 'lowercase' }}>{gap.impact}</span>
                  <span className="status-pill neutral" style={{ fontSize: 11, fontWeight: 600, border: '1px solid var(--border)', background: 'var(--bg-2)', color: 'var(--text-secondary)' }}>{gap.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
