import React from 'react';
import { createContext } from 'react';
import { useNotification } from '../hook/useNotification';

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  return (
    <NotificationContext.Provider value={useNotification()}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext as default, NotificationProvider };
