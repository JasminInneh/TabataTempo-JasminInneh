import React, { useState, useEffect } from "react";
import "../../styles/timer.css";

const Timer = () => {
  const [workTime, setWorkTime] = useState(20);
  const [restTime, setRestTime] = useState(10);
  const [sets, setSets] = useState(1);
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isActive, setIsActive] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      if (!isResting) {
        // Switch to rest time if not currently resting
        setIsResting(true);
        setTimeLeft(restTime);
      } else {
        // Switch to work time if currently resting
        if (currentSet < sets) {
          setIsResting(false);
          setCurrentSet(currentSet + 1);
          setTimeLeft(workTime);
        } else {
          // All sets completed, stop the timer
          setIsActive(false);
        }
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentSet, isResting, sets, workTime, restTime]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setCurrentSet(1);
    setIsResting(false);
    setTimeLeft(workTime);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 text-center">
          <div className="countdown-circle">
            <h1 className="display-1">{timeLeft}</h1>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="row mb-3">
            <div className="col text-center">
              <div className="input-container">
                <input
                  type="number"
                  className="form-control input-small"
                  placeholder="Work Time (seconds)"
                  value={workTime}
                  onChange={(e) => setWorkTime(parseInt(e.target.value))}
                />
              </div>
              <span>Work</span>
            </div>
            <div className="col text-center">
              <div className="input-container">
                <input
                  type="number"
                  className="form-control input-small"
                  placeholder="Rest Time (seconds)"
                  value={restTime}
                  onChange={(e) => setRestTime(parseInt(e.target.value))}
                />
              </div>
              <span>Rest</span>
            </div>
            <div className="col text-center">
              <div className="input-container">
                <input
                  type="number"
                  className="form-control input-small"
                  placeholder="Sets"
                  value={sets}
                  onChange={(e) => setSets(parseInt(e.target.value))}
                />
              </div>
              <span>Sets</span>
            </div>
          </div>
          <div className="row">
            <div className="col-6 col-md-4 d-flex justify-content-center mt-2">
              <button className="btn btn-dark btn-block" onClick={toggleTimer}>
                {isActive ? "Pause" : "Start"}
              </button>
            </div>
            <div className="col-6 col-md-4 d-flex justify-content-center mt-2">
              <button className="btn btn-dark btn-block" onClick={resetTimer}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
