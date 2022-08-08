import { useState, useEffect, useRef, useCallback, useContext } from 'react';

// import context
import SettingsContext from '../context/SettingsContext';
import NotificationContext from '../context/NotificationContext';
import SoundContext from '../context/SoundContext';

// import constants
import SETTINGS from '../constant/SETTINGS';
import ACTIONS from '../constant/ACTIONS';

export const useTimer = () => {
  // context
  const { currentSettings } = useContext(SettingsContext);
  const { sendNotification } = useContext(NotificationContext);
  const { notifyTimerExpire } = useContext(SoundContext);

  // // state
  const [currentPhase, setCurrentPhase] = useState(SETTINGS.FOCUS);

  // time is stored in milliseconds
  // reduced by 1000 by toggleTimer function
  const [time, setTime] = useState(1500000);

  // used in other functions fro switch statements to determine if time is currently running
  const [timeRunning, setTimeRunning] = useState(false);

  // keeps track of current inerval count
  const [currentInterval, setCurrentInterval] = useState(1);

  // // refs

  // used as ref for interval created by toggleTimer to reduce time state variable
  const timer = useRef();

  // stores current times on mount
  // used to update timer for current phase if settings are changed
  // updated by updateTime function
  const currentTimes = useRef({
    [SETTINGS.FOCUS]: currentSettings.focus,
    [SETTINGS.SHORT_BREAK]: currentSettings.shortBreak,
    [SETTINGS.LONG_BREAK]: currentSettings.longBreak,
  });

  // // local functions

  // used in on timer component to display time in minutes:seconds
  // takes in milliseconds and returns string displayed on main timer
  const convertTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);

    const newSeconds = seconds % 60;
    const newMinutes = minutes % 60;

    return `${newMinutes.toString()}:${newSeconds.toString().padStart(2, '0')}`;
  };

  // timer start interval
  // used on timer component to start the timer on start/pause button
  // creates and clears interval to reduce time
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

  // // // // // REFACTOR // // // // //

  // called by useEffect when settings are changed
  // takes in current times and new times created by settings change
  // based on current phase, will update 'time' state variable
  // only does anything if settings were changed for the current phase
  // updates currentTimes ref with new times dictated by settings change
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

  // used in timer component phase to handle manual phase changes
  // use can change phase or skip phase
  // takes in an ACTION ('change' or 'skip') and phase (only on 'change' action)
  // 'change' calls switchPhase and passes in a phase
  // 'skip' calls switchPhase with no phase argument
  // 'change' action only alerts if time is running
  // 'skip' always alerts because it will increase round count
  const manualPhaseChange = (action, phase) => {
    switch (true) {
      case timeRunning && action === ACTIONS.CHANGE:
        window.confirm(
          'The timer for this phase is still running, are you sure you want to switch?'
        ) && switchPhase(phase);
        break;
      case !timeRunning && action === ACTIONS.CHANGE:
        switchPhase(phase);
        break;
      case action === ACTIONS.SKIP:
        window.confirm(
          'This will skip the current phase. If the current phase is a break, it will increase the round count. Are you sure?'
        ) && switchPhase();
        break;
      default:
        return;
    }
  };

  // phase change logic
  // handles phase switching between focus, short break, long break
  // takes in phase argument
  // if phase === null, then automatic phase switching logic fires
  // if phase !== null, indicates manual change and changes to provided phase
  const switchPhase = useCallback(
    (phase) => {
      // clears interval, stops timer
      clearInterval(timer.current);
      setTimeRunning(false);
      // manual phase change
      if (phase) {
        setCurrentPhase(phase);
        setTime(currentSettings[`${phase}`] * 60 * 1000);
        return;
        // auto phase change/skip phase
      } else {
        switch (true) {
          case currentPhase === SETTINGS.FOCUS &&
            currentInterval % currentSettings.longBreakInterval !== 0:
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
            currentInterval % currentSettings.longBreakInterval === 0:
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

  // // // // // REFACTOR // // // // //

  // // useEffects

  // switches phase when time gets to 0
  useEffect(() => {
    if (time <= 0) {
      notifyTimerExpire();
      sendNotification('Pomodoro Timer', 'Time is up!');
      switchPhase();
    }
  }, [time, switchPhase, sendNotification, notifyTimerExpire]);

  // stop timer on unmount
  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  // listens for changes in currentSettings
  // updates time if settings were changed for current phase
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
