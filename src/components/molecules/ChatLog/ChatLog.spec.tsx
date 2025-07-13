import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChatLog } from "./ChatLog";
import type { ChatMessage } from "@/core/entity";

vi.mock("@/components/atoms", () => ({
  HighlightText: ({ text }: { text: string }) => (
    <span data-testid="highlight-text">{text}</span>
  ),
}));

vi.mock("@/utils", () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(" "),
  formatTimestamp: (timestamp: number) =>
    new Date(timestamp).toLocaleTimeString(),
}));

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    type: "user",
    content: "Hello, how are you?",
    timestamp: 1640995200000, // 2022-01-01 00:00:00
  },
  {
    id: "2",
    type: "system",
    content: "I'm doing well, thank you!",
    timestamp: 1640995260000, // 2022-01-01 00:01:00
    apiResponse: {
      id: "api-1",
      apiId: "weather-api",
      timestamp: 1640995260000,
      data: { temperature: 22 },
    },
  },
  {
    id: "3",
    type: "error",
    content: "Something went wrong with the API call",
    timestamp: 1640995320000, // 2022-01-01 00:02:00
  },
];

describe("ChatLog", () => {
  it("renders all messages with correct content and timestamps", () => {
    render(<ChatLog filteredMessages={mockMessages} searchTerm="" />);

    expect(screen.getByText("Hello, how are you?")).toBeDefined();
    expect(screen.getByText("I'm doing well, thank you!")).toBeDefined();
    expect(
      screen.getByText("Something went wrong with the API call")
    ).toBeDefined();

    const timestamps = screen.getAllByText(/^\d{1,2}:\d{2}:\d{2}/);
    expect(timestamps).toHaveLength(3);
  });

  it("displays correct icons for different message types", () => {
    render(<ChatLog filteredMessages={mockMessages} searchTerm="" />);

    expect(screen.getByText("👤")).toBeDefined();

    expect(screen.getByText("🤖")).toBeDefined();

    expect(screen.getByText("❌")).toBeDefined();
  });

  it("highlights messages that match search term and shows match indicator", () => {
    render(<ChatLog filteredMessages={mockMessages} searchTerm="hello" />);

    // Check if matching message has ring styling (yellow ring)
    const userMessage = screen.getByText("Hello, how are you?").closest("li");
    expect(userMessage?.className).toContain("ring-2");
    expect(userMessage?.className).toContain("ring-yellow-400");

    // Check if match indicator is shown
    expect(screen.getByText("Match")).toBeDefined();
    const matchElement = screen.getByText("Match");
    expect(matchElement.className).toContain("tag");
    expect(matchElement.className).toContain("tag-active");
  });

  it("shows API response information when available", () => {
    render(<ChatLog filteredMessages={mockMessages} searchTerm="" />);

    expect(
      screen.getByText("→ Response sent to weather-api panel")
    ).toBeDefined();
  });

  it("applies correct CSS classes for different message types", () => {
    render(<ChatLog filteredMessages={mockMessages} searchTerm="" />);

    const messageElements = screen.getAllByRole("listitem");

    expect(messageElements[0].className).toContain("message-user");

    expect(messageElements[1].className).toContain("message-system");

    expect(messageElements[2].className).toContain("message-error");
  });
});
