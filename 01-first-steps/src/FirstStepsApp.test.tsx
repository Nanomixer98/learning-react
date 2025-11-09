import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import FirstStepsApp from './FirstStepsApp';

// !. Arrange global
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockItemCounter = vi.fn((_props: unknown) => {
  return <div data-testid="ItemCounter" />;
});

vi.mock('./shopping-cart/ItemCounter', () => ({
  ItemCounter: (props: unknown) => mockItemCounter(props),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('FirstStepsApp', () => {
  test('should match snapshot', () => {
    // !. Arrange
    // !. Act
    const { container } = render(<FirstStepsApp />);
    // !. Assert
    expect(container).toMatchSnapshot();
  });

  test('should render the right number of ItemCounter components', () => {
    // !. Arrange
    // !. Act
    render(<FirstStepsApp />);
    const itemCounters = screen.getAllByTestId('ItemCounter');
    // screen.debug();
    // !. Assert
    expect(itemCounters.length).toBe(3);
  });

  test('should render ItemCounter with correct props', () => {
    // !. Arrange
    // !. Act
    render(<FirstStepsApp />);
    // !. Assert
    expect(mockItemCounter).toHaveBeenCalledTimes(3);
    expect(mockItemCounter).toHaveBeenCalledWith({
      productName: 'Nintendo Switch 2',
      quantity: 1,
    });
    expect(mockItemCounter).toHaveBeenCalledWith({
      productName: 'Pro Controller 2',
      quantity: 2,
    });
    expect(mockItemCounter).toHaveBeenCalledWith({
      productName: 'Pokemon',
      quantity: 10,
    });
  });
});
