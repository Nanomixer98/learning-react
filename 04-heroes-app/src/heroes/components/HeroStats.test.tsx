import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { FavoriteHeroProvider } from "../context/FavoriteHeroContext";
import { useHeroSummary } from "../hooks/useHeroSummary";
import type { SummaryInformationResponse } from "../types/summary-information.response";
import { HeroStats } from "./HeroStats";

vi.mock("../hooks/useHeroSummary");
const mockUseHeroSummary = vi.mocked(useHeroSummary);

const mockHero = {
  id: "1",
  name: "Clark Kent",
  slug: "clark-kent",
  alias: "Superman",
  powers: [
    "Súper fuerza",
    "Vuelo",
    "Visión de calor",
    "Visión de rayos X",
    "Invulnerabilidad",
    "Súper velocidad",
  ],
  description:
    "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
  strength: 10,
  intelligence: 8,
  speed: 9,
  durability: 10,
  team: "Liga de la Justicia",
  image: "1.jpeg",
  firstAppearance: "1938",
  status: "Active",
  category: "Hero",
  universe: "DC",
};
const mockSummaryData = {
  totalHeroes: 25,
  strongestHero: mockHero,
  smartestHero: {
    id: "2",
    name: "Bruce Wayne",
    slug: "bruce-wayne",
    alias: "Batman",
    powers: [
      "Artes marciales",
      "Habilidades de detective",
      "Tecnología avanzada",
      "Sigilo",
      "Genio táctico",
    ],
    description:
      "El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.",
    strength: 6,
    intelligence: 10,
    speed: 6,
    durability: 7,
    team: "Liga de la Justicia",
    image: "2.jpeg",
    firstAppearance: "1939",
    status: "Active",
    category: "Hero",
    universe: "DC",
  },
  heroCount: 18,
  villainCount: 7,
};

const renderHeroStats = (mockData?: Partial<SummaryInformationResponse>) => {
  if (mockData) {
    mockUseHeroSummary.mockReturnValue({
      data: mockData,
    } as unknown as ReturnType<typeof useHeroSummary>);
  } else {
    mockUseHeroSummary.mockReturnValue({
      data: undefined,
    } as unknown as ReturnType<typeof useHeroSummary>);
  }

  return render(
    <FavoriteHeroProvider>
      <HeroStats />
    </FavoriteHeroProvider>,
  );
};

describe("HeroStats", () => {
  test("should render component with default values", () => {
    const { container } = renderHeroStats();

    expect(screen.getByText("Loading...")).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test("should render HeroStats with mock information", () => {
    const { container } = renderHeroStats(mockSummaryData);

    expect(container).toMatchSnapshot();
    expect(screen.getByText("Total Characters"));
    expect(screen.getByText("Favorites"));
  });

  test("should change the percentage of favorites when aa hero is added", () => {
    localStorage.setItem("favorites", JSON.stringify([mockHero]));
    renderHeroStats(mockSummaryData);

    const favoritesPercentageElement = screen.getByTestId(
      "favorite-percentage",
    );
    expect(favoritesPercentageElement.innerHTML).toContain("4.00%");
    const favoritesCountElement = screen.getByTestId("favorite-count");
    expect(favoritesCountElement.innerHTML).toContain("1");
  });
});
