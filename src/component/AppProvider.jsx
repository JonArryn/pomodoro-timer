import { SettingsProvider } from '../context/SettingsContext';
import { TimerProvider } from '../context/TimerContext';

const AppProvider = ({ children }) => (
  <SettingsProvider>
    <TimerProvider>{children}</TimerProvider>
  </SettingsProvider>
);
export default AppProvider;
