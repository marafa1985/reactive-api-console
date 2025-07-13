import type { ApiCommandUseCase } from "../use-case/api-command.use-case";
import type { Api } from "../entity";
import { fetchCommand, headers } from "./utils";

class CatFact implements ApiCommandUseCase {
  api: Api = {
    id: "cat-facts",
    name: "Cat Facts",
    description: "Random cat facts",
    headers,
    baseUrl: "https://catfact.ninja/fact",
    method: "GET",
    examples: ["get cat fact"],
    commands: ["get cat fact"],
    isActive: true,
  };

  matchedCommand(command: string) {
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

export const catFactApi = new CatFact();
