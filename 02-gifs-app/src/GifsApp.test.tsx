import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { GifsApp } from "./GifsApp";

describe("GifsApp", () => {
  test("should redner component properly", () => {
    const { container } = render(<GifsApp />);
    expect(container).toMatchSnapshot();
  });
});
