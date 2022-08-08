import shipBell from '../asset/shipBell.mp3';

export const useSound = () => {
  const notifyTimerExpire = () => {
    const sound = new Audio(shipBell);

    sound.play();
  };

  return { notifyTimerExpire };
};
