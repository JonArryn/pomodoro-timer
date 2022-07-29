// // // Imports
import React from 'react';

// // react imports
import { createContext, useState } from 'react';

// create context
const AppContext = createContext();

// export and create provider
export const AppProvider = ({ children }) => {
  // // provider state

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
