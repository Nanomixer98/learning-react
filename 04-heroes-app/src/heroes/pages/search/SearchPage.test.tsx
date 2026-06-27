import type { Hero } from "@/heroes/types/hero.interface";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useSearchHeroes } from "../../hooks/useSearchHeroes";
import { SearchPage } from "./SearchPage";

vi.mock("@/heroes/hooks/useSearchHeroes");
const mockUseSearchHeroes = vi.mocked(useSearchHeroes);
mockUseSearchHeroes.mockReturnValue({
  data: [],
  isLoading: false,
  isSuccess: true,
} as unknown as ReturnType<typeof useSearchHeroes>);

vi.mock("@/heroes/components/HeroGrid", () => ({
  HeroGrid: ({ heroes }: { heroes: Hero[] }) => (
    <div data-testid="hero-grid">
      {heroes.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </div>
  ),
}));

vi.mock("@/components/custom/CustomJumpbotron", () => ({
  CustomJumpbotron: () => <div data-testid="custom-jumpbutron"></div>,
}));

vi.mock("@/heroes/pages/search/components/SearchControls", () => ({
  SearchControls: () => <div data-testid="search-controls"></div>,
}));

const queryClient = new QueryClient();
const renderHomePage = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryClient}>
        <SearchPage />
      </QueryClientProvider>
    </MemoryRouter>,
  );
};

describe("SearchPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render SearchPage with default values", () => {
    renderHomePage();
    expect(mockUseSearchHeroes).toHaveBeenCalledWith({ name: "", strength: 0 });
  });

  test("should call useSearchHeroes with custom query params", () => {
    const { container } = renderHomePage();
    expect(mockUseSearchHeroes).toHaveBeenCalledWith({
      name: "",
      strength: 0,
    });
    expect(container).toMatchSnapshot();
  });

  test("should call search action with name parameter", () => {
    renderHomePage(["/search?name=superman"]);
    expect(mockUseSearchHeroes).toHaveBeenCalledWith({
      name: "superman",
      strength: 0,
    });
  });

  test("should call search action with strength parameter", () => {
    renderHomePage(["/search?strength=10"]);
    expect(mockUseSearchHeroes).toHaveBeenCalledWith({
      name: "",
      strength: 10,
    });
  });

  test("should call search action with both parameters", () => {
    renderHomePage(["/search?name=batman&strength=6"]);
    expect(mockUseSearchHeroes).toHaveBeenCalledWith({
      name: "batman",
      strength: 6,
    });
  });

  test("should render HeroGrid with search results", () => {
    const mockHeroes = [
      { id: 1, name: "Clark Kenneth" } as unknown as Hero,
      { id: 2, name: "Bruce Wayne" } as unknown as Hero,
    ];

    mockUseSearchHeroes.mockReturnValue({
      data: mockHeroes,
      isLoading: false,
      isSuccess: true,
    } as unknown as ReturnType<typeof useSearchHeroes>);
    renderHomePage();
    const heroGrid = screen.getByTestId("hero-grid");
    expect(heroGrid.innerHTML).toContain("Clark Kenneth");
    expect(heroGrid.innerHTML).toContain("Bruce Wayne");
  });
});
