import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import MyAwesomeApp from './MyAwesomeApp';

describe('MyAwesomeApp', () => {
  test('should render firstName and lastName', () => {
    // !. Arrange
    // screen.debug();
    // !. Act
    const { container } = render(<MyAwesomeApp />);
    const h1 = container.querySelector('h1');
    const h2 = container.querySelector('h2');
    // !. Assert
    expect(h1?.innerHTML).toContain('Nano');
    expect(h2?.innerHTML).toContain('Mixer');
  });

  test('should render firstName and lastName - screen', () => {
    // !. Arrange
    // screen.debug();
    // !. Act
    render(<MyAwesomeApp />);
    const h1 = screen.getByTestId('first-name');
    const h2 = screen.getByRole('heading', { level: 2 });
    // !. Assert
    expect(h1?.innerHTML).toContain('Nano');
    expect(h2?.innerHTML).toContain('Mixer');
  });

  test('should match the snapshot', () => {
    // !. Arrange
    // !. Act
    const { container } = render(<MyAwesomeApp />);
    // screen.debug();

    // !. Assert
    expect(container).toMatchSnapshot();
  });
});
