import { useState } from 'react';
import { DEFAULT_VALUES as SETTINGS_DEFAULT_VALUES } from '../constant/SETTINGS';

export const useSettings = () => {
  // app settings
  // const [settings, setSettings] = useState({
  //   [SETTINGS.FOCUS]: 25,
  //   shortBreak: 5,
  //   longBreak: 15,
  //   longBreakInterval: 4,
  // });

  const [currentSettings, setCurrentSettings] = useState(
    SETTINGS_DEFAULT_VALUES
  );

  const handleSettingsChange = (newSettings) => {
    setCurrentSettings((prevSettings) => {
      return { ...prevSettings, ...newSettings };
    });
  };
  return { currentSettings, handleSettingsChange };
};
