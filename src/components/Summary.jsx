import React from 'react'

export default function Summary({ questions, answers, onRestart }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="question">Summary</h2>
        <p className="muted">Here are your selections.</p>
      </div>

      <ul className="summary-list">
        {questions.map((q, i) => (
          <li key={i} className="summary-item">
            <div className="summary-category">{q.category}</div>
            <div className="summary-question">{q.question}</div>
            <div className="summary-answer">{answers[i] ?? 'No answer'}</div>
          </li>
        ))}
      </ul>

      <div className="nav-row">
        <button className="btn secondary" onClick={onRestart}>Start Over</button>
      </div>
    </div>
  )
}
