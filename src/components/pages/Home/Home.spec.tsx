import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { HomePage } from "./Home";
import { uiReducer, apisReducer, chatReducer } from "@/store/feature/slices";
import type { Api } from "@/core/entity";

vi.mock("@/components", () => ({
  Header: ({
    sidebarOpen,
    onOpen,
  }: {
    sidebarOpen: boolean;
    onOpen: () => void;
  }) => (
    <header data-testid="header" onClick={onOpen}>
      Header - Sidebar: {sidebarOpen ? "Open" : "Closed"}
    </header>
  ),
  Sidebar: ({
    apis,
    sidebarOpen,
    onToggleApi,
    onClose,
  }: {
    apis: Api[];
    sidebarOpen: boolean;
    onToggleApi: (apiId: string) => void;
    onClose: () => void;
  }) => (
    <aside data-testid="sidebar" onClick={onClose}>
      Sidebar - Open: {sidebarOpen ? "Yes" : "No"} - APIs: {apis.length}
      <button onClick={() => onToggleApi("test-api")}>Toggle API</button>
    </aside>
  ),
}));

describe.skip("HomePage", () => {
  const createTestStore = (initialState = {}) => {
    return configureStore({
      reducer: {
        ui: uiReducer,
        apis: apisReducer,
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
          <HomePage />
        </Provider>
      ),
      store,
    };
  };

  it("should render Header and Sidebar components", () => {
    renderWithProvider();

    expect(screen.getByTestId("header")).toBeDefined();
    expect(screen.getByTestId("sidebar")).toBeDefined();
  });

  it("should pass correct props to Header component", () => {
    const initialState = {
      ui: { sidebarOpen: true },
      apis: { apis: [] },
    };

    renderWithProvider(initialState);

    const header = screen.getByTestId("header");
    expect(header.textContent).toContain("Sidebar: Open");
  });

  it("should pass correct props to Sidebar component", () => {
    const mockApis = [
      {
        id: "api-1",
        name: "Test API",
        description: "Test",
        baseUrl: "https://test.com",
        method: "GET",
        commands: [],
        examples: [],
        isActive: true,
      },
      {
        id: "api-2",
        name: "Test API 2",
        description: "Test 2",
        baseUrl: "https://test2.com",
        method: "POST",
        commands: [],
        examples: [],
        isActive: false,
      },
    ];

    const initialState = {
      ui: { sidebarOpen: false },
      apis: { apis: mockApis },
    };

    renderWithProvider(initialState);

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar.textContent).toContain("Open: No");
    expect(sidebar.textContent).toContain("APIs: 2");
  });

  it("should dispatch setSidebarOpen when Header onOpen is called", () => {
    const { store } = renderWithProvider({
      ui: { sidebarOpen: false },
      apis: { apis: [] },
    });

    const header = screen.getByTestId("header");
    fireEvent.click(header);

    const state = store.getState();
    expect(state.ui.sidebarOpen).toBe(true);
  });

  it("should dispatch setSidebarOpen(false) when Sidebar onClose is called", () => {
    const { store } = renderWithProvider({
      ui: { sidebarOpen: true },
      apis: { apis: [] },
    });

    const sidebar = screen.getByTestId("sidebar");
    fireEvent.click(sidebar);

    const state = store.getState();
    expect(state.ui.sidebarOpen).toBe(false);
  });

  it("should dispatch toggleApi when Sidebar onToggleApi is called", () => {
    const mockApis = [
      {
        id: "test-api",
        name: "Test API",
        description: "Test",
        baseUrl: "https://test.com",
        method: "GET",
        commands: [],
        examples: [],
        isActive: false,
      },
    ];

    const { store } = renderWithProvider({
      ui: { sidebarOpen: true },
      apis: { apis: mockApis },
    });

    const toggleButton = screen.getByText("Toggle API");
    fireEvent.click(toggleButton);

    const state = store.getState();
    expect(state.apis.apis[0].isActive).toBe(true);
  });

  it("should have correct main container styling", () => {
    renderWithProvider();

    const main = screen.getByRole("main");
    expect(main.className).toContain("flex");
    expect(main.className).toContain("h-screen");
    expect(main.className).toContain("bg-gray-50");
  });

  it("should handle initial state with no APIs", () => {
    const { store } = renderWithProvider({
      ui: { sidebarOpen: true },
      apis: { apis: [] },
    });

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar.textContent).toContain("APIs: 0");

    const state = store.getState();
    expect(state.apis.apis).toHaveLength(0);
  });
});
