import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { UserCommandInput } from "./UserCommandInputProps";

describe("Commands", () => {
  it("should render with empty commands array", () => {
    render(<UserCommandInput commands={[]} />);

    expect(screen.getByText("Commands:")).toBeDefined();
    expect(screen.getByRole("list")).toBeDefined();
  });

  it("should render with single command", () => {
    const commands = ["npm install"];
    render(<UserCommandInput commands={commands} />);

    expect(screen.getByText("Commands:")).toBeDefined();
    expect(screen.getByText("npm install")).toBeDefined();
    expect(screen.getByRole("list")).toBeDefined();
  });

  it("should render with multiple commands", () => {
    const commands = ["npm install", "npm run dev", "npm test"];
    render(<UserCommandInput commands={commands} />);

    expect(screen.getByText("Commands:")).toBeDefined();
    expect(screen.getByText("npm install")).toBeDefined();
    expect(screen.getByText("npm run dev")).toBeDefined();
    expect(screen.getByText("npm test")).toBeDefined();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });

  it("should render commands in correct order", () => {
    const commands = ["first", "second", "third"];
    render(<UserCommandInput commands={commands} />);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);

    expect(listItems[0].textContent).toBe("first");
    expect(listItems[1].textContent).toBe("second");
    expect(listItems[2].textContent).toBe("third");
  });
});
