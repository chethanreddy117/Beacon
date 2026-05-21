import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import ScorePreview from '../components/ScorePreview'

/* ══════════════════════════════════════════════════════════════════
   LANDING PAGE — exact replica of out_index.html light-mode design
   ══════════════════════════════════════════════════════════════════ */
export default function Landing({ toggleTheme }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    requestAnimationFrame(() => {
      const target = document.getElementById(hash)
      if (!target) return
      const top = target.getBoundingClientRect().top + window.scrollY - 88
      window.scrollTo({ top, behavior: 'auto' })
    })
  }, [])

  const videoRef = useRef(null)

  // IntersectionObserver to control background video play/pause
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch((err) => {
            console.log('Video autoplay prevented or failed:', err)
          })
        } else {
          video.pause()
        }
      },
      { threshold: 0.05 }
    )

    observer.observe(video)

    return () => {
      if (video) observer.unobserve(video)
      observer.disconnect()
    }
  }, [])

  // IntersectionObserver for scroll-reveal animations across all landing sections
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-section')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
      }
    )

    revealElements.forEach((el) => observer.observe(el))

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
      observer.disconnect()
    }
  }, [])

  return (
    <div className="landing">
      {/* ── Sticky Nav ── */}
      <header className={`ref-top ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="ref-container">
          <div className="ref-nav-shell">
            <a className="ref-brand" href="#">
              <span className="ref-mark" />
              <span>
                <strong>Beacon</strong>
              </span>
            </a>
            <nav className="ref-nav-links">
              <a href="#how">How it works</a>
              <a href="#result">Live score</a>
              <a href="#pricing">Pricing</a>
            </nav>
            <div className="ref-auth">
              <button className="ref-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                <span className="toggle-icon sun-icon">
                  <Sun size={14} />
                </span>
                <span className="toggle-icon moon-icon">
                  <Moon size={14} />
                </span>
              </button>
              <button className="ref-nav-action" onClick={() => navigate('/login')}>Login</button>
              <button className="ref-nav-action primary" onClick={() => navigate('/login')}>Create account</button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="ref-hero" id="audit">
          <div className="ref-hero-video-bg">
            <video
              ref={videoRef}
              src="/62388e7a0eb65ddf9134c781b253ee9d.mp4"
              loop
              muted
              playsInline
            />
            <div className="ref-hero-video-overlay" />
          </div>
          <div className="ref-container">
            <div className="ref-hero-grid">
              <div>
                {/* <div className="ref-eyebrow">AI visibility check</div> */}
                <h1 className="ref-h1">
                  <span className="muted-word">Built for </span>
                  <span className="angle-word">&lt;contractors&gt;</span>
                  <br />
                  <span className="muted-word">who want calls,</span>
                  <br />
                  not missed recommendations
                </h1>
                <p className="ref-subhead">
                  Beacon checks how ChatGPT, Gemini, and Perplexity describe a local
                  business, then shows the score and the first fix.
                </p>

                <form className={`ref-audit-form ${!isFocused ? 'is-search-pop' : ''}`} onSubmit={e => e.preventDefault()}>
                  <label className="ref-input-wrap">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                      <path d="M10.8 18.6a7.8 7.8 0 1 1 5.5-2.3l4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    <SearchAnimation value={query} onChange={setQuery} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
                  </label>
                  <button className="ref-button primary" type="submit">Check AI Visibility Score</button>
                </form>
                <p className="ref-trust-line" style={{ marginTop: '16px', letterSpacing: '0.02em' }}>No signup.&nbsp;&nbsp;&nbsp;&nbsp;No credit card.</p>

                <p className="ref-hero-note" style={{ marginTop: '24px' }}>
                  <b>For local service owners</b>
                  <span>Electricians, HVAC teams, plumbers, roofers, and contractors can see whether AI tools mention them or a nearby competitor.</span>
                </p>
              </div>

              <ScorePreview />
            </div>
          </div>
        </section>

        {/* ── The Problem ── */}
        <section id="problem" className="reveal-section">
          <div className="ref-container">
            <div className="ref-problem-layout">
              {/* Left side: Heading & Description */}
              <div className="ref-problem-left">
                <div className="ref-section-kicker">The problem</div>
                <h2>Customers ask AI before they call.</h2>
                <div className="ref-problem-description">
                  <p>When customers search for local services, many now ask AI assistants like ChatGPT, Gemini, and Perplexity before visiting your website or calling.</p>
                  <p>If your business isn't mentioned in those AI answers, you miss the customer entirely. That's where Beacon comes in.</p>
                </div>
              </div>

              {/* Right side: Problem cards */}
              <div className="ref-problem-right">
                {[
                  { num: '01', title: '"Best electrician near me"', desc: 'The search can start in ChatGPT, Gemini, or Perplexity.' },
                  { num: '02', title: 'AI names a short list', desc: 'Only a few local companies get shown in the answer.' },
                  { num: '03', title: 'Missing means no call', desc: 'If the business is not mentioned, the customer may never find it.' },
                  { num: '04', title: 'Competitors dominate faster', desc: 'Businesses already optimized for AI visibility appear first.' },
                  // { num: '05', title: 'AI answers keep changing', desc: 'Different searches show different results. Which ones matter most?' },
                ].map((c, i) => (
                  <article key={i} className="ref-plain-card problem-card">
                    <span className="ref-quote-mark">{c.num}</span>
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how" className="ref-how-section reveal-section">
          <div className="ref-container">
            <div className="ref-how-story">
              <div className="ref-how-title-card">
                <div>
                  <div className="ref-section-kicker">Working</div>
                  <h2>How it works</h2>
                  <p>Enter the business. Beacon checks local AI answers. The report shows what to fix first.</p>
                </div>
              </div>
              <div className="ref-audit-timeline">
                {[
                  { step: 1, title: 'Enter the business', desc: 'Add a name, website, or Google Business Profile.' },
                  { step: 2, title: 'Check real local searches', desc: 'Beacon looks at the questions customers ask before calling.' },
                  { step: 3, title: 'Get the score and next fix', desc: 'See where the business appears, who shows up more, and what to improve next.' },
                ].map((s, i) => (
                  <article key={i} className="ref-timeline-step" data-step={s.step}>
                    <div className="ref-timeline-step-inner">
                      <h3>{s.title}</h3>

                      <p>{s.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Live Score ── */}
        <section id="result" className="reveal-section">
          <div className="ref-container">
            <div className="ref-section-head">
              <div className="ref-section-kicker">Live score</div>
              <h2>A changing score with clear next steps.</h2>
              <p>Scores, competitors, and fixes update as Beacon checks different local searches.</p>
            </div>
            <LiveReport />
          </div>
        </section>

        {/* ── After the audit ── */}
        <section id="after-audit" className="reveal-section">
          <div className="ref-container">
            <div className="ref-section-head">
              <div className="ref-section-kicker">After the audit</div>
              <h2>Small fixes that help AI understand the business.</h2>
              <p>Beacon keeps each fix simple, readable, and ready to review.</p>
            </div>
            <div className="ref-four-grid">
              {[
                {
                  title: 'Local FAQ content',
                  desc: 'Answer common questions in plain language.',
                  icon: (
                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="8" y="12" width="28" height="3" rx="1.5" fill="currentColor" opacity="0.5" />
                      <rect x="8" y="20" width="36" height="3" rx="1.5" fill="currentColor" opacity="0.35" />
                      <rect x="8" y="28" width="24" height="3" rx="1.5" fill="currentColor" opacity="0.35" />
                      <rect x="8" y="36" width="30" height="3" rx="1.5" fill="currentColor" opacity="0.25" />
                      <circle cx="42" cy="13.5" r="6" fill="rgba(49,131,122,0.25)" stroke="rgba(49,131,122,0.6)" strokeWidth="1.2" />
                      <text x="42" y="17.5" textAnchor="middle" fill="rgba(49,131,122,0.9)" fontSize="8" fontWeight="700">?</text>
                    </svg>
                  )
                },
                {
                  title: 'Google Business Profile Q&A',
                  desc: 'Add clear answers about services and service areas.',
                  icon: (
                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="6" y="10" width="28" height="18" rx="5" fill="rgba(49,131,122,0.15)" stroke="rgba(49,131,122,0.5)" strokeWidth="1.2" />
                      <rect x="10" y="15" width="16" height="2.5" rx="1.25" fill="currentColor" opacity="0.45" />
                      <rect x="10" y="21" width="10" height="2.5" rx="1.25" fill="currentColor" opacity="0.3" />
                      <polygon points="12,28 18,28 15,33" fill="rgba(49,131,122,0.5)" />
                      <rect x="18" y="24" width="28" height="18" rx="5" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" />
                      <rect x="22" y="29" width="16" height="2.5" rx="1.25" fill="currentColor" opacity="0.35" />
                      <rect x="22" y="35" width="10" height="2.5" rx="1.25" fill="currentColor" opacity="0.25" />
                    </svg>
                  )
                },
                {
                  title: 'Service-area pages',
                  desc: 'Make each city and service easier to understand.',
                  icon: (
                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="6" y="6" width="40" height="40" rx="4" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                      <line x1="6" y1="19" x2="46" y2="19" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                      <line x1="6" y1="32" x2="46" y2="32" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                      <line x1="19" y1="6" x2="19" y2="46" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                      <line x1="32" y1="6" x2="32" y2="46" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                      <path d="M26 10 C22 10 18 13.5 18 17.5 C18 22.5 26 31 26 31 C26 31 34 22.5 34 17.5 C34 13.5 30 10 26 10Z" fill="rgba(49,131,122,0.25)" stroke="rgba(49,131,122,0.7)" strokeWidth="1.2" />
                      <circle cx="26" cy="17.5" r="3" fill="rgba(49,131,122,0.8)" />
                    </svg>
                  )
                },
                {
                  title: 'Review replies',
                  desc: 'Reply with useful details customers care about.',
                  icon: (
                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M26 8 L28.9 18.2 H39.6 L31.3 24.4 L34.2 34.6 L26 28.4 L17.8 34.6 L20.7 24.4 L12.4 18.2 H23.1 Z" fill="rgba(49,131,122,0.3)" stroke="rgba(49,131,122,0.7)" strokeWidth="1.2" strokeLinejoin="round" />
                      <rect x="10" y="38" width="32" height="2.5" rx="1.25" fill="currentColor" opacity="0.2" />
                      <rect x="14" y="43" width="24" height="2.5" rx="1.25" fill="currentColor" opacity="0.12" />
                    </svg>
                  )
                },
              ].map((c, i) => (
                <article key={i} className="ref-small-card">
                  <div className="ref-card-illustration" style={{ color: 'rgba(200,210,215,0.7)' }}>
                    {c.icon}
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </article>
              ))}
            </div>
            <p className="ref-trust-line" style={{ marginTop: 18 }}>Every change is approved before it goes live.</p>
          </div>
        </section>

        {/* ── Stay in Control ── */}
        <section id="control" className="reveal-section">
          <div className="ref-container">
            <div className="ref-split">
              <div className="ref-section-head">
                <div className="ref-section-kicker">Trust and safety</div>
                <h2>Stay in control.</h2>
                <p>Every fix can be reviewed first. Nothing goes live without approval.</p>
              </div>
              <FixQueueAnimation />
            </div>
          </div>
        </section>

        {/* ── Weekly Progress ── */}
        <section id="weekly-progress" className="reveal-section">
          <div className="ref-container">
            <div className="ref-section-head">
              <div className="ref-section-kicker">Weekly progress</div>
              <h2>A quick weekly progress view.</h2>
              <p>See what changed, what improved, and what is ready to review.</p>
            </div>
            <WeeklyGraph />
          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="pricing" className="reveal-section">
          <div className="ref-container">
            <div className="ref-soft-panel ref-pricing-panel">
              <div className="ref-pricing-top">
                <div>
                  <div className="ref-section-kicker">Pricing</div>
                  <h2>Simple plans after the first score.</h2>
                  <p>Run the free check first. Upgrade when Beacon finds clear local AI visibility fixes worth reviewing.</p>
                </div>
                <div className="ref-price-badge">
                  <strong>$79+</strong>
                  <span>Monthly plans start after the audit</span>
                </div>
              </div>

              <div className="ref-billing-switch">
                <span className={billingCycle === 'monthly' ? 'active' : ''} onClick={() => setBillingCycle('monthly')}>Monthly</span>
                <span className={billingCycle === 'yearly' ? 'active' : ''} onClick={() => setBillingCycle('yearly')}>Yearly</span>
              </div>

              <div className="ref-pricing-card-grid">
                {[
                  {
                    name: 'Starter', price: billingCycle === 'monthly' ? '$79' : '$63', save: 'Weekly visibility score',
                    desc: 'For owners who want one city checked weekly and a clear first list of AI visibility fixes.',
                    features: ['1 business profile', '3 tracked service areas', 'Top 5 competitor tracking', 'Fix suggestions by email', 'Owner approval before changes'],
                    cta: 'Get started', featured: false
                  },
                  {
                    name: 'Growth', price: billingCycle === 'monthly' ? '$149' : '$119', save: 'Save 20% with annual billing',
                    desc: 'For growing service teams that need better coverage, dashboard history, and faster fix review.',
                    features: ['Twice-weekly AI visibility checks', '10 tracked service areas', 'Top 10 competitor tracking', 'Email + dashboard digest', 'Priority owner approval queue'],
                    cta: 'Get started', featured: true
                  },
                  {
                    name: 'Pro', price: billingCycle === 'monthly' ? '$299' : '$239', save: 'Custom reporting included',
                    desc: 'For multi-location teams that need custom cadence, reporting, and a managed visibility workflow.',
                    features: ['Custom check cadence', 'Multi-location service areas', 'Custom competitor list', 'Shared reporting channel', 'Managed review workflow'],
                    cta: 'Talk to Beacon', featured: false
                  },
                ].map((plan, i) => (
                  <article key={i} className={`ref-pricing-card-item ${plan.featured ? 'featured' : ''}`}>
                    {plan.featured && <span className="ref-pricing-card-badge">Popular</span>}
                    <h3>{plan.name}</h3>
                    <p>{plan.desc}</p>
                    <div className="ref-pricing-card-price">{plan.price} <small>/month</small></div>
                    <div className="ref-pricing-card-save">{plan.save}</div>
                    <ul className="ref-pricing-card-features">
                      {plan.features.map((f, j) => <li key={j}>{f}</li>)}
                    </ul>
                    <a className="ref-pricing-mini-button" href="#audit">{plan.cta}</a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── Final CTA & Footer Snap Wrapper ── */}
      <div className="ref-cta-footer-snap-wrapper">
        {/* ── Final CTA ── */}
        <section className="ref-final-cta reveal-section">
          <div className="ref-container">
            <div className="ref-soft-panel ref-cta-panel">
              <div className="ref-section-head center" style={{ marginBottom: 0 }}>
                <div className="ref-section-kicker">Check the score</div>
                <h2>See who AI recommends first.</h2>
                <p>Enter a business name or website. Get the score, competitors, and next fix.</p>
              </div>
              <form className={`ref-audit-form ${!isFocused ? 'is-search-pop' : ''}`} onSubmit={e => e.preventDefault()}>
                <label className="ref-input-wrap">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                    <path d="M10.8 18.6a7.8 7.8 0 1 1 5.5-2.3l4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter the business name or website"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </label>
                <button className="ref-button primary" type="submit">Check AI Visibility Score</button>
              </form>
              <p className="ref-trust-line">No signup. No credit card.</p>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="ref-footer">
          <div className="ref-container">
            <div className="ref-footer-row">
              <div className="ref-footer-logo-col">
                <a className="ref-brand" href="#">
                  <span className="ref-mark" />
                  <span>
                    <strong>Beacon</strong>
                  </span>
                </a>
              </div>
              {[
                { title: 'Product', links: ['Intake', 'Plan', 'Build', 'Diffs', 'Monitor', 'Pricing', 'Security'] },
                { title: 'Features', links: ['Asks', 'Agents', 'Customer Requests', 'Insights', 'Mobile', 'Integrations', 'Changelog'] },
                { title: 'Company', links: ['About', 'Customers', 'Careers', 'Blog', 'Method', 'Quality', 'Brand'] },
                { title: 'Resources', links: ['Switch', 'Download', 'Documentation', 'Developers', 'Status', 'Enterprise', 'Startups'] },
                { title: 'Connect', links: ['Contact us', 'Community', 'X (Twitter)', 'GitHub', 'YouTube'] },
              ].map((g, i) => (
                <nav key={i} className="ref-footer-group">
                  <h3>{g.title}</h3>
                  {g.links.map((l, j) => <a key={j} href="#">{l}</a>)}
                </nav>
              ))}
            </div>
            <div className="ref-footer-bottom">
              <div className="ref-footer-meta">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
                <a href="#">DPA</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   Live Report Component (animated score, competitors, fix)
   ══════════════════════════════════════════════════════════════ */
const LIVE_SCENARIOS = [
  {
    query: 'Austin electrician',
    score: 12, mentions: 2, total: 25, topMentions: 8,
    competitors: [
      { name: 'BrightSpark Electric', mentions: 8 },
      { name: 'Austin Panel Pros', mentions: 6 },
      { name: 'Hill Country Wiring', mentions: 5 },
    ],
    reasons: ['Competitors answer more local questions.', 'The website has one general service page.', 'The Google Business Profile Q&A is empty.'],
    fix: 'Add a local FAQ page for the main service and city.',
  },
  {
    query: 'Tampa roofing',
    score: 31, mentions: 7, total: 25, topMentions: 5,
    competitors: [
      { name: 'SunPeak Roofing', mentions: 5 },
      { name: 'Gulf Roof Pros', mentions: 4 },
      { name: 'Harbor Roof Care', mentions: 2 },
    ],
    reasons: ['No city-specific service pages found.', 'Review replies lack local keywords.', 'Google Profile hours are outdated.'],
    fix: 'Add a Tampa service area page with clear FAQ content.',
  },
  {
    query: 'Plano HVAC',
    score: 54, mentions: 14, total: 25, topMentions: 3,
    competitors: [
      { name: 'ProAir Systems', mentions: 3 },
      { name: 'North Texas Comfort', mentions: 2 },
      { name: 'CoolBreeze HVAC', mentions: 1 },
    ],
    reasons: ['Schema markup is missing service areas.', 'Q&A responses are too short.', 'Competitor FAQ pages are more detailed.'],
    fix: 'Expand Google Profile Q&A with 5 common questions.',
  },
]

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(value)
  const prevRef = useRef(value)

  useEffect(() => {
    const start = prevRef.current
    const end = value
    prevRef.current = value
    if (start === end) return
    const diff = end - start
    const steps = 30
    let step = 0
    const iv = setInterval(() => {
      step++
      const t = step / steps
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(start + diff * eased))
      if (step >= steps) clearInterval(iv)
    }, 20)
    return () => clearInterval(iv)
  }, [value])

  return <>{display}</>
}

function LiveReport() {
  const [sIdx, setSIdx] = useState(0)
  const [fading, setFading] = useState(false)
  const scenario = LIVE_SCENARIOS[sIdx]

  useEffect(() => {
    const iv = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setSIdx(p => (p + 1) % LIVE_SCENARIOS.length)
        setFading(false)
      }, 320)
    }, 4000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="ref-soft-panel ref-report" style={{ opacity: fading ? 0.35 : 1, transition: 'opacity 0.32s ease' }}>
      <div className="ref-report-main">
        <span className="ref-mini-tag" key={sIdx} style={{ animation: 'refFadeIn 0.4s ease both' }}>{scenario.query}</span>
        <div className="ref-big-score">
          <AnimatedNumber value={scenario.score} /> / 100
        </div>
        <p>Low visibility. AI answers mention competitors more often.</p>
        <div className="ref-metrics">
          <div className="ref-metric">
            <strong><AnimatedNumber value={scenario.mentions} /> / <AnimatedNumber value={scenario.total} /></strong>
            <span>Local searches with a mention</span>
          </div>
          <div className="ref-metric">
            <strong><AnimatedNumber value={scenario.topMentions} /></strong>
            <span>Top competitor mentions</span>
          </div>
        </div>
      </div>
      <div className="ref-report-detail">
        <div className="ref-list-block">
          <h3>Top competitors mentioned</h3>
          <div className="ref-competitors">
            {scenario.competitors.map((c, i) => (
              <div key={i} className="ref-competitor">
                <span key={`n-${sIdx}-${i}`} style={{ animation: 'refFadeIn 0.4s ease both' }}>{c.name}</span>
                <span><AnimatedNumber value={c.mentions} /> mentions</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ref-list-block">
          <h3>Why competitors appear first</h3>
          <ol className="ref-clean-list">
            {scenario.reasons.map((r, i) => (
              <li key={i}><b>{i + 1}</b><span key={`r-${sIdx}-${i}`} style={{ animation: 'refFadeIn 0.5s ease both' }}>{r}</span></li>
            ))}
          </ol>
        </div>
        <div className="ref-fix-box">
          <strong>First recommended fix</strong>
          <p key={`f-${sIdx}`} style={{ animation: 'refFadeIn 0.5s ease both' }}>{scenario.fix}</p>
        </div>
        <a className="ref-button primary" href="#audit">Check Score</a>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   Search Animation Component - cycles through business names
   ══════════════════════════════════════════════════════════════ */
const SEARCH_EXAMPLES = [
  'Austin electrician',
  'https://oaklineplumbing.com',
  'Tampa roofing',
  'Plano HVAC',
  'Mesa plumbing'
]

function SearchAnimation({ value, onChange, onFocus, onBlur }) {
  const [exampleIdx, setExampleIdx] = useState(0)
  const isEmptyRef = useRef(true)

  // local derived state
  const isEmpty = !value || value.length === 0
  const [focused, setFocused] = useState(false)

  useEffect(() => { isEmptyRef.current = isEmpty }, [isEmpty])

  useEffect(() => {
    if (!isEmpty || focused) return
    const interval = setInterval(() => {
      setExampleIdx(prev => (prev + 1) % SEARCH_EXAMPLES.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [isEmpty, focused])

  return (
    <input
      type="text"
      value={value || ''}
      placeholder={isEmpty ? SEARCH_EXAMPLES[exampleIdx] : 'Enter the business name or website'}
      onChange={e => onChange(e.target.value)}
      onFocus={e => { setFocused(true); if (onFocus) onFocus(e) }}
      onBlur={e => { setFocused(false); if (onBlur) onBlur(e) }}
      className="search-input-animated"
    />
  )
}

/* ══════════════════════════════════════════════════════════════
   Fix Queue Animation — top item scales up, then slides RIGHT
   out; new item slides UP from bottom. Stable height, no shake.
   ══════════════════════════════════════════════════════════════ */
const QUEUE_ITEMS = [
  { id: 1, title: 'Local FAQ is missing', desc: 'Add answers for common service questions.' },
  { id: 2, title: 'Service city page is thin', desc: 'Make the main service area clear.' },
  { id: 3, title: 'Business profile Q&A is empty', desc: 'Answer what customers ask before calling.' },
  { id: 4, title: 'Google review reply missing', desc: 'Reply to 5-star reviews with local keywords.' },
  { id: 5, title: 'Schema markup incomplete', desc: 'Add service area and business type schema.' },
  { id: 6, title: 'Hours not synced', desc: 'Update holiday and weekend hours on the profile.' },
]
const TOTAL_QUEUE_ITEMS = QUEUE_ITEMS.length

function FixQueueAnimation() {
  // phase: idle | fixing | removing | shifting
  const [phase, setPhase] = useState('idle')
  const [startIdx, setStartIdx] = useState(0) // index of first visible item in QUEUE_ITEMS

  // We render 4 items to animate the shift from below seamlessly
  const visibleItems = [0, 1, 2, 3].map(offset => {
    const item = QUEUE_ITEMS[(startIdx + offset) % TOTAL_QUEUE_ITEMS]
    return { item, offset }
  })

  useEffect(() => {
    const iv = setInterval(() => {
      // 1. Idle -> Fixing (top item scales up & status pulses)
      setPhase('fixing')

      // 2. Fixing -> Removing (top item slides right & fades out)
      setTimeout(() => {
        setPhase('removing')

        // 3. Removing -> Shifting (other items slide up, incoming slides up from below)
        setTimeout(() => {
          setPhase('shifting')

          // 4. Shifting -> Reset to Idle (instantly shifts indices)
          setTimeout(() => {
            setStartIdx(prev => (prev + 1) % TOTAL_QUEUE_ITEMS)
            setPhase('idle')
          }, 1000)
        }, 800)
      }, 1600)
    }, 5000)

    return () => clearInterval(iv)
  }, [])

  return (
    <div className="ref-soft-panel ref-issue-queue">
      <div className="ref-queue-label">
        <strong>Fix queue</strong>
        <span>One fix at a time</span>
      </div>
      <div className="ref-queue-stack" style={{ position: 'relative', height: '274px', overflow: 'hidden' }}>
        {visibleItems.map(({ item, offset }) => {
          let transform = 'translateX(0) translateY(0)'
          let opacity = 1
          let statusText = 'Waiting'
          let statusClass = 'waiting'
          let isGlow = false

          if (offset === 0) {
            statusText = 'Ready'
            statusClass = 'ready'

            if (phase === 'idle') {
              transform = 'translateY(0)'
            } else if (phase === 'fixing') {
              transform = 'translateY(0)'
              isGlow = true
              statusText = 'Fixing...'
              statusClass = 'fixing'
            } else if (phase === 'removing' || phase === 'shifting') {
              transform = 'translateY(0) translateX(112%)'
              opacity = 0
              statusText = 'Fixed!'
              statusClass = 'ready'
            }
          } else if (offset === 1) {
            statusText = 'Next'
            statusClass = 'next'

            if (phase === 'idle' || phase === 'fixing' || phase === 'removing') {
              transform = 'translateY(90px)'
            } else if (phase === 'shifting') {
              transform = 'translateY(0)'
              statusText = 'Ready'
              statusClass = 'ready'
            }
          } else if (offset === 2) {
            statusText = 'Waiting'
            statusClass = 'waiting'

            if (phase === 'idle' || phase === 'fixing' || phase === 'removing') {
              transform = 'translateY(180px)'
            } else if (phase === 'shifting') {
              transform = 'translateY(90px)'
              statusText = 'Next'
              statusClass = 'next'
            }
          } else if (offset === 3) {
            statusText = 'Waiting'
            statusClass = 'waiting'
            opacity = 0

            if (phase === 'idle' || phase === 'fixing' || phase === 'removing') {
              transform = 'translateY(270px)'
            } else if (phase === 'shifting') {
              transform = 'translateY(180px)'
              opacity = 1
            }
          }

          const transition = 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease, border-color 0.5s ease, box-shadow 0.5s ease'

          return (
            <article
              key={`${item.id}-${offset === 3 && phase !== 'shifting' ? 'inc' : 'vis'}`}
              className={`ref-queue-item ${isGlow ? 'is-active' : ''}`}
              style={{
                transform,
                opacity,
                transition,
                position: 'absolute',
                left: 0,
                right: 0,
                height: '82px',
                boxSizing: 'border-box'
              }}
            >
              <span className="ref-queue-icon">{String(offset + 1).padStart(2, '0')}</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
              </div>
              <span className={`ref-queue-status ${statusClass}`}>
                {statusText}
              </span>
            </article>
          )
        })}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   Weekly Progress Graph with Grid - animated values
   ══════════════════════════════════════════════════════════════ */
const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const DATA_SETS = [
  [15, 30, 19, 22, 32, 42, 16],
  [25, 18, 35, 28, 45, 30, 38],
  [12, 28, 20, 38, 25, 48, 22],
  [30, 42, 25, 30, 38, 32, 45]
]
const CHART = { w: 800, h: 190, padX: 0, baseY: 145, plotH: 70 }

function WeeklyGraph() {
  const ref = useRef(null)
  const pathRef = useRef(null)
  const rafRef = useRef(null)
  const cycleRef = useRef({ startTs: 0, setIdx: 0 })

  const [visible, setVisible] = useState(false)
  const [setIdx, setSetIdx] = useState(0)
  const [displayData, setDisplayData] = useState(DATA_SETS[0])
  const [phase, setPhase] = useState('rolling') // 'rolling' | 'fading-out' | 'morphing' | 'fading-in'
  const [pointsVisible, setPointsVisible] = useState(true)
  const [progress, setProgress] = useState(0) // 0 to 1
  const [pointLens, setPointLens] = useState([])
  const [totalLength, setTotalLength] = useState(0)

  const data = displayData

  const points = useMemo(() => {
    return data.map((v, i) => {
      const step = (CHART.w - CHART.padX * 2) / (WEEK_DAYS.length - 1)
      const x = CHART.padX + i * step
      const y = CHART.baseY - (v / 50) * CHART.plotH
      return { x, y, v }
    })
  }, [data])

  const smoothPath = (pts) => {
    if (pts.length < 2) return ''
    let d = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)]
      const p1 = pts[i]
      const p2 = pts[i + 1]
      const p3 = pts[Math.min(pts.length - 1, i + 2)]
      const cp1x = p1.x + (p2.x - p0.x) / 6
      const cp1y = p1.y + (p2.y - p0.y) / 6
      const cp2x = p2.x - (p3.x - p1.x) / 6
      const cp2y = p2.y - (p3.y - p1.y) / 6
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
    }
    return d
  }

  const pathD = smoothPath(points)
  const areaD = `${pathD} L ${points[points.length - 1].x} ${CHART.baseY} L ${points[0].x} ${CHART.baseY} Z`

  const isMorphing = phase === 'morphing'

  useEffect(() => {
    if (isMorphing) return
    if (!pathRef.current) return
    try {
      const total = pathRef.current.getTotalLength()
      setTotalLength(total)
      const lens = points.map((pt) => {
        let bestLen = 0
        let bestDist = Infinity
        for (let i = 0; i <= 180; i++) {
          const len = (i / 180) * total
          const p = pathRef.current.getPointAtLength(len)
          const dist = (p.x - pt.x) ** 2 + (p.y - pt.y) ** 2
          if (dist < bestDist) {
            bestDist = dist
            bestLen = len
          }
        }
        return bestLen
      })
      setPointLens(lens)
    } catch (e) {
      // Ignore initial render errors
    }
  }, [pathD, points, isMorphing])

  const dot = useMemo(() => {
    if (pathRef.current && totalLength > 0 && phase === 'rolling') {
      try {
        const at = pathRef.current.getPointAtLength(progress * totalLength)
        return { x: at.x, y: at.y }
      } catch (e) {
        return points[0]
      }
    }
    return points[0]
  }, [progress, totalLength, phase, points])

  const pointGlowFactors = useMemo(() => {
    if (phase !== 'rolling' || totalLength === 0 || pointLens.length === 0) {
      return new Array(points.length).fill(0)
    }
    const currentDist = progress * totalLength
    const range = 35
    return pointLens.map((len) => {
      const dist = Math.abs(currentDist - len)
      if (dist < range) {
        const factor = 1 - dist / range
        return Math.sin(factor * Math.PI / 2)
      }
      return 0
    })
  }, [progress, totalLength, pointLens, phase, points.length])

  const dotOpacity = useMemo(() => {
    if (phase !== 'rolling') return 0
    if (progress < 0.08) return progress / 0.08
    if (progress > 0.94) return Math.max(0, (0.98 - progress) / 0.04)
    return 1
  }, [progress, phase])

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        obs.disconnect()
      }
    }, { threshold: 0.25 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return

    let startTs = performance.now()
    let activePhase = 'rolling'

    const ROLLING_DURATION = 8000
    const FADE_OUT_DURATION = 400
    const MORPH_DURATION = 1400
    const FADE_IN_DURATION = 1000

    cycleRef.current = { startTs, setIdx: 0 }

    const tick = (now) => {
      const cycle = cycleRef.current
      const elapsed = now - cycle.startTs

      if (activePhase === 'rolling') {
        const p = Math.min(1, elapsed / ROLLING_DURATION)
        setProgress(p)
        if (p >= 1) {
          activePhase = 'fading-out'
          cycle.startTs = now
          setPhase('fading-out')
          setPointsVisible(false)
          setProgress(1)
        }
      } else if (activePhase === 'fading-out') {
        if (elapsed >= FADE_OUT_DURATION) {
          activePhase = 'morphing'
          cycle.startTs = now
          setPhase('morphing')
        }
      } else if (activePhase === 'morphing') {
        const p = Math.min(1, elapsed / MORPH_DURATION)
        const eased = 1 - Math.pow(1 - p, 3)

        const fromSet = DATA_SETS[cycle.setIdx]
        const nextSetIdx = (cycle.setIdx + 1) % DATA_SETS.length
        const toSet = DATA_SETS[nextSetIdx]

        const interpolated = fromSet.map((v, i) => v + (toSet[i] - v) * eased)
        setDisplayData(interpolated)

        if (p >= 1) {
          cycle.setIdx = nextSetIdx
          setSetIdx(nextSetIdx)
          setDisplayData(toSet)
          activePhase = 'fading-in'
          cycle.startTs = now
          setPhase('fading-in')
          setPointsVisible(true)
        }
      } else if (activePhase === 'fading-in') {
        if (elapsed >= FADE_IN_DURATION) {
          activePhase = 'rolling'
          cycle.startTs = now
          setPhase('rolling')
          setProgress(0)
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [visible])

  return (
    <div ref={ref} className={`ref-soft-panel ref-progress-panel ${visible ? 'is-visible' : ''}`}>
      <div className="ref-progress-watermark" aria-hidden>PROGRESS</div>
      <div className="ref-progress-topline">
        <div>
          <strong>Visibility through the week</strong>
          <span>Scores move as fixes go live and AI answers change.</span>
          <div className="ref-progress-mini-stats">
            <span><b>1</b><small>Fixes shipped</small></span>
            <span><b>27</b><small>New mentions</small></span>
            <span><b>8</b><small>Fixes ready</small></span>
          </div>
        </div>
        <div className="ref-progress-score">{`${Math.round(Math.min(...data))} → ${Math.round(Math.max(...data))}`}</div>
      </div>

      <div className={`ref-progress-graph ${isMorphing ? 'is-morphing' : ''}`}>
        <svg viewBox="0 0 800 190">
          <defs>
            <linearGradient id="scoreArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <filter id="dotGlow" x="-120%" y="-120%" width="340%" height="340%">
              <feGaussianBlur stdDeviation="3.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path className="ref-graph-area" d={areaD} fill="url(#scoreArea)" />
          <path ref={pathRef} className="ref-graph-line" d={pathD} />

          {points.map((p, i) => {
            const glow = pointGlowFactors[i] || 0
            const delay = pointsVisible ? `${(i * 120) % 500}ms` : '0ms'
            return (
              <g
                key={i}
                style={{
                  opacity: pointsVisible ? 1 : 0,
                  transform: pointsVisible ? 'scale(1)' : 'scale(0.8)',
                  transformOrigin: `${p.x}px ${p.y}px`,
                  transition: 'opacity 400ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transitionDelay: delay,
                }}
              >
                {glow > 0 && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={3 + 8 * glow}
                    fill="rgba(49, 131, 122, 0.4)"
                    opacity={glow * 0.8}
                    filter="url(#dotGlow)"
                  />
                )}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={3.5}
                  fill={glow > 0.2 ? '#ffffff' : 'rgba(255, 255, 255, 0.4)'}
                  style={{ transition: 'fill 0.2s ease' }}
                />
                <text
                  className={`ref-graph-value ${glow > 0.2 ? 'is-glow' : ''}`}
                  x={p.x}
                  y={p.y - 20 - 10 * glow}
                  textAnchor="middle"
                  style={{
                    transform: `scale(${1 + 0.25 * glow})`,
                    transformOrigin: `${p.x}px ${p.y - 20}px`,
                    transition: 'transform 0.1s ease'
                  }}
                >
                  {Math.round(p.v)}
                </text>
              </g>
            )
          })}

          <circle
            className="ref-graph-slider"
            cx={dot.x}
            cy={dot.y}
            r={5.5}
            fill="#ffffff"
            stroke="var(--ref-accent)"
            strokeWidth="2.5"
            filter="url(#dotGlow)"
            style={{
              opacity: dotOpacity,
              transition: 'opacity 0.15s ease'
            }}
          />
        </svg>

        <div className="ref-graph-days">
          {WEEK_DAYS.map((d) => <span key={d}>{d}</span>)}
        </div>
      </div>

      <div className="ref-progress-stats" style={{ display: 'none' }}>
        <div className="ref-progress-stat"><strong>1</strong><span>Fixes shipped</span></div>
        <div className="ref-progress-stat"><strong>27</strong><span>New mentions</span></div>
        <div className="ref-progress-stat"><strong>8</strong><span>Fixes ready</span></div>
      </div>
    </div>
  )
}

