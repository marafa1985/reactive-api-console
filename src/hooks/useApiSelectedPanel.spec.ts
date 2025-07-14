import { describe, it, expect, vi, beforeEach } from "vitest";
import { useApiSelectedPanel } from "./useApiSelectedPanel";
import * as hooks from "@/store/hooks";
import * as sortOrderHook from "./useApiPanelsSortOrder";
import { renderHook } from "@testing-library/react";

vi.mock("@/store/hooks", () => ({
  useAppSelector: vi.fn(),
}));
vi.mock("./useApiPanelsSortOrder", () => ({
  useApiPanelsSortOrder: vi.fn(),
}));

describe("useApiSelectedPanel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns correct selectedPanel, selectedApi, and responses when active panel matches", () => {
    const orderedApis = [
      { id: "1", name: "API 1" },
      { id: "2", name: "API 2" },
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (sortOrderHook.useApiPanelsSortOrder as any).mockReturnValue({
      orderedApis,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (hooks.useAppSelector as any)
      .mockImplementationOnce(() => "1") // activePanel
      .mockImplementationOnce(() => [
        { apiId: "1", data: "foo" },
        { apiId: "2", data: "bar" },
      ]); // panelResponses
    const { result } = renderHook(() => useApiSelectedPanel());
    expect(result.current.selectedPanel).toEqual({ id: "1", name: "API 1" });
    expect(result.current.selectedApi).toEqual({ id: "1", name: "API 1" });
    expect(result.current.responses).toEqual([{ apiId: "1", data: "foo" }]);
  });

  it("returns undefined and empty array when no active panel matches", () => {
    const orderedApis = [
      { id: "1", name: "API 1" },
      { id: "2", name: "API 2" },
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (sortOrderHook.useApiPanelsSortOrder as any).mockReturnValue({
      orderedApis,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (hooks.useAppSelector as any)
      .mockImplementationOnce(() => "3") // activePanel (no match)
      .mockImplementationOnce(() => [
        { apiId: "1", data: "foo" },
        { apiId: "2", data: "bar" },
      ]); // panelResponses
    const { result } = renderHook(() => useApiSelectedPanel());
    expect(result.current.selectedPanel).toBeUndefined();
    expect(result.current.selectedApi).toBeUndefined();
    expect(result.current.responses).toEqual([]);
  });
});
