// // // Imports
import React from 'react';

// // react imports
import { createContext } from 'react';

// hook imports
import { useModal } from '../Hooks/useModal';
import { useSettings } from '../Hooks/useSettings';
import { useTimer } from '../Hooks/useTimer';
// create context
const AppContext = createContext();

// export and create provider
export const AppProvider = ({ children }) => {
  // useModal hook
  const { showModal, handleShowModal, handleCloseModal } = useModal();
  // useSettings hook
  const { settings, handleSettingsChange } = useSettings();
  // useTimer hook
  const {
    currentPhase,
    currentInterval,
    time,
    timeRunning,
    convertTime,
    toggleTimer,
    manualPhaseChange,
  } = useTimer(settings);
  // end provider

  // provder return
  return (
    <AppContext.Provider
      value={{
        // useSettings
        settings,
        handleSettingsChange,
        // useModal
        showModal,
        handleShowModal,
        handleCloseModal,
        // useTimer
        currentPhase,
        currentInterval,
        time,
        timeRunning,
        convertTime,
        toggleTimer,
        manualPhaseChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
