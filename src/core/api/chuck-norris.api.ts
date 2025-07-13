import type { ApiCommandUseCase } from "../use-case/api-command.use-case";
import type { Api } from "../entity";
import { fetchCommand, headers } from "./utils";

class ChuckNorris implements ApiCommandUseCase {
  api: Api = {
    id: "chuck-norris",
    name: "Chuck Norris Jokes",
    description: "Chuck Norris jokes and search",
    headers,
    baseUrl: "https://api.chucknorris.io/jokes",
    method: "GET",
    examples: ["get chuck joke", "search chuck karate", "search chuck car"],
    commands: ["get chuck joke", "search chuck <category>"],
    isActive: true,
  };

  matchedCommand(command: string): boolean {
    const normalizedCommand = command.toLowerCase().trim().replace(/\s+/g, " ");
    if (normalizedCommand === "get chuck joke") {
      return true;
    }

    if (normalizedCommand === "search chuck") {
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
    if (command === "get chuck joke") {
      return `${this.api.baseUrl}/random`;
    }

    const category = command.split(" ")[2];
    return `${this.api.baseUrl}/search?query=${category}`;
  }
}

export const chuckNorrisApi = new ChuckNorris();
