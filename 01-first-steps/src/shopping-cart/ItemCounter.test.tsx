import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ItemCounter } from './ItemCounter';

describe('ItemCounter', () => {
  test('should render with default values', () => {
    // !. Arrange
    const name = 'Test Item';
    const quantity = 100;
    // !. Act
    render(<ItemCounter productName={name} quantity={quantity} />);
    // screen.debug();
    // !. Assert
    expect(screen.getByText(name)).toBeDefined();
    expect(screen.getByText(quantity)).toBeDefined();
  });

  test('should increment the counter when the button +1 is clicked', () => {
    // !. Arrange
    const name = 'Test Item';
    const quantity = 100;
    // !. Act
    render(<ItemCounter productName={name} quantity={quantity} />);
    const [, buttonAdd] = screen.getAllByRole('button');
    fireEvent.click(buttonAdd);
    // !. Assert
    expect(screen.getByText(quantity + 1)).toBeDefined();
  });

  test('should decrement the counter when the button -1 is clicked', () => {
    // !. Arrange
    const name = 'Test Item';
    const quantity = 100;
    // !. Act
    render(<ItemCounter productName={name} quantity={quantity} />);
    const [buttonDecrement] = screen.getAllByRole('button');
    fireEvent.click(buttonDecrement);
    // !. Assert
    expect(screen.getByText(quantity - 1)).toBeDefined();
  });

  test('should not decrement the counter when the counter is 0', () => {
    // !. Arrange
    const name = 'Test Item';
    const quantity = 0;
    // !. Act
    render(<ItemCounter productName={name} quantity={quantity} />);
    const [buttonDecrement] = screen.getAllByRole('button');
    fireEvent.click(buttonDecrement);
    // !. Assert
    expect(screen.getByText(quantity)).toBeDefined();
  });

  test('should change to black when count is different from 1', () => {
    // !. Arrange
    const quantity = 50;
    const name = 'Test item';

    // !. Act
    render(<ItemCounter productName={name} quantity={quantity} />);
    const itemText = screen.getByText(name);

    // !. Assert
    expect(itemText.style.color).toBe('black');
  });
});
