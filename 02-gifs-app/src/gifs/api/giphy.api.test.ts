import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";

describe("giphyApi", () => {
  test("should be setup correctly", () => {
    const { baseURL, params } = giphyApi.defaults;
    expect(baseURL).toBe("https://api.giphy.com/v1/gifs");
    expect(params).toStrictEqual({
      api_key: import.meta.env.VITE_GIPHY_API_KEY,
      lang: "es",
    });
  });
});
