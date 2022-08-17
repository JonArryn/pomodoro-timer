import { SettingsProvider } from '../context/SettingsContext';
import { TimerProvider } from '../context/TimerContext';
import { NotificationProvider } from '../context/NotificationContext';
import { SoundProvider } from '../context/SoundContext';
import { TaskListProvider } from '../context/TaskListContext';

const AppProvider = ({ children }) => (
  <SettingsProvider>
    <NotificationProvider>
      <SoundProvider>
        <TaskListProvider>
          <TimerProvider>{children}</TimerProvider>
        </TaskListProvider>
      </SoundProvider>
    </NotificationProvider>
  </SettingsProvider>
);
export default AppProvider;
