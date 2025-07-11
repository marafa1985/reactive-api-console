import { type ReactNode } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import type { ApiEndpoint, ApiResponse } from "@/core/entity";
import { endpointApi, useGetApiResponseQuery } from "./endpointApi";

// Move Wrapper below imports to avoid parsing ambiguity

describe("endpointApi", () => {
  function Wrapper({ children }: { children: ReactNode }) {
    return <ApiProvider api={endpointApi}>{children}</ApiProvider>;
  }

  const api: ApiEndpoint = {
    id: "test-api",
    name: "Test API",
    description: "A test API endpoint",
    baseUrl: "https://example.com/api",
    getUrl: () => "https://example.com/api",
    method: "GET",
    params: {},
    commands: [],
    examples: [],
    isActive: true,
  };

  const mockResponse: ApiResponse = {
    id: "1",
    apiId: "test-api",
    timestamp: Date.now(),
    data: { message: "success" },
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return data on success", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      status: 200,
      ok: true,
      json: async () => mockResponse,
      clone() {
        return this;
      },
      text: async () => JSON.stringify(mockResponse),
    } as Response);

    const { result } = renderHook(() => useGetApiResponseQuery(api), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.data).toMatchObject(mockResponse);
      expect(result.current.isSuccess).toBe(true);
    });
  });

  it("should handle error response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      json: async () => ({ message: "error" }),
    } as Response);

    const { result } = renderHook(() => useGetApiResponseQuery(api), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.error).toBeDefined();
      expect(result.current.isError).toBe(true);
    });
  });
});
