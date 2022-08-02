import { useState, useEffect, useRef, useCallback } from 'react';

// when settings changes, this hook needs to setTime to reflect the new settings whether it's running or not
// how do i do this?
// i need to know what the original time was - DONE (create state variable with currentTimes from settings)
// i need to know what the new time is - DONE (useEffect with settings dependency)
// i need to calculate the difference between those two
// i need to add/subtract the difference to/from the current time using setTime
// this could happen at any time, and the settings don't live in this hook
// i'm thinking useEffect can be used to monitor for changes to settings, and fire off a function within it
// on top of that, I only need to setTime if the settings for the current phase were changed
// need to update current times after adjusting setTime
// only need to setTime for current phase

export const useTimer = (settings) => {
  // do I need settings from this hook?
  // const { settings } = useContext(AppContext);

  // // state
  const [currentPhase, setCurrentPhase] = useState('focus');

  const [time, setTime] = useState(1500000);

  const [timeRunning, setTimeRunning] = useState(false);

  const [currentInterval, setCurrentInterval] = useState(1);

  const currentTimes = useRef({
    focus: settings.focus,
    shortBreak: settings.shortBreak,
    longBreak: settings.longBreak,
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

  // create function that takes in currentTimes and settings
  // call function in useEffect and pass those arguments in
  // function should calculate difference between the two values compared in each property of both objects
  // function should then determine if a setting was changed for the current phase
  // should then determine if there is a difference between the two for the current phase
  // if there is a difference, it should add/subtract milliseconds using setTime

  const updateTime = useCallback(
    (existingTimes, newTimes) => {
      const focusDiff = newTimes.focus - existingTimes.focus;
      const shortBreakDiff = newTimes.shortBreak - existingTimes.shortBreak;
      const longBreakDiff = newTimes.longBreak - existingTimes.longBreak;

      switch (currentPhase) {
        case 'focus':
          setTime((prevTime) => +(focusDiff * 60 * 1000) + prevTime);
          break;
        case 'shortBreak':
          setTime((prevTime) => +(shortBreakDiff * 60 * 1000) + prevTime);
          break;
        case 'longBreak':
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
    updateTime(currentTimes.current, settings);
  }, [updateTime, settings]);

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
