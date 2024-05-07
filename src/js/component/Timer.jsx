import React, { useState, useEffect } from "react";
import "../../styles/timer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faBottleWater, faRotateRight, faPersonWalking } from "@fortawesome/free-solid-svg-icons";

const Timer = () => {
  const [prepareTime, setPrepareTime] = useState(5);
  const [workTime, setWorkTime] = useState(20);
  const [restTime, setRestTime] = useState(10);
  const [sets, setSets] = useState(1);
  const [timeLeft, setTimeLeft] = useState(prepareTime);
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
        // Transition to work time after preparation time
        setIsResting(true); // Set to resting state to control the next countdown
        setTimeLeft(workTime); // Start work time countdown
      } else {
        // Switch to rest time if currently resting
        if (currentSet < sets) {
          setIsResting(false);
          setCurrentSet(currentSet + 1);
          setTimeLeft(restTime);
        } else {
          // Check if it's the last set and the last work period
          if (currentSet === sets && !isResting) {
            setTimeLeft("Good work!"); // Display "Good work!" instead of starting rest
            setIsActive(false); // Stop the timer
          } else if (currentSet === sets && isResting) {
            setTimeLeft("Good work!"); // Display "Good work!" instead of starting rest
            setIsActive(false); // Stop the timer
          } else {
            setIsResting(false);
            setCurrentSet(currentSet + 1);
            setTimeLeft(workTime);
          }
        }
      }
    }
    return () => clearInterval(interval);
  }, [
    isActive,
    timeLeft,
    currentSet,
    isResting,
    sets,
    workTime,
    restTime,
    prepareTime,
  ]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setCurrentSet(1);
    setIsResting(false);
    setTimeLeft(prepareTime);
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
          <div className="col text-center align-items-center mb-3">
            <div className="input-container">
              <input
                type="number"
                className="form-control input-small"
                placeholder="Prepare Time (seconds)"
                value={prepareTime}
                onChange={(e) => setPrepareTime(parseInt(e.target.value))}
              />
            </div>
            <span>
            <FontAwesomeIcon icon={faPersonWalking} />
              Prepare</span>
          </div>
          <div className="col text-center align-items-center mb-3">
            <div className="input-container">
              <input
                type="number"
                className="form-control input-small"
                placeholder="Work Time (seconds)"
                value={workTime}
                onChange={(e) => setWorkTime(parseInt(e.target.value))}
              />
            </div>
            <span>
              <FontAwesomeIcon icon={faDumbbell} />
              Work
            </span>
          </div>
          <div className="col text-center align-items-center mb-3">
            <div className="input-container">
              <input
                type="number"
                className="form-control input-small"
                placeholder="Rest Time (seconds)"
                value={restTime}
                onChange={(e) => setRestTime(parseInt(e.target.value))}
              />
            </div>
            <span>
            <FontAwesomeIcon icon={faBottleWater} />

              Rest</span>
          </div>
          <div className="col text-center align-items-center mb-3">
            <div className="input-container">
              <input
                type="number"
                className="form-control input-small"
                placeholder="Sets"
                value={sets}
                onChange={(e) => setSets(parseInt(e.target.value))}
              />
            </div>
            <span>
            <FontAwesomeIcon icon={faRotateRight} />
              Sets</span>
          </div>
          <div className="row mb-2">
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
