import { useState } from 'react';

export const useSettings = () => {
  // app settings
  const [settings, setSettings] = useState({
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
  });

  const handleSettingsChange = (newSettings) => {
    setSettings((prevSettings) => {
      return { ...prevSettings, ...newSettings };
    });
  };
  return { settings, handleSettingsChange };
};
