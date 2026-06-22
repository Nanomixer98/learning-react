import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import * as gifActions from "../actions/get-gifs-by-query.action";
import { useGifs } from "./useGifs";

describe("useGifs", () => {
  test("should return default values and methods", () => {
    const { result } = renderHook(() => useGifs());
    const { gifs, previousTerms, handleSearch, handleTermClicked } =
      result.current;
    expect(gifs.length).toBe(0);
    expect(previousTerms.length).toBe(0);
    expect(handleSearch).toBeInstanceOf(Function);
    expect(handleTermClicked).toBeDefined();
  });

  test("should return a list of gifs", async () => {
    const { result } = renderHook(() => useGifs());
    await act(async () => {
      await result.current.handleSearch("halo");
    });

    expect(result.current.gifs.length).toBe(25);
  });

  test("should return a list of gifs when handleTermClicked is called", async () => {
    const { result } = renderHook(() => useGifs());
    await act(async () => {
      await result.current.handleTermClicked("halo");
    });

    expect(result.current.gifs.length).toBe(25);
  });

  test("should return a list of gifs from cache", async () => {
    const { result } = renderHook(() => useGifs());
    await act(async () => {
      await result.current.handleTermClicked("halo");
    });
    expect(result.current.gifs.length).toBe(25);
    vi.spyOn(gifActions, "getGifsByQuery").mockRejectedValue(
      new Error("Custom error"),
    );
    await act(async () => {
      await result.current.handleTermClicked("halo");
    });
    expect(result.current.gifs.length).toBe(25);
  });

  test("should return no more than 8 previous terms", async () => {
    const { result } = renderHook(() => useGifs());
    vi.spyOn(gifActions, "getGifsByQuery").mockResolvedValue([]);
    await act(async () => {
      await result.current.handleSearch("halo1");
      await result.current.handleSearch("halo2");
      await result.current.handleSearch("halo3");
      await result.current.handleSearch("halo4");
      await result.current.handleSearch("halo5");
      await result.current.handleSearch("halo6");
      await result.current.handleSearch("halo7");
      await result.current.handleSearch("halo8");
      await result.current.handleSearch("halo9");
      await result.current.handleSearch("halo10");
    });
    console.log(result.current.previousTerms);
    expect(result.current.previousTerms.length).toBe(8);
    expect(result.current.previousTerms).toStrictEqual([
      "halo10",
      "halo9",
      "halo8",
      "halo7",
      "halo6",
      "halo5",
      "halo4",
      "halo3",
    ]);
  });
});
