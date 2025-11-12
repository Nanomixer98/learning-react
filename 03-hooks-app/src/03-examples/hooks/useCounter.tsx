import { useState } from 'react';

export const useCounter = (initialValue: number = 1) => {
  const [counter, setCounter] = useState(initialValue);

  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    setCounter(counter - 1);
  };
  return {
    // Properties
    counter,
    // Methods / Actions
    increment,
    decrement,
  };
};
