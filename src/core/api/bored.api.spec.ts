import { describe, it, expect } from "vitest";
import { boredApi } from "./bored.api";

describe("Bored API", () => {
  describe("matchedCommand", () => {
    it("should match valid bored activity commands with various spacing", () => {
      const validCommands = [
        "get activity",
        "  get activity",
        "get activity  ",
        "  get activity  ",
        "get  activity",
        "get   activity",
        "get activity",
        "  get   activity  ",
      ];

      validCommands.forEach((command) => {
        expect(boredApi.matchedCommand(command)).toBe(true);
      });
    });

    it("should match partial commands", () => {
      const partialCommands = [
        "get activity please",
        "I want to get activity",
        "can you get activity for me",
        "get activity now",
        "I'm bored, get activity",
      ];

      partialCommands.forEach((command) => {
        expect(boredApi.matchedCommand(command)).toBe(true);
      });
    });

    it("should not match invalid commands", () => {
      const invalidCommands = [
        "get cat fact",
        "get chuck joke",
        "search github user",
        "weather",
        "weather Berlin",
        "get weather",
        "activity",
        "get",
        "bored",
        "",
        "   ",
      ];

      invalidCommands.forEach((command) => {
        expect(boredApi.matchedCommand(command)).toBe(false);
      });
    });
  });
});
