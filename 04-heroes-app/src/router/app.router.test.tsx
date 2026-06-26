import { render, screen } from "@testing-library/react";
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router";
import { describe, expect, test, vi } from "vitest";
import { appRouter } from "./app.router";

vi.mock("@/heroes/layouts/HeroesLayout", () => ({
  HeroesLayout: () => (
    <div data-testid="heroes-layout">
      <Outlet />
    </div>
  ),
}));

vi.mock("@/auth/pages/LoginPage", () => ({
  LoginPage: () => <div>LoginPage</div>,
}));

vi.mock("@/admin/pages/AdminPage", () => ({
  AdminPage: () => <div>AdminPage</div>,
}));

vi.mock("@/heroes/pages/hero/HeroPage", () => ({
  HeroPage: () => {
    const { idSlug = "" } = useParams();
    return <div data-testid="hero-page">HeroPage - {idSlug}</div>;
  },
}));

vi.mock("@/heroes/pages/home/HomePage", () => ({
  HomePage: () => <div data-testid="home-page">HomePage</div>,
}));

vi.mock("@/heroes/pages/search/SearchPage", () => ({
  default: () => <div data-testid="search-page">SearchPage</div>,
}));

describe("appRouter", () => {
  test("should be configured as expected", () => {
    expect(appRouter.routes).toMatchSnapshot();
  });

  test("should render home page at root path", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("home-page")).toBeDefined();
  });

  test("should render hero page at /hero/:idSlug path", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/heroes/superman"],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("hero-page").innerHTML).toContain("superman");
  });

  test("should render search page at /search path", async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/search"],
    });

    render(<RouterProvider router={router} />);
    expect(await screen.findByTestId("search-page")).toBeDefined();
  });

  test("should redirect to home page for unkown routes", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/random-weird-page"],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("home-page")).toBeDefined();
  });
});
