import { describe, expect, test } from "vitest";
import { getHeroAction } from "./get-hero.action";

describe("getHeroAction", () => {
  test("should fetch data and return with comple image url", async () => {
    const heroe = await getHeroAction("clark-kent");
    const heroeImageUrl = heroe.image;
    expect(heroe).toStrictEqual({
      id: expect.any(String),
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
      image: "http://localhost:3001/images/1.jpeg",
      firstAppearance: "1938",
      status: "Active",
      category: "Hero",
      universe: "DC",
    });

    expect(heroeImageUrl).toContain("http");
  });

  test("should throw an error if hero is not found", async () => {
    const idSlug = "no-exists";
    const result = await getHeroAction(idSlug).catch((error) => {
      expect(error).toBeDefined();
      expect(error.message).toBe("Request failed with status code 404");
    });

    console.log(result);
    expect(result).toBeUndefined();
  });
});
