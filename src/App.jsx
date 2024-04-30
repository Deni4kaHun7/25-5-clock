import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [breakLength, setBrakeLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timer, setTimer] = useState("04:00")
  return (
    <div className="clock">
      <h1>25 + 5 Clock</h1> 
      <div className="modify-clock-containers">
        <div className="modify-clock-container">
        <h3 id="break-label">Break Length</h3>
          <div className="controls">
            <button id="break-increment">Up</button> 
            <h3 id="break-length">{breakLength}</h3>
            <button id="break-decrement">Down</button>
          </div>
        </div>
        <div className="modify-clock-container">
          <h3 id="session-label">Session Length</h3>
          <div className="controls">
            <button id="session-increment">Up</button>
            <h3 id="session-length">{sessionLength}</h3>
            <button id="session-decrement">Down</button>
          </div>
        </div>
      </div>
      <div className="timer-container">
        <h3 id="timer-label">Session</h3>
        <h2 id="time-left">{timer}</h2>
      </div>
      <button id="start_stop">Start</button>
      <button id="reset">Reset</button>
    </div>
  )
}

export default App
