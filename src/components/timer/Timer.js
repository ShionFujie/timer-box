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
  var [timeLeft, _setTimeLeft] = useState(span);
  const [hasStarted, _setStarted] = useState(false);
  const [isPaused, _setPaused] = useState(false);
  const [runningInterval, _setRunningInterval] = useState(null);
  function start() {
    if (!hasStarted) {
      _setStarted(true);
      _startPeriodicCounting();
    }
  }

  function stop() {
    if (hasStarted) {
      _stopPeriodicCounting();
      _setTimeLeft(span);
      _setStarted(false);
    }
  }

  function pause() {
    if (!isPaused) {
      _setPaused(true);
      _stopPeriodicCounting();
    }
  }

  function resume() {
    if (isPaused) {
      _setPaused(false);
      _startPeriodicCounting();
    }
  }

  function _startPeriodicCounting() {
    var t = timeLeft;
    _setRunningInterval(
      setInterval(() => {
        _setTimeLeft(--t);
      }, 1000)
    );
  }

  function _stopPeriodicCounting() {
    if (runningInterval != null) {
      clearInterval(runningInterval);
      _setRunningInterval(null);
    }
  }

  if (timeLeft === 0) stop();
  return [timeLeft, hasStarted, isPaused, start, stop, pause, resume];
}