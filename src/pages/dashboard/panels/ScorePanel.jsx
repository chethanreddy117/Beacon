import { Info, MessageSquare, Sparkles, Search, Star, Code, ShieldAlert } from 'lucide-react'

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
            background: 'radial-gradient(120% 120% at 50% 10%, rgba(239, 68, 68, 0.04) 0%, rgba(9, 9, 11, 0) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
          }}>
            <div className="score-ring" style={{ width: 140, height: 140, margin: '0 auto 20px', position: 'relative' }}>
              <svg width="140" height="140" viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="scoreRedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#b91c1c" />
                  </linearGradient>
                  <filter id="scoreGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ef4444" floodOpacity="0.45" />
                  </filter>
                </defs>
                <circle className="score-track" cx="60" cy="60" r="54" style={{ stroke: 'rgba(255, 255, 255, 0.04)', strokeWidth: 8 }} />
                <circle className="score-fill" cx="60" cy="60" r="54" strokeDasharray={circ} strokeDashoffset={off} style={{ stroke: 'url(#scoreRedGradient)', filter: 'url(#scoreGlow)', strokeWidth: 8, strokeLinecap: 'round' }} />
              </svg>
              <div className="score-number" style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                fontSize: 38,
                fontWeight: 800,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                textShadow: '0 0 10px rgba(239, 68, 68, 0.3)'
              }}>{score}</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>out of 100</div>
            <div style={{ 
              color: '#ef4444', 
              fontSize: 14, 
              fontWeight: 800, 
              letterSpacing: '0.06em', 
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <ShieldAlert size={16} /> Needs improvement
            </div>
            
            {/* Visual Tags under the score */}
            <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
              <span className="status-pill" style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: 10, fontWeight: 700, letterSpacing: '0.04em' }}>CRITICAL STATUS</span>
              <span className="status-pill neutral" style={{ border: '1px solid rgba(255, 255, 255, 0.04)', fontSize: 10, fontWeight: 700, letterSpacing: '0.04em' }}>Needs Action</span>
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
              borderTop: '1px solid rgba(255, 255, 255, 0.06)', 
              paddingTop: 16 
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Scan Depth</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>48 Core Nodes</div>
              </div>
              <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Deficit Rating</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', marginTop: 4 }}>Severe (69%)</div>
              </div>
            </div>
          </div>

          {/* Model Mentions Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { 
                label: 'ChatGPT mentions', 
                val: '1.2%', 
                icon: <MessageSquare size={15} />,
                color: '#ef4444',
                barBg: 'linear-gradient(90deg, #991b1b, #ef4444)',
                tag: 'CRITICAL DEFICIT', 
                tagColor: '#ef4444', 
                bg: 'rgba(239, 68, 68, 0.1)',
                border: 'rgba(239, 68, 68, 0.15)',
                desc: 'Not appearing in high-intent commercial emergency search queries.'
              },
              { 
                label: 'Gemini mentions', 
                val: '8%', 
                icon: <Sparkles size={15} />,
                color: '#f87171',
                barBg: 'linear-gradient(90deg, #7f1d1d, #f87171)',
                tag: 'FAILING', 
                tagColor: '#f87171', 
                bg: 'rgba(248, 113, 113, 0.1)',
                border: 'rgba(248, 113, 113, 0.15)',
                desc: 'Failing coordinate match; AI agent cannot verify business location directories.'
              },
              { 
                label: 'Perplexity mentions', 
                val: '18%', 
                icon: <Search size={15} />,
                color: '#ff6b6b',
                barBg: 'linear-gradient(90deg, #b91c1c, #ff6b6b)',
                tag: 'ACTION REQUIRED', 
                tagColor: '#ff6b6b', 
                bg: 'rgba(255, 107, 107, 0.1)',
                border: 'rgba(255, 107, 107, 0.15)',
                desc: 'Competitor citation coverage is preferred in 92% of recommendation queries.'
              },
              { 
                label: 'Review quality', 
                val: '67%', 
                icon: <Star size={15} />,
                color: 'var(--chart-amber)',
                barBg: 'linear-gradient(90deg, #d97706, var(--chart-amber))',
                tag: 'WARNING', 
                tagColor: 'var(--warning)', 
                bg: 'rgba(245, 165, 36, 0.1)',
                border: 'rgba(245, 165, 36, 0.15)',
                desc: 'Average rating (3.8 stars) is below the 4.5 star standard AI model threshold.'
              },
              { 
                label: 'Schema coverage', 
                val: '42%', 
                icon: <Code size={15} />,
                color: '#ffaa45',
                barBg: 'linear-gradient(90deg, #c2410c, #ffaa45)',
                tag: 'NEEDS WORK', 
                tagColor: '#ffaa45', 
                bg: 'rgba(255, 170, 69, 0.1)',
                border: 'rgba(255, 170, 69, 0.15)',
                desc: 'Structured metadata (PostalAddress, GeoCoordinates) is missing on local pages.'
              },
            ].map((item, i) => (
              <div key={i} className="stat-card" style={{ 
                padding: '16px 20px', 
                background: 'var(--bg-1)',
                border: `1px solid ${item.border}`,
                boxShadow: `0 4px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.02)`,
                transition: 'all 0.2s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                gap: 10
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: item.color, display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{item.label}</span>
                    <span className="status-pill" style={{ 
                      background: item.bg, 
                      color: item.tagColor, 
                      fontSize: 9.5, 
                      fontWeight: 750,
                      padding: '2px 8px',
                      border: `1px solid rgba(255, 255, 255, 0.02)`
                    }}>{item.tag}</span>
                  </div>
                  <span style={{ fontSize: 14, fontFamily: 'var(--font-mono)', fontWeight: 800, color: item.color }}>{item.val}</span>
                </div>
                
                {/* Micro Description under the progress bar to add content */}
                <p style={{ margin: 0, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                  {item.desc}
                </p>

                <div className="progress-bar" style={{ height: 6, background: 'rgba(255, 255, 255, 0.03)', borderRadius: 99 }}>
                  <div className="progress-fill" style={{ width: item.val, background: item.barBg, borderRadius: 99, height: '100%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Section: Actionable Gap Analysis */}
        <div style={{ marginTop: 40, borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: 28 }}>
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
                impact: 'High Impact',
                impactColor: '#ffaa45',
                tag: '#Schema',
                color: '#ffaa45',
                bg: 'rgba(255, 170, 69, 0.08)',
                borderColor: 'rgba(255, 170, 69, 0.15)'
              },
              {
                title: 'ChatGPT citation deficit for emergency keywords',
                desc: 'Lone Star Electric has zero presence in directories queried by ChatGPT for "24/7 emergency electrician". Competitors maintain citation coverage that pushes them to the top of answers.',
                impact: 'Critical Deficit',
                impactColor: '#ef4444',
                tag: '#ChatGPT',
                color: '#ef4444',
                bg: 'rgba(239, 68, 68, 0.08)',
                borderColor: 'rgba(239, 68, 68, 0.15)'
              },
              {
                title: 'Unanswered GBP query matching deficit',
                desc: 'Perplexity is answering local intent questions using GBP Q&A posts from nearby services. Your profile has 3 customer inquiries unanswered, losing critical algorithmic visibility.',
                impact: 'Medium Impact',
                impactColor: 'var(--chart-amber)',
                tag: '#GBP-Q&A',
                color: 'var(--chart-amber)',
                bg: 'rgba(245, 165, 36, 0.08)',
                borderColor: 'rgba(245, 165, 36, 0.15)'
              }
            ].map((gap, idx) => (
              <div key={idx} className="queue-card" style={{ 
                padding: '18px 22px', 
                display: 'flex', 
                gap: 18, 
                alignItems: 'flex-start',
                background: 'var(--bg-1)',
                border: `1px solid ${gap.borderColor}`,
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
              }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: gap.color, marginTop: 5, flexShrink: 0 }} />
                <div className="queue-content" style={{ flex: 1 }}>
                  <div className="queue-title" style={{ fontSize: 15, fontWeight: 750, color: 'var(--text-primary)' }}>{gap.title}</div>
                  <div className="queue-desc" style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.5 }}>{gap.desc}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0, alignSelf: 'center' }}>
                  <span className="status-pill" style={{ background: gap.bg, color: gap.impactColor, border: `1px solid ${gap.borderColor}`, fontSize: 10.5, fontWeight: 750 }}>{gap.impact}</span>
                  <span className="status-pill neutral" style={{ fontSize: 10.5, fontWeight: 700 }}>{gap.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
