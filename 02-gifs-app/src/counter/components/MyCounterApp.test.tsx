import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MyCounterApp } from "./MyCounterApp";

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

  test("should increment the counter", () => {
    render(<MyCounterApp />);
    const h1Element = screen.getByRole("heading", { level: 1 });
    const buttonElement = screen.getByRole("button", { name: "+1" });

    fireEvent.click(buttonElement);
    expect(h1Element.innerHTML).toContain("Counter: 6");
  });

  test("should decrement the counter", () => {
    render(<MyCounterApp />);
    const h1Element = screen.getByRole("heading", { level: 1 });
    const buttonElement = screen.getByRole("button", { name: "-1" });

    fireEvent.click(buttonElement);
    expect(h1Element.innerHTML).toContain("Counter: 4");
  });
});
