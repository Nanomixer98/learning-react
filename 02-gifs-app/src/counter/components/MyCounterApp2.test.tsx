import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { MyCounterApp } from "./MyCounterApp";

const handleAddMock = vi.fn();
const handleSubstractMock = vi.fn();
const handleResetMock = vi.fn();

vi.mock("../hooks/useCounter", () => ({
  useCounter: () => ({
    counter: 5,
    handleAdd: handleAddMock,
    handleReset: handleResetMock,
    handleSubstract: handleSubstractMock,
  }),
}));

describe("MyCounterApp", () => {
  test("should render the component", () => {
    render(<MyCounterApp />);

    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toContain(
      `Counter: 5`,
    );
    expect(screen.getByRole("button", { name: "+1" }).innerHTML).toBeDefined();
    expect(screen.getByRole("button", { name: "-1" }).innerHTML).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Reset" }).innerHTML,
    ).toBeDefined();
  });

  test("should call handleAdd when button is clicked", () => {
    render(<MyCounterApp />);
    const buttonElement = screen.getByRole("button", { name: "+1" });

    fireEvent.click(buttonElement);
    expect(handleAddMock).toHaveBeenCalled();
    expect(handleAddMock).toHaveBeenCalledTimes(1);
    expect(handleResetMock).not.toHaveBeenCalled();
    expect(handleSubstractMock).not.toHaveBeenCalled();
  });
});
