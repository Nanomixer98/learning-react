import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CustomHeader } from "./CustomHeader";

describe("CustomHeader", () => {
  const title = "Hello";

  test("should render the title properly", () => {
    render(<CustomHeader title={title} description="World" />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.innerHTML).toBe(title);
  });

  test("should render the description when provided", () => {
    const description = "World";
    const { container } = render(
      <CustomHeader title={title} description={description} />,
    );
    const div = container.getElementsByClassName("content-center");
    const p = screen.getByRole("paragraph");
    expect(div[0].innerHTML).toContain(description);
    expect(p).toBeDefined();
    expect(p.innerHTML).toBe(description);
  });

  test("should not render description when not provided", () => {
    const { container } = render(<CustomHeader title={title} />);
    const divElement = container.querySelector(".content-center");
    const h1 = divElement?.querySelector("h1");
    const p = divElement?.querySelector("p");

    expect(h1?.innerHTML).toBe(title);
    expect(p).toBeNull();
  });
});
