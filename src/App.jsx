import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [breakLength, setBrakeLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [timerRunning, setTimerRunning] = useState(false);

  // Function to format the seconds into minutes and seconds
  useEffect(() => {
    let timer;
    if (timerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [timerRunning, timeLeft]);

  const startTimer = () => {
    setTimerRunning(prevState => !prevState);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

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
        <h2 id="time-left">{formatTime(timeLeft)}</h2>
      </div>
      <button id="start_stop" onClick={startTimer}>Start</button>
      <button id="reset">Reset</button>
    </div>
  )
}

export default App

