import React, { Fragment, useState } from "react";

export default function Timer() {
  const [timeLeft, hasStarted, isPaused, start, stop, pause, resume] = useTimer(
    5
  );
  return (
    <div>
      {hasStarted ? (
        <Fragment>
          {isPaused ? (
            <ResumeButton onResume={resume} />
          ) : (
            <PauseButton onPause={pause} />
          )}
          <StopButton onStop={stop} />
        </Fragment>
      ) : (
        <Fragment>
          <StartButton onStart={start} />
          <RemoveButton />
        </Fragment>
      )}
      <TimerDisplay seconds={timeLeft} />
    </div>
  );
}

function TimerDisplay({ seconds }) {
  const ss = `${seconds % 60}`.padStart(2, "0");
  const mm = `${Math.floor(seconds / 60)}`.padStart(2, "0");
  return (
    <div>
      {mm}:{ss}
    </div>
  );
}

function StartButton({ onStart }) {
  return <div onClick={onStart}>Start</div>;
}

function RemoveButton({ onRemove }) {
  return <div onClick={onRemove}>Remove</div>;
}

function PauseButton({ onPause }) {
  return <div onClick={onPause}>Pause</div>;
}

function ResumeButton({ onResume }) {
  return <div onClick={onResume}>Resume</div>;
}

function StopButton({ onStop }) {
  return <div onClick={onStop}>Stop</div>;
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
