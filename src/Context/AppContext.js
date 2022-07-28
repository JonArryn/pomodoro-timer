// // // Imports
import React from 'react';

// // react imports
import { createContext, useState } from 'react';

// create context
const AppContext = createContext();

// export and create provider
export const AppProvider = ({ children }) => {
  // // provider state

  // app settings
  const [settings, setSettings] = useState({
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
  });

  // modal state
  const [showModal, setShowModal] = useState(false);

  // modal functions
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // end provider

  // provder return
  return (
    <AppContext.Provider
      value={{
        settings,
        showModal,
        setShowModal,
        handleShowModal,
        handleCloseModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
