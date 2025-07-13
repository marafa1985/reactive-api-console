import { describe, it, expect } from "vitest";
import { githubUsersApi } from "./github-users.api";

describe("GitHub Users API", () => {
  describe("matchedCommand", () => {
    it("should match valid GitHub Users commands", () => {
      const validCommands = ["search github john", "search github octocat"];

      validCommands.forEach((command) => {
        expect(githubUsersApi.matchedCommand(command)).toBe(true);
      });
    });

    it("should not match invalid commands", () => {
      const invalidCommands = [
        "get cat fact",
        "search chuck joke",
        "get activity",
        "github",
        "github user",
        "search github",
      ];

      invalidCommands.forEach((command) => {
        expect(githubUsersApi.matchedCommand(command)).toBe(false);
      });
    });
  });
});
