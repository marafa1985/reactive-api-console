import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ApiPanelHeader from "./ApiPanelHeader";
import { apisReducer, uiReducer } from "@/store/feature/slices";
import { filtersReducer } from "@/store/feature/slices/filtersSlice";
import { responsesReducer } from "@/store/feature/slices/responsesSlice";
import type { Api } from "@/core/entity";

describe("DragPanelHeader", () => {
  vi.mock("@/components", () => ({
    DraggableTab: ({
      api,
      responseCount,
      onSelect,
    }: Record<string, unknown>) => (
      <button
        data-testid={`draggable-tab-${(api as Api).id}`}
        onClick={onSelect as () => void}
      >
        {(api as Api).name} ({responseCount as number})
      </button>
    ),
    DragHint: ({ dragState }: Record<string, unknown>) => (
      <div data-testid="drag-hint">
        {(dragState as unknown as { isDragging: boolean }).isDragging
          ? "Dragging"
          : "Not dragging"}
      </div>
    ),
  }));

  const mockApis: Api[] = [
    {
      id: "api-1",
      name: "API 1",
      description: "desc 1",
      baseUrl: "https://api1.test.com",
      method: "GET",
      params: {},
      commands: [],
      examples: [],
      isActive: true,
    },
    {
      id: "api-2",
      name: "API 2",
      description: "desc 2",
      baseUrl: "https://api2.test.com",
      method: "POST",
      params: {},
      commands: [],
      examples: [],
      isActive: true,
    },
  ];

  const createTestStore = (initialState = {}) =>
    configureStore({
      reducer: {
        apis: apisReducer,
        ui: uiReducer,
        filters: filtersReducer,
        responses: responsesReducer,
      },
      preloadedState: initialState,
    });

  const initialFilters = { global: "", perPanel: {}, activeSearches: {} };
  const initialResponses = { items: [] };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all API tabs", () => {
    const store = createTestStore({
      ui: {
        sidebarOpen: true,
        selectedPanel: null,
        dragState: {
          isDragging: false,
          draggedApiId: null,
          dragOverApiId: null,
        },
      },
      filters: initialFilters,
      responses: initialResponses,
      apis: { apis: mockApis },
    });
    render(
      <Provider store={store}>
        <ApiPanelHeader orderedApis={mockApis} />
      </Provider>
    );
    expect(screen.getByTestId("draggable-tab-api-1")).toBeDefined();
    expect(screen.getByTestId("draggable-tab-api-2")).toBeDefined();
  });

  it("shows DragHint with correct drag state", () => {
    const store = createTestStore({
      ui: {
        sidebarOpen: true,
        selectedPanel: null,
        dragState: {
          isDragging: true,
          draggedApiId: "api-1",
          dragOverApiId: null,
        },
      },
      filters: initialFilters,
      responses: initialResponses,
      apis: { apis: mockApis },
    });
    render(
      <Provider store={store}>
        <ApiPanelHeader orderedApis={mockApis} />
      </Provider>
    );
    expect(screen.getByTestId("drag-hint").textContent).toContain("Dragging");
  });

  it("renders response count for each tab", () => {
    const store = createTestStore({
      ui: {
        sidebarOpen: true,
        selectedPanel: null,
        dragState: {
          isDragging: false,
          draggedApiId: null,
          dragOverApiId: null,
        },
      },
      filters: initialFilters,
      responses: {
        items: [
          { apiId: "api-1", data: {} },
          { apiId: "api-1", data: {} },
          { apiId: "api-2", data: {} },
        ],
      },
      apis: { apis: mockApis },
    });
    render(
      <Provider store={store}>
        <ApiPanelHeader orderedApis={mockApis} />
      </Provider>
    );
    expect(screen.getByTestId("draggable-tab-api-1").textContent).toContain(
      "2"
    );
    expect(screen.getByTestId("draggable-tab-api-2").textContent).toContain(
      "1"
    );
  });
});
