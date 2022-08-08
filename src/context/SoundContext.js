import React, { createContext } from 'react';

import { useSound } from '../hook/useSound';

const SoundContext = createContext();

const SoundProvider = ({ children }) => {
  return (
    <SoundContext.Provider value={useSound()}>{children}</SoundContext.Provider>
  );
};

export { SoundContext as default, SoundProvider };
