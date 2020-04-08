import React, { useState } from "react";
import Timer from "./Presentation";

export default function Container() {
  const [seconds, hasStarted, isPaused, start, stop, pause, resume] = useTimer(
    5
  );
  const timeLeft = {
    ss: `${seconds % 60}`.padStart(2, "0"),
    mm: `${Math.floor(seconds / 60)}`.padStart(2, "0")
  };
  return (
    <Timer
      {...{ timeLeft, hasStarted, isPaused, start, stop, pause, resume }}
    />
  );
}

function useTimer(span) {
  var [timeLeft, setTimeLeft] = useState(span);
  const [hasStarted, setStarted] = useState(false);
  const [isPaused, setPaused] = useState(false);
  const [runningInterval, setRunningInterval] = useState(null);
  function start() {
    if (!hasStarted) {
      setStarted(true);
      startPeriodicCounting();
    }
  }

  function stop() {
    if (hasStarted) {
      stopPeriodicCounting();
      setTimeLeft(span);
      setStarted(false);
    }
  }

  function pause() {
    if (!isPaused) {
      setPaused(true);
      stopPeriodicCounting();
    }
  }

  function resume() {
    if (isPaused) {
      setPaused(false);
      startPeriodicCounting();
    }
  }

  function startPeriodicCounting() {
    var t = timeLeft;
    setRunningInterval(
      setInterval(() => {
        setTimeLeft(--t);
      }, 1000)
    );
  }

  function stopPeriodicCounting() {
    if (runningInterval != null) {
      clearInterval(runningInterval);
      setRunningInterval(null);
    }
  }

  if (timeLeft === 0) stop();
  return [timeLeft, hasStarted, isPaused, start, stop, pause, resume];
}