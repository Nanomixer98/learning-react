import { useState } from 'react';
import styles from './ItemCounter.module.css';

interface Props {
  name: string;
  quantity?: number;
}

export const ItemCounter = ({ name, quantity = 0 }: Props) => {
  const [counter, setCounter] = useState(quantity);
  console.log(counter);

  const handleClick = (quantity: number) => {
    if (counter + quantity < 0) return;
    setCounter(counter + quantity);
  };

  return (
    <section className={styles['item-row']}>
      <span
        className={styles['item-text']}
        style={{ color: counter === 1 ? 'red' : 'black' }}
      >
        {name}
      </span>
      <button className={styles.red} onClick={() => handleClick(-1)}>
        -1
      </button>
      <span>{counter}</span>
      <button onClick={() => handleClick(+1)}>+1</button>
    </section>
  );
};
