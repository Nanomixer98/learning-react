import { ItemCounter } from './shopping-cart/ItemCounter';

interface ItemInCart {
  productName: string;
  quantity: number;
}

const itemsInCart: ItemInCart[] = [
  { productName: 'Nintendo Switch 2', quantity: 1 },
  { productName: 'Pro Controller 2', quantity: 2 },
  { productName: 'Pokemon', quantity: 10 },
];

export function FirstStepsApp() {
  return (
    <>
      <h1>Shopping Cart</h1>

      {itemsInCart.map(({ productName, quantity }) => (
        <ItemCounter
          key={productName}
          productName={productName}
          quantity={quantity}
        />
      ))}
    </>
  );
}

export default FirstStepsApp;
