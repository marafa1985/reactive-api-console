import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { AvailableAPIs } from "./AvailableAPIs";
import {
  apisReducer,
  uiReducer,
  chatReducer,
  activeApis$,
} from "@/store/feature/slices";
import type { Api } from "@/core/entity";

vi.mock("../../molecules/Commands/Commands", () => ({
  Commands: ({ commands }: { commands: string[] }) => (
    <div data-testid="commands">
      {commands.map((command, index) => (
        <div key={index} data-testid={`command-${index}`}>
          {command}
        </div>
      ))}
    </div>
  ),
}));

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

  const createTestStore = (initialState = {}) => {
    return configureStore({
      reducer: {
        apis: apisReducer,
        ui: uiReducer,
        chat: chatReducer,
      },
      preloadedState: initialState,
    });
  };

  const renderWithProvider = (initialState = {}) => {
    const store = createTestStore(initialState);
    return {
      ...render(
        <Provider store={store}>
          <AvailableAPIs onToggleApi={mockOnToggleApi} />
        </Provider>
      ),
      store,
    };
  };

  beforeEach(() => {
    mockOnToggleApi.mockClear();
    // Reset the BehaviorSubject
    activeApis$.next([]);
  });

  it("should render all APIs in the list", () => {
    renderWithProvider({
      apis: { apis: mockApis },
    });

    expect(screen.getByText("Test API 1")).toBeDefined();
    expect(screen.getByText("Test API 2")).toBeDefined();
    expect(screen.getByText("First test API description")).toBeDefined();
    expect(screen.getByText("Second test API description")).toBeDefined();
  });

  it("should call onToggleApi when an API card is clicked", () => {
    renderWithProvider({
      apis: { apis: mockApis },
    });

    const firstApiCard = screen.getByTestId("api-list-item-api-1");
    fireEvent.click(firstApiCard);

    expect(mockOnToggleApi).toHaveBeenCalledWith("api-1");
  });

  it("should handle empty API list", () => {
    renderWithProvider({
      apis: { apis: [] },
    });

    const list = screen.getByTestId("api-list");
    expect(list).toBeDefined();
    expect(list.children).toHaveLength(0);
  });
});
