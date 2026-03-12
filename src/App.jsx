import React, { useMemo, useState } from 'react'
import questions from './data/questions.js'
import ProgressBar from './components/ProgressBar.jsx'
import QuestionCard from './components/QuestionCard.jsx'
import Result from './components/Result.jsx'
import Landing from './components/Landing.jsx'
import logo from '../logo.png'

export default function App() {
  const total = questions.length
  const [phase, setPhase] = useState('landing') // 'landing' | 'questions' | 'result'
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({}) // key: question id (index), value: option object {label, score}
  const [profile, setProfile] = useState(null) // {name, company, industry, phone}

  const current = useMemo(() => questions[index], [index])
  const answeredCount = Object.keys(answers).length
  const percent = useMemo(() => Math.round((answeredCount / total) * 100), [answeredCount, total])

  const startQuiz = (user) => {
    setProfile(user)
    setPhase('questions')
    setIndex(0)
  }

  const onSelect = (choice) => {
    setAnswers((prev) => ({ ...prev, [index]: choice }))
    // auto-advance to next question after a short delay
    setTimeout(() => {
      if (index < total - 1) {
        setIndex((i) => i + 1)
      } else {
        setPhase('result')
      }
    }, 150)
  }

  const canGoNext = answers[index] !== undefined

  const goNext = () => {
    if (!canGoNext) return
    if (index < total - 1) {
      setIndex((i) => i + 1)
    } else {
      setPhase('result')
    }
  }

  const goPrev = () => {
    if (index > 0) setIndex((i) => i - 1)
  }

  const restart = () => {
    setAnswers({})
    setIndex(0)
    setPhase('landing')
  }

  return (
    <>
      <div className="app">
        <div className="brand-header">
          <img src={logo} alt="Brand Logo" className="brand-logo" />
        </div>

        {phase === 'landing' && (
          <Landing onStart={startQuiz} />
        )}

        {phase === 'questions' && (
          <>
            <div className="progress-row">
              <div className="progress-meta">
                <span className="step">Question {index + 1} of {total}</span>
                <span className="pct">{percent}% complete</span>
              </div>
              <ProgressBar percent={percent} />
            </div>

            {!current ? (
              <div className="card"><p className="muted">Loading questions...</p></div>
            ) : (
              <QuestionCard
                key={index}
                category={current.category}
                question={current.question}
                options={current.options}
                selected={answers[index]}
                onSelect={onSelect}
              />
            )}

            <div className="nav-row">
              <button className="btn secondary" onClick={goPrev} disabled={index === 0}>Previous</button>
              <button className="btn primary" onClick={goNext} disabled={!canGoNext}>
                {index === total - 1 ? 'See Results' : 'Next'}
              </button>
            </div>
          </>
        )}

        {phase === 'result' && (
          <Result questions={questions} answers={answers} profile={profile} onRestart={restart} />
        )}
      </div>

      <footer className="footer">
        <img src={logo} alt="Authority Institute" className="footer-logo" />
        <span className="footer-copy">© 2026 Copyright Authority Institute (Authority Advisory Sdn Bhd)</span>
      </footer>
    </>
  )
}
