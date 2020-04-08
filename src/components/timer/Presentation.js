import React, { Fragment } from "react";

export default function Timer({
    timeLeft,
    hasStarted,
    isPaused,
    start,
    stop,
    pause,
    resume
  }) {
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
        <TimerDisplay {...timeLeft} />
      </div>
    );
  }
  
  function TimerDisplay({ mm, ss }) {
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
  