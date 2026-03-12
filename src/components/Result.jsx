import React, { useMemo, useEffect, useRef } from 'react'

const CATEGORY_ORDER = ['Revenue', 'Brand Value', 'Margins', 'Market Positioning', 'Productivity', 'Employee Satisfaction']

// ── Radar / Spider Chart ──────────────────────────────────────────────────────
function RadarChart({ categories }) {
  const size = 560
  const cx = size / 2
  const cy = size / 2
  const maxR = 160
  const rings = [30, 70, 100] // reference rings (values)
  const n = categories.length

  // angle for each axis: start at top (-π/2)
  const angle = (i) => -Math.PI / 2 + (2 * Math.PI * i) / n

  // point on a ring at given value (0-100)
  const pt = (i, val) => {
    const r = (val / 100) * maxR
    return {
      x: cx + r * Math.cos(angle(i)),
      y: cy + r * Math.sin(angle(i)),
    }
  }

  // polygon points for the data shape
  const polyPoints = categories.map((cat, i) => pt(i, cat.pct))
  const polyStr = polyPoints.map(p => `${p.x},${p.y}`).join(' ')

  // ring circles
  const ringPaths = rings.map(val => {
    const pts = categories.map((_, i) => pt(i, val))
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
  })

  // label positions (outside maxR)
  const labelR = maxR + 40
  const labels = categories.map((cat, i) => {
    const a = angle(i)
    const x = cx + labelR * Math.cos(a)
    const y = cy + labelR * Math.sin(a)
    const anchor = Math.cos(a) > 0.1 ? 'start' : Math.cos(a) < -0.1 ? 'end' : 'middle'
    return { name: cat.name, x, y, anchor }
  })

  // overall average
  const overallPct = Math.round(categories.reduce((s, c) => s + c.pct, 0) / categories.length)

  return (
    <svg width={size} height={size} viewBox={`-60 -60 ${size + 120} ${size + 120}`} style={{ width: '100%', height: 'auto' }}>
      {/* Outer reference circle */}
      <circle cx={cx} cy={cy} r={maxR} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

      {/* Inner ring lines (spiderweb) */}
      {ringPaths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      ))}

      {/* Axis lines from center to edge */}
      {categories.map((_, i) => {
        const edge = pt(i, 100)
        return <line key={i} x1={cx} y1={cy} x2={edge.x} y2={edge.y} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      })}

      {/* Ring value labels (70, 100) */}
      {[70, 100].map(val => {
        const p = pt(0, val) // label at top axis
        return (
          <text key={val} x={p.x + 4} y={p.y + 4} fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="Poppins,Inter,sans-serif">{val}</text>
        )
      })}

      {/* Filled data polygon */}
      <polygon points={polyStr} fill="rgba(180,170,140,0.35)" stroke="rgba(220,210,180,0.9)" strokeWidth="2" />

      {/* Dots at each data point */}
      {polyPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={5} fill="#d4c98a" stroke="#fff" strokeWidth="1.5" />
      ))}

      {/* Centre score */}
      <text x={cx} y={cy + 6} textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.7)" fontSize="22" fontWeight="700" fontFamily="Poppins,Inter,sans-serif">{overallPct}</text>

      {/* Category labels */}
      {labels.map((l, i) => {
        const words = l.name.split(' ')
        return (
          <g key={i}>
            {words.map((w, wi) => (
              <text
                key={wi}
                x={l.x}
                y={l.y + (wi - (words.length - 1) / 2) * 16}
                textAnchor={l.anchor}
                dominantBaseline="middle"
                fill="#ffffff"
                fontSize="13"
                fontWeight="600"
                fontFamily="Poppins,Inter,sans-serif"
              >{w}</text>
            ))}
          </g>
        )
      })}
    </svg>
  )
}

function RadarSection({ categories }) {
  const strongest = [...categories].sort((a, b) => b.pct - a.pct)[0]
  const weakest = [...categories].sort((a, b) => a.pct - b.pct)[0]

  return (
    <div className="radar-section">
      <h2 className="radar-title">Current Marketing Snapshot</h2>
      <div className="radar-chart-wrap">
        <RadarChart categories={categories} />
      </div>
      <div className="radar-insights">
        <p className="radar-insight-text">
          Your greatest marketing strength is in{' '}
          <span className="radar-highlight">{strongest.name}</span>! Double down on your strength and keep the momentum going!
        </p>
        <p className="radar-insight-text">
          One of the key areas you might want to focus on in the next 90 days is{' '}
          <span className="radar-highlight">{weakest.name}</span>. Like a leaky pipe, it's lowering the ROI of your marketing activities and affecting your sales performance.
        </p>
      </div>
    </div>
  )
}

