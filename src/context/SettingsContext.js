// // // Imports
import React from 'react';

// // react imports
import { createContext } from 'react';

import { useSettings } from '../hook/useSettings';

// create context
const SettingsContext = createContext();

// export and create provider
const SettingsProvider = ({ children }) => {
  // provder return
  return (
    <SettingsContext.Provider value={useSettings()}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext as default, SettingsProvider };
