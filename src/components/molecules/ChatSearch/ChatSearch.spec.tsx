import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ChatSearch } from "./ChatSearch";
import type { ChatMessage } from "@/core/entity";

vi.mock("@/components/atoms", () => ({
  ChatTitle: () => <div data-testid="chat-title">Chat Title</div>,
}));

describe("ChatSearch", () => {
  const mockSetSearchTerm = vi.fn();
  const mockFilteredMessages: ChatMessage[] = [
    {
      id: "1",
      content: "Hello world",
      timestamp: Date.now(),
      type: "user",
    },
    {
      id: "2",
      content: "How are you?",
      timestamp: Date.now(),
      type: "system",
    },
  ];

  const defaultProps = {
    filteredMessages: mockFilteredMessages,
    searchTerm: "",
    setSearchTerm: mockSetSearchTerm,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders chat title and search input", () => {
    render(<ChatSearch {...defaultProps} />);

    expect(screen.getByTestId("chat-title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search chat messages...")
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("updates search term when input changes", () => {
    render(<ChatSearch {...defaultProps} />);

    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, { target: { value: "test search" } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith("test search");
  });

  it("shows clear button and search results count when search term exists", () => {
    render(
      <ChatSearch
        {...defaultProps}
        searchTerm="test"
        filteredMessages={mockFilteredMessages}
      />
    );

    const clearButton = screen.getByText("✕");
    expect(clearButton).toBeInTheDocument();
    expect(screen.getByText("2 messages found")).toBeInTheDocument();
  });

  it("clears search term when clear button is clicked", () => {
    render(
      <ChatSearch
        {...defaultProps}
        searchTerm="test"
        filteredMessages={mockFilteredMessages}
      />
    );

    const clearButton = screen.getByText("✕");
    fireEvent.click(clearButton);

    expect(mockSetSearchTerm).toHaveBeenCalledWith("");
  });

  it("shows singular message count when only one result is found", () => {
    render(
      <ChatSearch
        {...defaultProps}
        searchTerm="test"
        filteredMessages={[mockFilteredMessages[0]]}
      />
    );

    expect(screen.getByText("1 message found")).toBeInTheDocument();
  });
});
