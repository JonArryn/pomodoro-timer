import { useState } from 'react';

export const useNotification = () => {
  const [askPermission, setAskPermission] = useState(true);
  const [permission, setPermission] = useState();
  const supported = 'Notification' in window;

  if (supported && Notification.permission === 'default' && askPermission) {
    setAskPermission(false);
    Notification.requestPermission().then((permissionRes) =>
      setPermission(permissionRes)
    );
  } else if (
    supported &&
    Notification.permission === 'denied' &&
    askPermission
  ) {
    setAskPermission(false);
    setPermission('denied');
  } else if (
    supported &&
    Notification.permission === 'granted' &&
    askPermission
  ) {
    setPermission('granted');
    setAskPermission(false);
  }

  const givePermission = () => {
    return Notification.requestPermission().then((permissionRes) =>
      setPermission(permissionRes)
    );
  };

  const sendNotification = (title, body) => {
    if (!supported || permission !== 'granted') {
      return;
    } else if (Notification.permission === 'granted') {
      return new Notification(title, { body: body });
    }
  };
  return { permission, givePermission, sendNotification };
};
