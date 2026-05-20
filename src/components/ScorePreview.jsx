import { useState, useEffect, useRef } from 'react';

import { CYCLE_DURATION_MS, ANIMATION_DELAY_MS, SCORE_EASING_STEPS, BAR_ANIMATION_DELAY_MS } from './constants';

const SCENARIOS = [
  {
    query: 'Tampa roofing',
    score: 42,
    status: 'Improving visibility. More local answers include the business after fixes ship.',
    competitors: [
      { name: 'Harbor Roof Care', score: 42, self: true },
      { name: 'SunPeak Roofing', score: 58, self: false },
      { name: 'Gulf Roof Pros', score: 37, self: false },
    ]
  },
  {
    query: 'Austin electrician',
    score: 28,
    status: 'AI answers rarely mention this business for nearby service searches.',
    competitors: [
      { name: 'BrightSpark Electric', score: 28, self: true },
      { name: 'Austin Panel Pros', score: 72, self: false },
      { name: 'Hill Country Wiring', score: 51, self: false },
    ]
  },
  {
    query: 'Plano HVAC',
    score: 61,
    status: 'Strong local presence. AI engines cite this business in 3 of 5 top queries.',
    competitors: [
      { name: 'CoolBreeze HVAC', score: 61, self: true },
      { name: 'ProAir Systems', score: 45, self: false },
      { name: 'North Texas Comfort', score: 38, self: false },
    ]
  },
  {
    query: 'Dallas plumbing',
    score: 15,
    status: 'Very low visibility. Competitors dominate all major AI engine responses.',
    competitors: [
      { name: 'FlowRight Plumbing', score: 15, self: true },
      { name: 'DFW Drain Masters', score: 81, self: false },
      { name: 'Lone Star Pipes', score: 54, self: false },
    ]
  },
]

export default function ScorePreview() {
  const [idx, setIdx] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [displayScore, setDisplayScore] = useState(SCENARIOS[0].score)
  const [barWidths, setBarWidths] = useState(SCENARIOS[0].competitors.map(() => 0))
  const timerRef = useRef(null)
  const displayScoreRef = useRef(SCENARIOS[0].score)

  const scenario = SCENARIOS[idx]
  const circumference = 2 * Math.PI * 44
  const offset = circumference - (displayScore / 100) * circumference

  // Cycle scenarios using constants
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIdx(prev => (prev + 1) % SCENARIOS.length);
        setAnimating(false);
      }, ANIMATION_DELAY_MS);
    }, CYCLE_DURATION_MS);
    return () => clearInterval(timerRef.current);
  }, []);

  // Animate score counter with easing
  useEffect(() => {
    const target = scenario.score
    const start = displayScoreRef.current
    const diff = target - start
    if (diff === 0) return
    displayScoreRef.current = target
    const steps = SCORE_EASING_STEPS
    let step = 0
    const interval = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayScore(Math.round(start + diff * eased))
      if (step >= steps) clearInterval(interval)
    }, 15)
    return () => clearInterval(interval)
  }, [scenario.score])

  // Animate bars on scenario change
  useEffect(() => {
    const competitors = scenario.competitors
    const resetTimer = setTimeout(() => {
      setBarWidths(competitors.map(() => 0))
    }, 0)
    const fillTimer = setTimeout(() => {
      setBarWidths(competitors.map(c => c.score))
    }, BAR_ANIMATION_DELAY_MS)
    return () => {
      clearTimeout(resetTimer)
      clearTimeout(fillTimer)
    }
  }, [scenario.competitors])

  return (
    <div
      className={`ref-soft-panel score-preview ${animating ? 'fading' : ''}`}
      style={{ animationDelay: '200ms' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--ref-text-2)' }}>Live local check</span>
        <span className="query-tag" key={idx} style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, padding: '3px 10px',
          background: 'var(--ref-panel-2, var(--bg-3))',
          borderRadius: 'var(--radius-full)', color: 'var(--ref-text-3)',
          animation: 'fadeTextIn 0.4s ease forwards'
        }}>
          {scenario.query}
        </span>
      </div>

      {/* Score Ring */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        <div className="score-ring" style={{ width: 84, height: 84, flexShrink: 0 }}>
          <svg width="84" height="84" viewBox="0 0 96 96">
            <circle className="score-track" cx="48" cy="48" r="44" />
            <circle
              className="score-fill"
              cx="48" cy="48" r="44"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(.16,1,.3,1)' }}
            />
          </svg>
          <span className="score-number" style={{ fontSize: 24, transition: 'all 0.3s ease' }}>{displayScore}</span>
        </div>
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 4 }}>AI Visibility Score</h3>
          <p key={idx} className="fade-text" style={{ fontSize: 12, color: 'var(--ref-text-2)', lineHeight: 1.5 }}>
            {scenario.status}
          </p>
        </div>
      </div>

      {/* AI Mention Rate */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ref-text-2)' }}>AI mention rate</span>
        <span style={{ fontSize: 11, color: 'var(--ref-text-3)' }}>Local market</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {scenario.competitors.map((c, i) => (
          <div key={`${idx}-${i}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span className="fade-text" style={{ fontSize: 12, fontWeight: c.self ? 600 : 400, color: c.self ? 'var(--ref-fg)' : 'var(--ref-text-2)', transition: 'all 0.4s ease' }}>
                {c.name}
              </span>
              <span className="fade-text" style={{
                fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 600,
                color: c.self ? 'var(--ref-accent)' : 'var(--ref-text-3)',
                transition: 'all 0.4s ease'
              }}>
                {barWidths[i] || 0}%
              </span>
            </div>
            <div className="progress-bar">
              <div
                className={`progress-fill ${c.self ? '' : 'neutral'}`}
                style={{
                  width: `${barWidths[i] || 0}%`,
                  background: c.self ? 'var(--ref-accent)' : 'var(--bg-4)',
                  transition: 'width 0.6s cubic-bezier(.16,1,.3,1)'
                }}
              />
            </div>
            {i === 0 && <div style={{ fontSize: 11, color: 'var(--ref-text-3)', marginTop: 3 }}>Business checked</div>}
            {i === 1 && <div style={{ fontSize: 11, color: 'var(--ref-text-3)', marginTop: 3 }}>Top competitor</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

  // No external props currently; component is self‑contained.
