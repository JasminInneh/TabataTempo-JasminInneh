import React, { useState, useEffect } from 'react';
import "../../styles/timer.css"; 

const Timer = () => {
  const [workTime, setWorkTime] = useState(20); // Initial work time in seconds
  const [restTime, setRestTime] = useState(10); // Initial rest time in seconds
  const [sets, setSets] = useState(1); // Initial number of sets
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isActive, setIsActive] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (!isResting) {
        // If not currently resting, switch to rest time
        setIsResting(true);
        setTimeLeft(restTime);
      } else {
        // If currently resting, switch to work time
        setIsResting(false);
        setCurrentSet(currentSet => currentSet + 1);
        if (currentSet < sets) {
          setTimeLeft(workTime);
        } else {
          // All sets completed, reset the timer
          resetTimer();
        }
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, restTime, workTime, sets, isResting, currentSet]);

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
          <h1 className="display-1" style={{ fontSize: "6rem" }}>{timeLeft}</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="row mb-3">
            <div className="col text-center">
              <div className="d-flex align-items-center justify-content-center">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Work Time (seconds)"
                  value={workTime}
                  onChange={(e) => setWorkTime(parseInt(e.target.value))}
                />
              </div>
              <span>Work</span>
            </div>
            <div className="col text-center">
              <div className="d-flex align-items-center justify-content-center">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Rest Time (seconds)"
                  value={restTime}
                  onChange={(e) => setRestTime(parseInt(e.target.value))}
                />
              </div>
              <span>Rest</span>
            </div>
            <div className="col text-center">
              <div className="d-flex align-items-center justify-content-center">
                <input
                  type="number"
                  className="form-control"
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
                {isActive ? 'Pause' : 'Start'}
              </button>
            </div>
            <div className="col-6 col-md-4 mt-2">
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
