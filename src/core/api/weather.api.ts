import type { ApiCommandUseCase } from "../use-case/api-command.use-case";
import type { Api } from "../entity";
import { fetchCommand, headers } from "./utils";

export const CITY_COORDINATES: Record<string, { lat: number; lon: number }> = {
  tokyo: { lat: 35.6762, lon: 139.6503 },
  berlin: { lat: 52.52, lon: 13.41 },
  london: { lat: 51.5074, lon: -0.1278 },
  paris: { lat: 48.8566, lon: 2.3522 },
  "new york": { lat: 40.7128, lon: -74.006 },
};

class Weather implements ApiCommandUseCase {
  api: Api = {
    id: "weather",
    name: "Weather",
    description: "Weather information",
    headers,
    baseUrl: "https://api.open-meteo.com/v1/forecast",
    method: "GET",
    examples: [
      "get weather Berlin",
      "get weather Tokyo",
      "get weather 52.52,13.41",
    ],
    commands: ["get weather <city>"],
    isActive: true,
  };

  matchedCommand(command: string): boolean {
    const normalizedCommand = command.toLowerCase().trim().replace(/\s+/g, " ");
    if (normalizedCommand === "get weather") {
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
    const city = command.toLowerCase().replace("get weather ", "").trim();
    let coordinates = CITY_COORDINATES[city];

    if (!coordinates) {
      const [lat, lon] = city.split(",").map((coord) => Number(coord));
      coordinates = { lat, lon };
    }

    const { lat, lon } = coordinates;
    return `${this.api.baseUrl}?latitude=${lat}&longitude=${lon}&current_weather=true`;
  }
}

export const weatherApi = new Weather();
