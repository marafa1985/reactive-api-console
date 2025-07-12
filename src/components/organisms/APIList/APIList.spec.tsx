import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { APIList } from "./APIList";
import type { Api } from "@/core/entity";

describe("APIList", () => {
  const mockOnToggleApi = vi.fn();

  const mockApis: Api[] = [
    {
      id: "api-1",
      name: "Test API 1",
      description: "First test API description",
      baseUrl: "https://api1.test.com",
      method: "GET",
      params: {},
      commands: ["npm install api1", "npm run api1"],
      examples: [],
      isActive: true,
    },
    {
      id: "api-2",
      name: "Test API 2",
      description: "Second test API description",
      baseUrl: "https://api2.test.com",
      method: "POST",
      params: {},
      commands: ["npm install api2"],
      examples: [],
      isActive: false,
    },
  ];

  beforeEach(() => {
    mockOnToggleApi.mockClear();
  });

  it("should render all APIs in the list", () => {
    render(<APIList apis={mockApis} onToggleApi={mockOnToggleApi} />);

    expect(screen.getByText("Test API 1")).toBeDefined();
    expect(screen.getByText("Test API 2")).toBeDefined();
    expect(screen.getByText("First test API description")).toBeDefined();
    expect(screen.getByText("Second test API description")).toBeDefined();
  });

  it("should call onToggleApi when an API card is clicked", () => {
    render(<APIList apis={mockApis} onToggleApi={mockOnToggleApi} />);

    const firstApiCard = screen.getByText("Test API 1").closest("li");
    fireEvent.click(firstApiCard!);

    expect(mockOnToggleApi).toHaveBeenCalledWith("api-1");
  });

  it("should show commands only for active APIs", () => {
    render(<APIList apis={mockApis} onToggleApi={mockOnToggleApi} />);

    // Active API should show commands
    expect(screen.getByText("npm install api1")).toBeDefined();
    expect(screen.getByText("npm run api1")).toBeDefined();

    // Inactive API should not show commands
    expect(screen.queryByText("npm install api2")).toBeNull();
  });

  it("should handle empty API list", () => {
    render(<APIList apis={[]} onToggleApi={mockOnToggleApi} />);

    const list = screen.getByRole("list");
    expect(list).toBeDefined();
    expect(list.children).toHaveLength(0);
  });
});
