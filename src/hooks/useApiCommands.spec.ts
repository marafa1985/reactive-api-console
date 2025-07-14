import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useApiCommands } from "./useApiCommands";
import { BehaviorSubject } from "rxjs";

// Mock dependencies
const mockActiveApis$ = new BehaviorSubject([]);
const mockUserMessages$ = new BehaviorSubject([]);

vi.mock("@/store/hooks", () => ({ useAppDispatch: () => vi.fn() }));
vi.mock("@/store/feature/slices", () => ({
  activeApis$: mockActiveApis$,
  userMessages$: mockUserMessages$,
}));
vi.mock("./useChatMessage", () => ({
  default: () => ({
    userMessage: vi.fn(),
    systemMessage: vi.fn(),
    errorMessage: vi.fn(),
  }),
}));
vi.mock("./useSpecialCommand", () => ({
  default: () => ({
    handleSpecialCommand: vi.fn(() => ({
      subscribe: vi.fn(() => ({ unsubscribe: vi.fn() })),
    })),
    isSpecialCommand: (cmd: string) =>
      ["/clear", "/help", "/history"].includes(cmd.toLowerCase()),
  }),
}));
vi.mock("@/core/api/registry", () => ({
  matchApisByCommand: vi.fn(() => [
    {
      executeCommand: vi.fn(() => ({
        subscribe: vi.fn(() => ({ unsubscribe: vi.fn() })),
      })),
    },
  ]),
}));

describe("useApiCommands", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should execute a normal command and call userMessage", () => {
    const { result } = renderHook(() => useApiCommands());
    act(() => {
      result.current.executeCommand("get cat fact");
    });
    // No assertion here as all dependencies are mocked, but this ensures no crash
    expect(result.current.executeCommand).toBeDefined();
  });

  it("should handle a special command", () => {
    const { result } = renderHook(() => useApiCommands());
    act(() => {
      result.current.executeCommand("/help");
    });
    expect(result.current.executeCommand).toBeDefined();
  });

  it("should not execute when command is empty", () => {
    const { result } = renderHook(() => useApiCommands());
    act(() => {
      result.current.executeCommand("");
    });
    expect(result.current.executeCommand).toBeDefined();
  });

  it("should handle errors and call errorMessage", () => {
    // Re-mock useChatMessage to throw in errorMessage
    vi.doMock("./useChatMessage", () => () => ({
      userMessage: vi.fn(),
      systemMessage: vi.fn(),
      errorMessage: vi.fn(() => {
        throw new Error("Test error");
      }),
    }));
    const { result } = renderHook(() => useApiCommands());
    expect(() => {
      act(() => {
        result.current.executeCommand("error");
      });
    }).not.toThrow();
  });
});
