import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { getSummaryAction } from "../actions/get-summary.action";
import type { SummaryInformationResponse } from "../types/summary-information.response";
import { useHeroSummary } from "./useHeroSummary";

vi.mock("../actions/get-summary.action", () => ({
  getSummaryAction: vi.fn(),
}));
const mockGetSummaryAction = vi.mocked(getSummaryAction);
beforeEach(() => {
  mockGetSummaryAction.mockClear();
});

const tanStackCustomProvider = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useHeroSummary", () => {
  test("should return the initial state (isLoading)", () => {
    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  test("should return success state with data when API call succeds", async () => {
    const mockSummaryData = {
      totalHeroes: 33,
      strongestHero: { id: "1", name: "Superman" },
      smartestHero: { id: "2", name: "Batman" },
      heroCount: 30,
      villainCount: 3,
    } as unknown as SummaryInformationResponse;

    mockGetSummaryAction.mockResolvedValue(mockSummaryData);
    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toHaveProperty("totalHeroes");
    expect(mockGetSummaryAction).toHaveBeenCalled();
  });

  test("should return error state when API call fails", async () => {
    const mockError = new Error("Failed to fetch summary");
    mockGetSummaryAction.mockRejectedValue(mockError);
    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeDefined();
    expect(result.current.isLoading).toBe(false);
    expect(mockGetSummaryAction).toHaveBeenCalled();
    expect(mockGetSummaryAction).toHaveBeenCalledTimes(1);
  });
});
