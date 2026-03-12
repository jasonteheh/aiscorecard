import React from 'react'

export default function QuestionCard({ category, question, options, selected, onSelect }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="badge">{category}</span>
        <h2 className="question">{question}</h2>
      </div>

      <div className="options">
        {options.map((opt) => {
          const label = typeof opt === 'string' ? opt : opt.label
          const active = (typeof selected === 'string' ? selected === label : selected?.label === label)
          return (
            <button
              key={label}
              className={`option ${active ? 'active' : ''}`}
              onClick={() => onSelect(opt)}
              aria-pressed={active}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
