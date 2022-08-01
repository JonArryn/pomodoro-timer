import { useState, useEffect, useRef, useCallback } from 'react';

// hooks imports
import { useSettings } from './useSettings';

export const useTimer = () => {
  // do I need settings from this hook?
  const { settings } = useSettings();

  // // state
  const [currentPhase, setCurrentPhase] = useState('focus');

  const [time, setTime] = useState(1500000);

  const [timeRunning, setTimeRunning] = useState(false);

  const [currentInterval, setCurrentInterval] = useState(1);

  // // refs

  const timer = useRef();

  // // local functions

  // used in on timer component to display time in minutes:seconds
  const convertTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);

    const newSeconds = seconds % 60;
    const newMinutes = minutes % 60;

    return `${newMinutes.toString()}:${newSeconds.toString().padStart(2, '0')}`;
  };

  // timer start interval
  // used on timer component to start the timer on start/pause button
  const toggleTimer = () => {
    setTimeRunning((prevTimeRunning) => !prevTimeRunning);

    if (!timeRunning) {
      timer.current = setInterval(() => {
        setTime((prevTime) => {
          return prevTime - 1000;
        });
      }, 1000);
    }

    if (timeRunning) {
      clearInterval(timer.current);
    }
  };

  // phase change logic
  // handles phase switching between focus, short break, long break
  // handles manual phase changes as well as automatic phase changes from timer running out
  const switchPhase = useCallback(
    (phase) => {
      clearInterval(timer.current);
      setTimeRunning(false);
      if (phase) {
        setCurrentPhase(phase);
        setTime(settings[`${phase}`] * 60 * 1000);
        return;
      } else {
        switch (true) {
          case currentPhase === 'focus' &&
            currentInterval < settings.longBreakInterval:
            setCurrentPhase('shortBreak');
            setTime(settings.shortBreak * 60 * 1000);
            break;
          case currentPhase === 'shortBreak' || currentPhase === 'longBreak':
            setCurrentPhase('focus');
            setCurrentInterval((prevRound) => {
              return prevRound + 1;
            });
            setTime(settings.pomodoro * 60 * 1000);
            break;
          case currentPhase === 'focus' &&
            currentInterval === settings.longBreakInterval:
            setCurrentPhase('longBreak');
            setTime(settings.longBreak * 60 * 1000);
            break;
          default:
            setCurrentPhase('focus');
        }
      }
    },
    [currentPhase, currentInterval, settings]
  );

  // warn on manual phase change
  // used in timer component phase on clicks when user tries to manually change the phase
  const manualPhaseChange = (phase) => {
    if (timeRunning) {
      if (
        window.confirm(
          'The timer for this phase is still running, are you sure you want to switch?'
        )
      ) {
        switchPhase(phase);
      } else {
        return;
      }
    } else {
      switchPhase(phase);
      return;
    }
  };

  // // useEffects

  // stop timer at 0 and switch phase
  useEffect(() => {
    if (time <= 0) {
      switchPhase();
    }
  }, [time, switchPhase, settings]);

  // stop timer on unmount
  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return {
    currentPhase,
    currentInterval,
    time,
    timeRunning,
    convertTime,
    toggleTimer,
    manualPhaseChange,
  };
};
