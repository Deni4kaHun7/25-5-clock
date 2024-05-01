import { useState, useEffect } from 'react'
import './App.css'
import beepSound from "./beepSound.mp3"

function App() {
  const [breakLength, setBrakeLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerLabel, setTimerLabel] = useState("Session")
  

  useEffect(() => {
    let timer;
    if (timerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }else if(timeLeft <= 0 ){
      const audioElement = document.getElementById("beep")
      audioElement.play()
      setTimeout(() => changeTimer(), 2000)
    }

    return () => clearInterval(timer);
  }, [timerRunning, timeLeft, sessionLength]);

  const changeTimer = () => {
    let currentTimerLabel;
    let currentTimerLength;
    if(timerLabel === "Session"){
      currentTimerLabel = "Break";
      currentTimerLength = breakLength;
    }else{
      currentTimerLabel = "Session";
      currentTimerLength = sessionLength;
    }
    setTimerLabel(currentTimerLabel);
    setTimeLeft(currentTimerLength * 60)
  };

  const startTimer = () => {
    setTimerRunning(prevState => !prevState);
  };

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    audio.pause();
    setBrakeLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60)
    setTimerRunning(false);
    setTimerLabel("Session")
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    //console.log(breakLength)
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const increaseAmount = (event) => {
    const nameOfState = event.target.name
    if(nameOfState == "breakLength"){
      if(breakLength === 60){
        return;
      }else{
        setBrakeLength(prevState => prevState = prevState + 1)
      }
    }else{
      if(sessionLength === 60){
        return;
      }else {
        setSessionLength(prevState => prevState = prevState + 1)
        setTimeLeft((sessionLength + 1) * 60)
      }
    }
  }

  const decreaseAmount = (event) => {
    const nameOfState = event.target.name
    if(nameOfState == "breakLength"){
      if(breakLength === 1){
        return;
      }else{
        setBrakeLength(prevState => prevState = prevState - 1)
      }
    }else{
      if(sessionLength === 1){
        return
      }else{
        setSessionLength(prevState => prevState = prevState - 1)
        setTimeLeft((sessionLength - 1) * 60)
      }
    }
  }

  return (
    <div className="clock">
      <h1>25 + 5 Clock</h1> 
      <div className="modify-clock-containers">
        <div className="modify-clock-container">
        <h3 id="break-label">Break Length</h3>
          <div className="controls">
            <button name="breakLength" id="break-increment" onClick={increaseAmount}>Up</button> 
            <h3 id="break-length">{breakLength}</h3>
            <button name="breakLength" id="break-decrement" onClick={decreaseAmount}>Down</button>
          </div>
        </div>
        <div className="modify-clock-container">
          <h3 id="session-label">Session Length</h3>
          <div className="controls">
            <button id="session-increment" onClick={increaseAmount}>Up</button>
            <h3 id="session-length">{sessionLength}</h3>
            <button id="session-decrement" onClick={decreaseAmount}>Down</button>
          </div>
        </div>
      </div>
      <div className="timer-container">
        <h3 id="timer-label">{timerLabel}</h3>
        <h2 id="time-left">{formatTime(timeLeft)}</h2>
        <audio id="beep" src="src/beepSound.mp3"></audio>
      </div>
      <button id="start_stop" onClick={startTimer}>Start</button>
      <button id="reset" onClick={resetTimer}>Reset</button>
    </div>
  )
}

export default App

