import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  // const { result } = renderHook(() => useCounter());
  // beforeEach(() => {
  //   result.current.handleReset();
  // });

  test("should initialize with default value of 5", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.counter).toBe(5);
  });

  test("should initialize with default value of 20", () => {
    const initialValue = 20;
    const { result } = renderHook(() => useCounter(initialValue));
    expect(result.current.counter).toBe(initialValue);
  });

  test("should increment counter when handleAdd is called", () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.handleAdd();
    });
    expect(result.current.counter).toBe(6);
  });

  test("should decrement counter when handleSubstract is called", () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.handleSubstract();
    });
    expect(result.current.counter).toBe(4);
  });

  test("should reset to initial value the counter when handleReset is called", () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.handleAdd();
    });
    act(() => {
      result.current.handleAdd();
    });
    act(() => {
      result.current.handleAdd();
    });
    expect(result.current.counter).toBe(8);
    act(() => {
      result.current.handleReset();
    });
    expect(result.current.counter).toBe(5);
  });
});
