import React from 'react'

export default function ProgressBar({ percent = 0 }) {
  const clamped = Math.max(0, Math.min(100, percent))
  return (
    <div className="progress">
      <div className="progress-fill" style={{ width: `${clamped}%` }} />
    </div>
  )
}
