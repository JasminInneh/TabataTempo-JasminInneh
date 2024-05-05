import React, { useState, useEffect } from 'react';
import "../../styles/timer.css"; 

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(20); // Initial time
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Handle end of interval
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(20); // Reset time
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 text-center">
          <h1 className="display-4">{timeLeft}</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6 col-md-4">
          <button className="btn btn-primary btn-block" onClick={toggleTimer}>
            {isActive ? 'Pause' : 'Start'}
          </button>
        </div>
        <div className="col-6 col-md-4">
          <button className="btn btn-secondary btn-block" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
