import { describe, it, expect } from "vitest";
import { chuckNorrisApi } from "./chuck-norris.api";

describe("Chuck Norris API", () => {
  describe("matchedCommand", () => {
    it("should match valid Chuck Norris commands", () => {
      const validCommands = [
        "get chuck joke",
        "search chuck karate",
        "search chuck car",
        "search chuck kick",
      ];

      validCommands.forEach((command) => {
        expect(chuckNorrisApi.matchedCommand(command)).toBe(true);
      });
    });

    it("should match partial commands", () => {
      const partialCommands = [
        "get chuck joke please",
        "I want to get chuck joke",
        "can you search chuck kick for me",
        "search chuck karate now",
      ];

      partialCommands.forEach((command) => {
        expect(chuckNorrisApi.matchedCommand(command)).toBe(true);
      });
    });

    it("should not match invalid commands", () => {
      const invalidCommands = [
        "get cat fact",
        "get activity",
        "search github user",
        "weather",
        "weather Berlin",
        "get weather",
      ];
      invalidCommands.forEach((command) => {
        expect(chuckNorrisApi.matchedCommand(command)).toBe(false);
      });
    });
  });
});
