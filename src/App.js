import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [totalTimerLength, setTotalTimerLength] = useState(60_000 * 25)
  const [durationMS, setDurationMS] = useState(60_000 * 25)
  const [remainingTime, setRemainingTime] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [active, setActive] = useState(false)
  function handleStart() { // make timer into a hook ?
    if (!active) {
      setStartTime(Date.now())
      if (remainingTime > 0 && remainingTime !== null) {
        setDurationMS(remainingTime)
      }
    }
    if (remainingTime === 0) {
      setRemainingTime(null)
      setDurationMS(totalTimerLength)
    }
    setActive(prev => !prev)
  }
  function handleReset() {
    setRemainingTime(null)
    setActive(false)
  }
  function changeTime(newTime) {
    handleReset()
    setTotalTimerLength(newTime)
    setDurationMS(newTime)
  }
  function formatMS() {
    let time = remainingTime
    if (remainingTime === null) {
      time = durationMS
    } else if (remainingTime === 0) {
      time = remainingTime
    } else {
      time += 1000
    }
    return `${padTime(Math.floor(time / 1000 / 60))} : ${padTime(Math.floor(time / 1000 % 60))}`
  }
  function padTime(time) {
    return time.toString().padStart(2, "0")
  }

  useEffect(() => {
    if (active) {
      if (remainingTime <= 1 && remainingTime !== null) {
        setActive(false)
        setRemainingTime(0) 
      } else {
        const timeoutID = setTimeout(() => {
          setRemainingTime(durationMS - (Date.now() - startTime)) 
        }, 50)
        return () => { clearTimeout(timeoutID) } //cleanup function
      }
    }
  }, [startTime, remainingTime, active])

  return (
    <div className="App">
      <button onClick={handleStart}>{active ? "Stop" : "Start"}</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={() => changeTime(60_000 * 25)}>Pomodoro</button>
      <button onClick={() => changeTime(60_000 * 5)}>Short Break</button>
      <button onClick={() => changeTime(60_000 * 15)}>Long Break</button>
      <h1>{formatMS()}</h1>
    </div>
  );
}

function Button() {


}

export default App;
