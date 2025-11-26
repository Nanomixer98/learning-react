import { useMemo } from 'react';
import { useCounter } from '../03-examples/hooks/useCounter';

const heavyStuff = (iteratioNumber: number) => {
  console.time('heavy_stuff');

  for (let index = 0; index < iteratioNumber; index++) {
    console.log('here we go...');
  }

  console.timeEnd('heavy_stuff');

  return `${iteratioNumber} iterations done`;
};

export const MemoCounter = () => {
  const { counter, increment } = useCounter(40_000);
  const { counter: counter2, increment: increment2 } = useCounter(10);

  const myHeavyValue = useMemo(() => heavyStuff(counter), [counter]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Memo - useMemo - {myHeavyValue}</h1>
      <hr />

      <h4>Counter: {counter}</h4>
      <h4>Counter: {counter2}</h4>

      <button
        className="bg-blue-500 text-white px-4 rounded-md py-2 cursor-pointer"
        onClick={increment}
      >
        +1
      </button>
      <button
        className="bg-blue-500 text-white px-4 rounded-md py-2 cursor-pointer"
        onClick={increment2}
      >
        +1 - Counter2
      </button>
    </div>
  );
};
