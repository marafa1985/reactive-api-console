import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatMessages } from "./ChatMessages";
import type { ChatMessage } from "@/core/entity";

vi.mock("@/components", () => ({
  ChatLog: ({
    filteredMessages,
    searchTerm,
  }: {
    filteredMessages: ChatMessage[];
    searchTerm: string;
  }) => (
    <div data-testid="chat-log">
      ChatLog with {filteredMessages.length} messages, search: {searchTerm}
    </div>
  ),
  ChatSearchResult: ({
    searchTerm,
  }: {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  }) => (
    <div data-testid="chat-search-result">Search result for: {searchTerm}</div>
  ),
  ChatWelcomeMessage: () => (
    <div data-testid="chat-welcome-message">Welcome</div>
  ),
}));

const mockScrollIntoView = vi.fn();
Object.defineProperty(window.HTMLElement.prototype, "scrollIntoView", {
  writable: true,
  value: mockScrollIntoView,
});

describe("ChatMessages", () => {
  const mockSetSearchTerm = vi.fn();

  const mockMessages: ChatMessage[] = [
    {
      id: "1",
      content: "Hello",
      timestamp: 1234567890,
      type: "user",
    },
    {
      id: "2",
      content: "Hi there!",
      timestamp: 1234567891,
      type: "system",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render ChatWelcomeMessage when no messages exist", () => {
    render(
      <ChatMessages
        messages={[]}
        filteredMessages={[]}
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
      />
    );

    expect(screen.getByTestId("chat-welcome-message")).toBeDefined();
    expect(screen.queryByTestId("chat-search-result")).toBeNull();
    expect(screen.getByTestId("chat-log")).toBeDefined();
  });

  it("should render ChatSearchResult when messages exist but filtered messages are empty", () => {
    render(
      <ChatMessages
        messages={mockMessages}
        filteredMessages={[]}
        searchTerm="test"
        setSearchTerm={mockSetSearchTerm}
      />
    );

    expect(screen.getByTestId("chat-search-result")).toBeDefined();
    expect(screen.getByText("Search result for: test")).toBeDefined();
    expect(screen.queryByTestId("chat-welcome-message")).toBeNull();
    expect(screen.getByTestId("chat-log")).toBeDefined();
  });

  it("should render ChatLog with filtered messages when they exist", () => {
    const filteredMessages = [mockMessages[0]];

    render(
      <ChatMessages
        messages={mockMessages}
        filteredMessages={filteredMessages}
        searchTerm="hello"
        setSearchTerm={mockSetSearchTerm}
      />
    );

    expect(screen.getByTestId("chat-log")).toBeDefined();
    expect(
      screen.getByText("ChatLog with 1 messages, search: hello")
    ).toBeDefined();
    expect(screen.queryByTestId("chat-search-result")).toBeNull();
    expect(screen.queryByTestId("chat-welcome-message")).toBeNull();
  });

  it("should scroll to bottom when messages change", () => {
    const { rerender } = render(
      <ChatMessages
        messages={[mockMessages[0]]}
        filteredMessages={[mockMessages[0]]}
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
      />
    );

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });

    rerender(
      <ChatMessages
        messages={mockMessages}
        filteredMessages={mockMessages}
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
      />
    );

    expect(mockScrollIntoView).toHaveBeenCalledTimes(2);
  });
});
