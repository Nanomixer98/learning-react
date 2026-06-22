import AxiosMockAdapter from "axios-mock-adapter";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { giphySearchResponseMock } from "../../../tests/mock/giphy.response.data";
import { giphyApi } from "../api/giphy.api";
import { getGifsByQuery } from "./get-gifs-by-query.action";

describe("getGifsByQuery", () => {
  let mock = new AxiosMockAdapter(giphyApi);

  beforeEach(() => {
    // mock.reset();
    mock = new AxiosMockAdapter(giphyApi);
  });

  // test("should return an array of gifs", async () => {
  //   const gifs = await getGifsByQuery("One punch");
  //   const [gif1] = gifs;

  //   expect(gif1).toEqual({
  //     height: expect.any(Number),
  //     id: expect.any(String),
  //     title: expect.any(String),
  //     url: expect.any(String),
  //     width: expect.any(Number),
  //   });
  //   expect(gifs.length).toBeGreaterThan(0);
  // });

  test("should return an array of gifs", async () => {
    mock.onGet("/search").reply(200, giphySearchResponseMock);
    const gifs = await getGifsByQuery("One punch");
    expect(gifs.length).toBe(25);
    gifs.forEach((gif) => {
      expect(typeof gif.id).toBe("string");
      expect(typeof gif.title).toBe("string");
      expect(typeof gif.url).toBe("string");
      expect(typeof gif.width).toBe("number");
      expect(typeof gif.height).toBe("number");
    });
  });

  test("should return an empty array of gifs", async () => {
    mock.restore();
    const gifs = await getGifsByQuery("");
    expect(gifs.length).toBe(0);
  });

  test("should handle error when the API return an error", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mock.onGet("/search").reply(400, {
      data: {
        message: "Bad Request",
      },
    });

    const gifs = await getGifsByQuery("halo");
    expect(gifs.length).toBe(0);
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
  });
});