const CATEGORY_DESCRIPTIONS = {
  'Revenue': {
    'Critical': 'Revenue is the lifeblood of any organization, and having weak Sales and Marketing systems mean there will be months where the tension is high, and if prolonged, will even eat into your cash reserves.',
    'Need Refinement': "Looks like you've got some Sales and Marketing systems in place. Because of that, you get to have some breathing space knowing there will be incoming cashflow.",
    'Great Job!': 'Wow! Looks like you really got your Sales and Marketing systems in place! Great job! As a result of this, you get to enjoy a steady income stream, enabling you to expand your business aggressively.',
  },
  'Brand Value': {
    'Critical': "There are significant challenges affecting the perception and reputation of the brand. This may involve issues such as negative publicity, customer dissatisfaction, or outdated branding strategies. Immediate actions are necessary to protect and rebuild the brand's value.",
    'Need Refinement': "While your company brand is generally recognized, there are areas where improvements can be made to enhance its overall value. This may involve refining messaging, investing in marketing strategies, or addressing specific customer feedback. Strategic adjustments are needed to strengthen the brand's position in the market.",
    'Great Job!': "👏🏻👏🏻👏🏻 Your company is a superstar! And it's reflected in your strong and positively perceived brand. Your company has successfully built a favorable reputation, and customers associate the brand with quality and trust. Continuous brand management and innovative marketing efforts are essential to maintain and enhance brand value. Keep it up!",
  },
  'Margins': {
    'Critical': 'Ouch! Significant challenges are impacting the profitability of the business. This may involve issues such as high production costs, inefficient operations, or pricing strategies that are not sustainable. Urgent actions are required to identify and address these issues to improve overall profitability.',
    'Need Refinement': 'While your business is profitable, there are areas where improvements can be made to enhance profit margins. This may involve cost-cutting measures, process optimization, or strategic pricing adjustments. Continuous monitoring and adaptation to market conditions are essential for sustained profitability.',
    'Great Job!': 'Alright!!! You really have a good strong grip on your finances! And it reflects in your effective cost management and profitable operations. Your business is achieving healthy profit margins; chances are, strategies are in place to sustain or improve these margins over time. Continuous efforts to optimize processes and adapt to market changes will contribute to ongoing financial success.',
  },
  'Market Positioning': {
    'Critical': "There are significant challenges affecting your company's competitive position in the market. This is usually a combination of a few factors like a lack of differentiation, outdated or non-existent marketing strategies, and failure to adapt to industry trends. Urgent actions are needed to elevate yourself out of the price wars and into a more competitive position in your market.",
    'Need Refinement': "While your company is competitive, there are areas where improvements can be made to strengthen your market position. This may involve refining marketing strategies, identifying new growth opportunities, or enhancing product and service offerings. You're almost there, and some strategic adjustments are what you need to enhance competitiveness.",
    'Great Job!': 'Outstanding! Looks like you have a strong and favorable position in the market. Your company has effectively differentiated itself, and your customers perceive your offerings as valuable and unique. Continuous market analysis and innovation will further solidify your market position and project your company as the Market Leader.',
  },
  'Productivity': {
    'Critical': 'It seems like significant issues are hindering the efficient utilization of resources, processes, or workforce. This is often reflected in delays, inefficiencies, and increased costs. Urgent intervention and restructuring are required to prevent further negative impacts on overall business performance.',
    'Need Refinement': "Good news! While productivity is functional, there are identifiable areas where improvements can be made. Think of what you have now as a pipe with a few leaks here and there. If we can patch up those \"leaks\", it will naturally contribute to more efficient and effective business operations.",
    'Great Job!': 'High five! You have got a well-optimized and efficient business operation! Processes are streamlined, resources are effectively utilized, and the workforce is productive. All that\'s needed right now is to stay on track and continuous refinement to improve productivity levels further.',
  },
  'Employee Satisfaction': {
    'Critical': 'There are severe issues impacting the well-being and morale of the workforce. This could lead to high turnover, decreased productivity, and a negative workplace culture. Immediate actions are needed to address these issues and create a more positive work environment.',
    'Need Refinement': 'While your workforce is generally content, there are areas where improvements can enhance overall job satisfaction. This may involve addressing specific concerns raised by employees, providing additional training opportunities, or refining communication channels.',
    'Great Job!': '🎉 Achieving a "Great Job" ranking in Employee Satisfaction reflects a positive and engaged workforce. Your employees are content with their roles, the work environment, and the company culture. Continuous efforts to support professional development and maintain open communication will contribute to sustained high levels of employee satisfaction.',
  },
}

function getColor(pct) {
  if (pct >= 70) return '#2ec4b6' // teal - Great Job!
  if (pct >= 40) return '#E6C34A' // gold - Need Refinement
  return '#e63946'                // red  - Critical
}

