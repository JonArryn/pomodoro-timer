import { useState } from 'react';
import { DEFAULT_VALUES as SETTINGS_DEFAULT_VALUES } from '../constant/SETTINGS';

export const useSettings = () => {
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
