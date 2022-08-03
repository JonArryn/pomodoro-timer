// // // Imports
import React from 'react';

// // react imports
import { createContext } from 'react';

// hook imports
import { useTimer } from '../hook/useTimer';

// create context
const TimerContext = createContext();

// export and create provider
const TimerProvider = ({ children }) => {
  return (
    <TimerContext.Provider value={useTimer()}>{children}</TimerContext.Provider>
  );
};

export { TimerContext as default, TimerProvider };
