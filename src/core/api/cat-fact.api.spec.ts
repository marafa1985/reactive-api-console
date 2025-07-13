import { describe, it, expect } from "vitest";
import { catFactApi } from "./cat-fact.api";

describe("Cat Fact API", () => {
  describe("matchedCommand", () => {
    it("should match valid cat fact commands with various spacing", () => {
      const validCommands = [
        "get cat fact",
        "  get cat fact",
        "get cat fact  ",
        "  get cat fact  ",
        "get  cat fact",
        "get   cat    fact",
        "get cat  fact",
        "  get   cat   fact  ",
      ];

      validCommands.forEach((command) => {
        expect(catFactApi.matchedCommand(command)).toBe(true);
      });
    });

    it("should match partial commands", () => {
      const partialCommands = [
        "get cat fact please",
        "I want to get cat fact",
        "can you get cat fact for me",
        "get cat fact now",
      ];

      partialCommands.forEach((command) => {
        expect(catFactApi.matchedCommand(command)).toBe(true);
      });
    });

    it("should not match invalid commands", () => {
      const invalidCommands = [
        "get weather",
        "search chuck joke",
        "get activity",
        "search github user",
        "cat fact",
        "get fact",
        "get cat",
        "fact",
        "cat",
        "",
        "   ",
      ];

      invalidCommands.forEach((command) => {
        expect(catFactApi.matchedCommand(command)).toBe(false);
      });
    });
  });
});
