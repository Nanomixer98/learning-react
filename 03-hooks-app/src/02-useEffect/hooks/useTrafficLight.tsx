import { useEffect, useState } from 'react';

const colors = {
  red: 'bg-red-500 animate-pulse',
  yellow: 'bg-yellow-500 animate-pulse',
  green: 'bg-green-500 animate-pulse',
};

type TrafficLightColors = keyof typeof colors;

export const useTrafficLight = (countdownDuration: number) => {
  const [light, setLight] = useState<TrafficLightColors>('red');
  const [countdown, setCountdown] = useState<number>(countdownDuration);

  // Countdown effect
  useEffect(() => {
    if (countdown === 0) {
      setCountdown(countdownDuration);
      return;
    }

    const intervalId = setInterval(() => {
      setCountdown((prevVal) => prevVal - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [countdown, countdownDuration]);

  // Change light color
  useEffect(() => {
    if (countdown > 0) return;

    switch (light) {
      case 'red':
        setLight('green');
        return;
      case 'green':
        setLight('yellow');
        return;
      case 'yellow':
        setLight('red');
        return;

      default:
        break;
    }
  }, [countdown, light]);

  return {
    // Props
    countdown,

    // Computed
    progressPercentage: (countdown / countdownDuration) * 100,
    greenLight: light === 'green' ? colors.green : 'bg-gray-500',
    yellowLight: light === 'yellow' ? colors.yellow : 'bg-gray-500',
    redLight: light === 'red' ? colors.red : 'bg-gray-500',
  };
};
