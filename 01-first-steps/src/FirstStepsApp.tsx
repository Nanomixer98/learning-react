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
      {/* <ItemCounter name="Nintendo Switch 2" quantity={100} />
      <ItemCounter name="PlayStation 5" />
      <ItemCounter name="Xbox Series X" quantity={30} /> */}

      {itemsInCart.map(({ productName, quantity }) => (
        <ItemCounter key={productName} name={productName} quantity={quantity} />
      ))}
    </>
  );
}

export default FirstStepsApp;
