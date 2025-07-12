import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SideBarHeader } from "./SideBarHeader";

describe("SideBarHeader", () => {
  it("should render header with title and close button", () => {
    const mockOnClose = vi.fn();
    render(<SideBarHeader onClose={mockOnClose} />);

    expect(screen.getByText("Available API")).toBeDefined();
    expect(
      screen.getByRole("button", { name: "close side bar" })
    ).toBeDefined();
  });

  it("should call onClose when close button is clicked", () => {
    const mockOnClose = vi.fn();
    render(<SideBarHeader onClose={mockOnClose} />);

    const closeButton = screen.getByRole("button", { name: "close side bar" });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should have proper accessibility attributes", () => {
    const mockOnClose = vi.fn();
    render(<SideBarHeader onClose={mockOnClose} />);

    const closeButton = screen.getByRole("button", { name: "close side bar" });
    expect(closeButton).toBeDefined();

    const header = screen.getByRole("banner");
    expect(header).toBeDefined();
    expect(header.className).toContain("sidebar-header");
  });
});
