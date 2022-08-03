import { useState, useEffect, useRef, useCallback, useContext } from 'react';

// import context
import SettingsContext from '../context/SettingsContext';

// import constants
import SETTINGS from '../constant/SETTINGS';

export const useTimer = () => {
  // do I need settings from this hook?
  const { currentSettings } = useContext(SettingsContext);

  // // state
  const [currentPhase, setCurrentPhase] = useState(SETTINGS.FOCUS);

  const [time, setTime] = useState(1500000);

  const [timeRunning, setTimeRunning] = useState(false);

  const [currentInterval, setCurrentInterval] = useState(1);

  const currentTimes = useRef({
    [SETTINGS.FOCUS]: currentSettings.focus,
    [SETTINGS.SHORT_BREAK]: currentSettings.shortBreak,
    [SETTINGS.LONG_BREAK]: currentSettings.longBreak,
  });

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
        setTime(currentSettings[`${phase}`] * 60 * 1000);
        return;
      } else {
        switch (true) {
          case currentPhase === SETTINGS.FOCUS &&
            currentInterval < currentSettings.longBreakInterval:
            setCurrentPhase(SETTINGS.SHORT_BREAK);
            setTime(currentSettings.shortBreak * 60 * 1000);
            break;
          case currentPhase === SETTINGS.SHORT_BREAK ||
            currentPhase === SETTINGS.LONG_BREAK:
            setCurrentPhase(SETTINGS.FOCUS);
            setCurrentInterval((prevRound) => {
              return prevRound + 1;
            });
            setTime(currentSettings.focus * 60 * 1000);
            break;
          case currentPhase === SETTINGS.FOCUS &&
            currentInterval === currentSettings.longBreakInterval:
            setCurrentPhase(SETTINGS.LONG_BREAK);
            setTime(currentSettings.longBreak * 60 * 1000);
            break;
          default:
            setCurrentPhase(SETTINGS.FOCUS);
        }
      }
    },
    [currentPhase, currentInterval, currentSettings]
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
  }, [time, switchPhase, currentSettings]);

  // stop timer on unmount
  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  // create function that takes in currentTimes and settings
  // call function in useEffect and pass those arguments in
  // function should calculate difference between the two values compared in each property of both objects
  // function should then determine if a setting was changed for the current phase
  // should then determine if there is a difference between the two for the current phase
  // if there is a difference, it should add/subtract milliseconds using setTime

  const updateTime = useCallback(
    (existingTimes, newTimes) => {
      switch (currentPhase) {
        case SETTINGS.FOCUS:
          const focusDiff = newTimes.focus - existingTimes.focus;
          setTime((prevTime) => +(focusDiff * 60 * 1000) + prevTime);
          break;
        case SETTINGS.SHORT_BREAK:
          const shortBreakDiff = newTimes.shortBreak - existingTimes.shortBreak;
          setTime((prevTime) => +(shortBreakDiff * 60 * 1000) + prevTime);
          break;
        case SETTINGS.LONG_BREAK:
          const longBreakDiff = newTimes.longBreak - existingTimes.longBreak;
          setTime((prevTime) => +(longBreakDiff * 60 * 1000) + prevTime);
          break;
        default:
          return;
      }

      currentTimes.current = newTimes;
      return;
    },
    [currentPhase]
  );

  useEffect(() => {
    updateTime(currentTimes.current, currentSettings);
  }, [updateTime, currentSettings]);

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
