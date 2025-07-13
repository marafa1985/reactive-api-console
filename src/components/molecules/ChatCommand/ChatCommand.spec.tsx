import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ChatCommand } from "./ChatCommand";

vi.mock("rxjs", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;

  return {
    ...actual,
    debounceTime: () => (source: unknown) => source, // Remove debouncing
  };
});

describe("ChatCommand", () => {
  const mockOnSendCommand = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders command input and send button", () => {
    render(<ChatCommand onSendCommand={mockOnSendCommand} />);

    expect(screen.getByPlaceholderText(/type a command/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /send/i })).toBeDefined();
    expect(screen.getByText(/💡 Try:/)).toBeDefined();
  });

  it("submits command when form is submitted with valid input", async () => {
    render(<ChatCommand onSendCommand={mockOnSendCommand} />);

    const input = screen.getByPlaceholderText(/type a command/i);
    const submitButton = screen.getByRole("button", {
      name: /send/i,
    }) as HTMLButtonElement;

    fireEvent.change(input, { target: { value: "get cat fact" } });

    await waitFor(() => {
      expect(submitButton.disabled).toBe(false);
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSendCommand).toHaveBeenCalledWith("get cat fact");
    });
  });

  it("trims whitespace from command before submission", async () => {
    render(<ChatCommand onSendCommand={mockOnSendCommand} />);

    const input = screen.getByPlaceholderText(/type a command/i);
    const submitButton = screen.getByRole("button", {
      name: /send/i,
    }) as HTMLButtonElement;

    fireEvent.change(input, { target: { value: "  get cat fact  " } });

    await waitFor(() => {
      expect(submitButton.disabled).toBe(false);
    });

    // Submit the form
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSendCommand).toHaveBeenCalledWith("get cat fact");
    });
  });
});
