import React, { useState, useEffect, useRef } from "react";
import "../../styles/timer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faBottleWater,
  faRotateRight,
  faPersonWalking,
} from "@fortawesome/free-solid-svg-icons";

import countdownAudio from "../../../public/sounds/countdown.mp3"

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

  const audioRef = useRef(new Audio(countdownAudio));

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          // Check if timeLeft is 2 instead of 3 to start audio playback
          if (prevTimeLeft === 4) {
            audioRef.current.play();
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      // Stop the audio when work time begins
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      if (!isResting) {
        // Transition to work time after preparation time
        setIsResting(true);
        setShowBegin(false); // Hide "Begin!"
        setTimeLeft(workTime);
      } else {
        if (currentSet < sets) {
          setIsResting(false);
          setCurrentSet(currentSet + 1);
          setTimeLeft(restTime);
        } else {
          if (currentSet === sets && !isResting) {
            setTimeLeft("Good work!");
            setIsActive(false);
          } else if (currentSet === sets && isResting) {
            setTimeLeft("Good work!");
            setIsActive(false);
          } else {
            setIsResting(false);
            setCurrentSet(currentSet + 1);
            setTimeLeft(workTime);
          }
        }
      }
    } else if (timeLeft === 0 && !isActive && isResting) {
      // Display "Begin!" after prep countdown ends
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
  ]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setCurrentSet(1);
    setIsResting(false);
    setShowBegin(false); // Reset "Begin!" display
    setTimeLeft(prepareTime);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 text-center">
          <div className="countdown-circle">
            <h1 className="display-1">{showBegin ? "Begin!" : timeLeft}</h1>
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