function getBand(pct) {
  if (pct >= 70) return 'Great Job!'
  if (pct >= 40) return 'Need Refinement'
  return 'Critical'
}

function DonutChart({ categories }) {
  // All drawing done in a single SVG — no canvas/offset mismatch
  const size = 500
  const cx = size / 2
  const cy = size / 2
  const outerR = 140
  const innerR = 78
  const gap = 0.04

  const total = categories.length
  const sliceAngle = (2 * Math.PI) / total
  const overallPct = total ? Math.round(categories.reduce((s, c) => s + c.pct, 0) / total) : 0

  // Helper: point on circle
  const pt = (r, angle) => ({
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  })

  // Arc path for a donut segment
  const segPath = (i) => {
    const start = -Math.PI / 2 + i * sliceAngle + gap / 2
    const end = start + sliceAngle - gap
    const o1 = pt(outerR, start)
    const o2 = pt(outerR, end)
    const i1 = pt(innerR, end)
    const i2 = pt(innerR, start)
    const large = sliceAngle - gap > Math.PI ? 1 : 0
    return `M ${o1.x} ${o1.y} A ${outerR} ${outerR} 0 ${large} 1 ${o2.x} ${o2.y} L ${i1.x} ${i1.y} A ${innerR} ${innerR} 0 ${large} 0 ${i2.x} ${i2.y} Z`
  }

  // Label layout — push labels further out and use elbow lines
  const labelLayout = categories.map((cat, i) => {
    const mid = -Math.PI / 2 + i * sliceAngle + sliceAngle / 2

    // segment pct label position
    const pctR = (outerR + innerR) / 2
    const pctPos = pt(pctR, mid)

    // Line from just outside ring to elbow
    const lineStart = pt(outerR + 6, mid)
    const lineEnd = pt(outerR + 36, mid)

    // Elbow + text anchor
    const textR = outerR + 58
    const rawTx = cx + textR * Math.cos(mid)
    const rawTy = cy + textR * Math.sin(mid)
    const anchor = Math.cos(mid) > 0.1 ? 'start' : Math.cos(mid) < -0.1 ? 'end' : 'middle'

    return { cat, mid, pctPos, lineStart, lineEnd, tx: rawTx, ty: rawTy, anchor }
  })

  return (
    <div className="donut-wrap">
      <svg width={size} height={size} viewBox={`-80 -20 ${size + 160} ${size + 40}`} style={{ width: '100%', height: 'auto' }}>
        {/* Segments */}
        {categories.map((cat, i) => (
          <path key={i} d={segPath(i)} fill={getColor(cat.pct)} />
        ))}

        {/* Inner dark circle */}
        <circle cx={cx} cy={cy} r={innerR} fill="#1a1a1a" />

        {/* Centre text */}
        <text x={cx} y={cy - 16} textAnchor="middle" fill="#E6C34A" fontSize="11" fontWeight="700" fontFamily="Poppins,Inter,sans-serif">Your Overall Score</text>
        <text x={cx} y={cy + 22} textAnchor="middle" fill="#e63946" fontSize="34" fontWeight="800" fontFamily="Poppins,Inter,sans-serif">{overallPct}%</text>

        {/* Per-segment % labels */}
        {labelLayout.map(({ cat, pctPos }, i) => (
          <text key={i} x={pctPos.x} y={pctPos.y} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="Poppins,Inter,sans-serif">
            {cat.pct}%
          </text>
        ))}

        {/* Lines + category name labels */}
        {labelLayout.map(({ cat, lineStart, lineEnd, tx, ty, anchor }, i) => {
          const words = cat.name.split(' ')
          return (
            <g key={i}>
              <line x1={lineStart.x} y1={lineStart.y} x2={lineEnd.x} y2={lineEnd.y} stroke="#888" strokeWidth="1" />
              <line x1={lineEnd.x} y1={lineEnd.y} x2={tx} y2={lineEnd.y} stroke="#888" strokeWidth="1" />
              {words.map((w, wi) => (
                <text
                  key={wi}
                  x={tx}
                  y={lineEnd.y + (wi - (words.length - 1) / 2) * 15}
                  textAnchor={anchor}
                  fill="#ddd"
                  fontSize="12"
                  fontFamily="Poppins,Inter,sans-serif"
                >{w}</text>
              ))}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default function Result({ questions, answers, profile, onRestart }) {
  const { categories, overallPct, perQuestion } = useMemo(() => {
    const byCat = {}
    CATEGORY_ORDER.forEach(c => { byCat[c] = { earned: 0, possible: 0, items: [] } })

    questions.forEach((q, i) => {
      const a = answers[i]
      const label = typeof a === 'string' ? a : a?.label
      const sc = typeof a === 'string' ? 0 : (a?.score ?? 0)
      const max = q.options.reduce((m, opt) => Math.max(m, typeof opt === 'string' ? 0 : (opt.score ?? 0)), 0)
      const cat = q.category
      if (!byCat[cat]) byCat[cat] = { earned: 0, possible: 0, items: [] }
      byCat[cat].earned += sc
      byCat[cat].possible += max
      byCat[cat].items.push({ question: q.question, answer: label ?? 'No answer', score: sc, max })
    })

    const catList = CATEGORY_ORDER.map(name => {
      const d = byCat[name] || { earned: 0, possible: 1 }
      const pct = d.possible > 0 ? Math.round((d.earned / d.possible) * 100) : 0
      return { name, pct, earned: d.earned, possible: d.possible, items: d.items || [] }
    })

    const totalEarned = catList.reduce((s, c) => s + c.earned, 0)
    const totalPossible = catList.reduce((s, c) => s + c.possible, 0)
    const ov = totalPossible > 0 ? Math.round((totalEarned / totalPossible) * 100) : 0

    const perQ = questions.map((q, i) => {
      const a = answers[i]
      const label = typeof a === 'string' ? a : a?.label
      const sc = typeof a === 'string' ? 0 : (a?.score ?? 0)
      const max = q.options.reduce((m, opt) => Math.max(m, typeof opt === 'string' ? 0 : (opt.score ?? 0)), 0)
      return { question: q.question, category: q.category, answer: label ?? 'No answer', score: sc, max }
    })

    return { categories: catList, overallPct: ov, perQuestion: perQ }
  }, [questions, answers])

  const firstName = profile?.firstName || profile?.name || 'there'
  const email = profile?.email || ''

  return (
    <div className="result-page">
      {/* Hero row */}
      <div className="result-hero-row">
        {/* Left */}
        <div className="result-left">
          <div className="result-greeting">🎉 {firstName}! 🎊</div>
          <h2 className="result-headline">Congrats on completing the <strong>Future-Ready Business Scorecard</strong>!</h2>
          <p className="result-body">Scroll down to deep dive into the different key areas, as we highlight the areas of your greatest growth.</p>
          {email && (
            <p className="result-body">We've just sent the full report to <strong>{email}</strong>.</p>
          )}
          <div className="result-legend">
            <div className="legend-item"><span className="legend-dot" style={{ background: '#e63946' }} />Critical</div>
            <div className="legend-item"><span className="legend-dot" style={{ background: '#E6C34A' }} />Need Refinement</div>
            <div className="legend-item"><span className="legend-dot" style={{ background: '#2ec4b6' }} />Great Job!</div>
          </div>
          <div style={{ marginTop: 24 }}>
            <button className="btn primary" onClick={onRestart}>Retake Scorecard</button>
          </div>
        </div>

        {/* Right: Donut chart */}
        <div className="result-right">
          <DonutChart categories={categories} />
        </div>
      </div>

      {/* Radar / Spider chart snapshot */}
      <RadarSection categories={categories} />

      {/* Category breakdown — 3-column grid */}
      <div className="result-breakdown">
        <h2 className="breakdown-title">Here's a Detailed Look at Each of Your Performance Pillars</h2>
        <div className="breakdown-grid">
          {categories.map((cat, i) => {
            const band = getBand(cat.pct)
            const color = getColor(cat.pct)
            const desc = CATEGORY_DESCRIPTIONS[cat.name]?.[band] || ''
            return (
              <div key={i} className="breakdown-card" style={{ '--card-color': color }}>
                <div className="breakdown-card-name">{cat.name}</div>
                <div className="breakdown-card-desc">{desc}</div>
                <div className="breakdown-card-footer">
                  <div className="breakdown-card-bar-wrap">
                    <div className="breakdown-card-bar" style={{ width: `${cat.pct}%`, background: color }} />
                  </div>
                  <div className="breakdown-card-stats">
                    <span className="breakdown-card-pct" style={{ color }}>{cat.pct}%</span>
                    <span className="breakdown-card-band" style={{ color }}>{band}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Debrief CTA section */}
      <div className="debrief-section">
        <div className="debrief-rocket">🚀</div>
        <h2 className="debrief-title">Schedule A 30-Minute New Profits Debrief Session</h2>
        <p className="debrief-body">You've taken the first step to uncover some opportunities for New Profits within your business.</p>
        <p className="debrief-body">Now, if you'd like to talk to our New Profits Consultants on what your next few steps will look like, then click on the button below.</p>
        <a
          href="https://tfft.io/n34k6YH"
          target="_blank"
          rel="noopener noreferrer"
          className="debrief-btn"
        >SCHEDULE DEBRIEF SESSION NOW</a>
      </div>

    </div>
  )
}
