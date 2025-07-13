import { describe, it, expect } from "vitest";
import { weatherApi } from "./weather.api";

describe("Weather API", () => {
  describe("matchedCommand", () => {
    it("should match valid weather commands", () => {
      const validCommands = [
        "get weather Berlin",
        "get weather Tokyo",
        "get weather New York",
        "get weather London",
        "get weather Paris",
        "get weather 52.52,13.41",
      ];

      validCommands.forEach((command) => {
        expect(weatherApi.matchedCommand(command)).toBe(true);
      });
    });

    it("should not match invalid commands", () => {
      const invalidCommands = [
        "get cat fact",
        "search chuck joke",
        "get activity",
        "search github user",
        "weather",
        "weather Berlin",
        "get weather",
      ];

      invalidCommands.forEach((command) => {
        expect(weatherApi.matchedCommand(command)).toBe(false);
      });
    });
  });
});
