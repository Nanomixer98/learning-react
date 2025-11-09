import { describe, expect, test } from 'vitest';
import { add, divide, multiply, subtract } from './math.helper';

describe('Math helper add', () => {
    test('should add two numbers', () => {
        // !. Arrange
        const a = 1;
        const b = 2;
        // !. Act
        const result = add(a, b);
        // !. Assert
        expect(result).toBe(3);
    });

    test('should add two numbers with a negative result', () => {
        // !. Arrange
        const a = 1;
        const b = -2;
        // !. Act
        const result = add(a, b);
        // !. Assert
        expect(result).toBe(-1);
    });
});

describe('Math helper subtract', () => {
    test('should subtract two numbers', () => {
        // !. Arrange
        const a = 10;
        const b = 5;
        // !. Act
        const result = subtract(a, b);
        // !. Assert
        expect(result).toBe(5);
    });

    test('should subtract two numbers with a negative result', () => {
        // !. Arrange
        const a = 10;
        const b = -5;
        // !. Act
        const result = subtract(a, b);
        // !. Assert
        expect(result).toBe(15);
    });
});

describe('Math helper multiply', () => {
    test('should multiply two numbers', () => {
        // !. Arrange
        const a = 10;
        const b = 5;
        // !. Act
        const result = multiply(a, b);
        // !. Assert
        expect(result).toBe(50);
    });

    test('should multiply two numbers with a negative result', () => {
        // !. Arrange
        const a = 10;
        const b = -5;
        // !. Act
        const result = multiply(a, b);
        // !. Assert
        expect(result).toBe(-50);
    });
});

describe('Math helper divide', () => {
    test('should divide two numbers', () => {
        // !. Arrange
        const a = 10;
        const b = 5;
        // !. Act
        const result = divide(a, b);
        // !. Assert
        expect(result).toBe(2);
    });

    test('should divide two numbers with a negative result', () => {
        // !. Arrange
        const a = 10;
        const b = -5;
        // !. Act
        const result = divide(a, b);
        // !. Assert
        expect(result).toBe(-2);
    });
});