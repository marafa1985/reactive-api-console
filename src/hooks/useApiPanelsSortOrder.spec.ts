import { describe, it, expect, vi, beforeEach } from "vitest";
import { useApiPanelsSortOrder } from "./useApiPanelsSortOrder";
import * as hooks from "@/store/hooks";
import { renderHook } from "@testing-library/react";

// Mock useAppSelector
vi.mock("@/store/hooks", () => ({
  useAppSelector: vi.fn(),
}));

describe("useApiPanelsSortOrder", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns only active APIs sorted by panelOrder", () => {
    const apis = [
      { id: "1", isActive: true, name: "API 1" },
      { id: "2", isActive: false, name: "API 2" },
      { id: "3", isActive: true, name: "API 3" },
    ];
    const panelOrder = [
      { apiId: "3", order: 0 },
      { apiId: "1", order: 1 },
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (hooks.useAppSelector as any).mockImplementation(() => ({
      apis,
      panelOrder,
    }));
    const { result } = renderHook(() => useApiPanelsSortOrder());
    expect(result.current.orderedApis).toEqual([
      { id: "3", isActive: true, name: "API 3" },
      { id: "1", isActive: true, name: "API 1" },
    ]);
  });

  it("returns an empty array if there are no active APIs", () => {
    const apis = [
      { id: "1", isActive: false, name: "API 1" },
      { id: "2", isActive: false, name: "API 2" },
    ];
    const panelOrder = [
      { apiId: "1", order: 0 },
      { apiId: "2", order: 1 },
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (hooks.useAppSelector as any).mockImplementation(() => ({
      apis,
      panelOrder,
    }));
    const { result } = renderHook(() => useApiPanelsSortOrder());
    expect(result.current.orderedApis).toEqual([]);
  });
});
