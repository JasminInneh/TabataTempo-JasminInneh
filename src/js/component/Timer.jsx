import React, { useState, useEffect, useRef } from "react";
import "../../styles/timer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faBottleWater,
  faRotateRight,
  faPersonWalking,
} from "@fortawesome/free-solid-svg-icons";

import countdown from "../../sounds/countdown.mp3";
import refereeWhistleBlow from "../../sounds/refereeWhistleBlow.mp3";

const Timer = () => {
  const [prepareTime, setPrepareTime] = useState(5);
  const [workTime, setWorkTime] = useState(20);
  const [restTime, setRestTime] = useState(10);
  const [sets, setSets] = useState(1);
  const [timeLeft, setTimeLeft] = useState(prepareTime);
  const [isActive, setIsActive] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [showBegin, setShowBegin] = useState(false);
  const [showGetSweaty, setShowGetSweaty] = useState(false);
  const [isPreparing, setIsPreparing] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  const countdownRef = useRef(new Audio(countdown));
  const refereeWhistleBlowRef = useRef(new Audio(refereeWhistleBlow));

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0 && !isFinished) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 4) {
            countdownRef.current.play();
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && isActive && !isFinished) {
      countdownRef.current.pause();
      countdownRef.current.currentTime = 0;
      if (isPreparing) {
        setShowGetSweaty(true);
        setIsPreparing(false);
        setTimeLeft(1);
      } else if (showGetSweaty) {
        setShowGetSweaty(false);
        refereeWhistleBlowRef.current.play();
        setTimeLeft(workTime);
      } else if (!isResting) {
        refereeWhistleBlowRef.current.pause();
        refereeWhistleBlowRef.current.currentTime = 0;
        setIsResting(true);
        setTimeLeft(restTime);
      } else {
        if (currentSet < sets) {
          setIsResting(false);
          setCurrentSet(currentSet + 1);
          setTimeLeft(workTime);
        } else {
          setTimeLeft("Good work!");
          setIsActive(false);
          setIsFinished(true);
        }
      }
    } else if (timeLeft === 0 && !isActive && isResting) {
      setShowBegin(true);
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
    showGetSweaty,
    isPreparing,
    isFinished,
  ]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (isActive) {
      countdownRef.current.pause();
      countdownRef.current.currentTime = 0;
      refereeWhistleBlowRef.current.pause();
      refereeWhistleBlowRef.current.currentTime = 0;
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setCurrentSet(1);
    setIsResting(false);
    setShowBegin(false);
    setShowGetSweaty(false);
    setIsPreparing(true);
    setIsFinished(false);
    setTimeLeft(prepareTime);
    countdownRef.current.pause();
    countdownRef.current.currentTime = 0;
    refereeWhistleBlowRef.current.pause();
    refereeWhistleBlowRef.current.currentTime = 0;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 text-center">
          <div className="countdown-circle">
            {!isPreparing && !showGetSweaty && !isFinished && (
              <p>{isResting ? "Rest" : "Work"}</p>
            )}
            <h1 className="display-1">
              {showBegin
                ? "Begin!"
                : showGetSweaty
                ? "Get Sweaty!"
                : timeLeft}
            </h1>
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
              Prepare
            </span>
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
              Rest
            </span>
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
              Sets
            </span>
          </div>
          <div className="row mb-2 btn-container">
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

