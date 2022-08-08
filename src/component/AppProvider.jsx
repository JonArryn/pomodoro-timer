import { SettingsProvider } from '../context/SettingsContext';
import { TimerProvider } from '../context/TimerContext';
import { NotificationProvider } from '../context/NotificationContext';
import { SoundProvider } from '../context/SoundContext';

const AppProvider = ({ children }) => (
  <SettingsProvider>
    <NotificationProvider>
      <SoundProvider>
        <TimerProvider>{children}</TimerProvider>
      </SoundProvider>
    </NotificationProvider>
  </SettingsProvider>
);
export default AppProvider;
