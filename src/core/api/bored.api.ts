import type { ApiCommandUseCase } from "../use-case/api-command.use-case";
import type { Api } from "../entity";
import { fetchCommand, headers } from "./utils";

class Bored implements ApiCommandUseCase {
  api: Api = {
    id: "bored-api",
    name: "Bored API",
    description: "Random activities when bored",
    headers,
    baseUrl: "https://bored-api.appbrewery.com/random",
    method: "GET",
    examples: ["get activity"],
    commands: ["get activity"],
    isActive: true,
  };

  matchedCommand(command: string): boolean {
    const normalizedCommand = command.toLowerCase().trim().replace(/\s+/g, " ");

    return this.api.commands.some((cmd) => {
      const normalizedCmd = cmd.toLowerCase();
      return normalizedCommand.includes(normalizedCmd);
    });
  }

  executeCommand() {
    const apiUrl = this.api.baseUrl;
    return fetchCommand(apiUrl, this.api);
  }
}

export const boredApi = new Bored();
