import { useEffect, useState } from 'react';

const colors = {
  red: 'bg-red-500 animate-pulse',
  yellow: 'bg-yellow-500 animate-pulse',
  green: 'bg-green-500 animate-pulse',
};

type TrafficLightColors = keyof typeof colors;

interface Props {
  countdownDuration?: number;
}

export const TrafficLightWithEffect = ({ countdownDuration = 5 }: Props) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-white text-3xl font-thin">
          Semaphore with useEffect
        </h1>
        <h2 className="text-white text-2xl">Countdown: {countdown}</h2>

        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full duration-1000"
            style={{ width: `${(countdown / countdownDuration) * 100}%` }}
          ></div>
        </div>

        <div
          className={`w-32 h-32 ${
            light == 'red' ? colors[light] : 'bg-gray-500'
          } rounded-full`}
        ></div>

        <div
          className={`w-32 h-32 ${
            light == 'yellow' ? colors[light] : 'bg-gray-500'
          } rounded-full`}
        ></div>

        <div
          className={`w-32 h-32 ${
            light == 'green' ? colors[light] : 'bg-gray-500'
          } rounded-full`}
        ></div>
      </div>
    </div>
  );
};
