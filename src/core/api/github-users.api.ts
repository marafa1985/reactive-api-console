import type { ApiCommandUseCase } from "../use-case/api-command.use-case";
import type { Api } from "../entity";
import { fetchCommand, headers } from "./utils";

class GithubUsers implements ApiCommandUseCase {
  api: Api = {
    id: "github-users",
    name: "GitHub Users",
    description: "Search GitHub users",
    headers,
    baseUrl: "https://api.github.com/search/users",
    method: "GET",
    examples: ["search github john", "search github octocat"],
    commands: ["search github <username>"],
    isActive: true,
  };

  matchedCommand(command: string): boolean {
    const normalizedCommand = command.toLowerCase().trim().replace(/\s+/g, " ");
    if (normalizedCommand === "search github") {
      return false;
    }
    return this.api.commands.some((cmd) => {
      const normalizedCmd = cmd.replace(/<.*?>/, "").toLowerCase();
      return normalizedCommand.includes(normalizedCmd);
    });
  }

  executeCommand(command: string) {
    const apiUrl = this.buildUrl(command);
    return fetchCommand(apiUrl, this.api);
  }

  private buildUrl(command: string): string {
    const username = command.replace("search github ", "");
    return `${this.api.baseUrl}?q=${username}`;
  }
}

export const githubUsersApi = new GithubUsers();
