import { useState } from 'react';

export const useNotification = () => {
  const [askPermission, setAskPermission] = useState(true);
  const [permission, setPermission] = useState();

  if (Notification.permission === 'default' && askPermission) {
    setAskPermission(false);
    Notification.requestPermission().then((permissionRes) =>
      setPermission(permissionRes)
    );
  } else if (Notification.permission === 'denied' && askPermission) {
    setAskPermission(false);
    setPermission('denied');
  } else if (Notification.permission === 'granted' && askPermission) {
    setPermission('granted');
    setAskPermission(false);
  }

  const givePermission = () => {
    return Notification.requestPermission().then((permissionRes) =>
      setPermission(permissionRes)
    );
  };

  const sendNotification = (title, body) => {
    const supported = 'Notification' in window;

    if (!supported || permission !== 'granted') {
      return;
    } else if (Notification.permission === 'granted') {
      return new Notification(title, { body: body });
    }
  };
  return { permission, givePermission, sendNotification };
};
