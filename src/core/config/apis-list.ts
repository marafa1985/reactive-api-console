import type { Api, ApiWithHandler } from "../entity";

export const headers = {
  "Content-Type": "application/json",
};

export const ApiList: ApiWithHandler[] = [
  {
    id: "cat-facts",
    name: "Cat Facts",
    description: "Random cat facts",
    headers,
    baseUrl: "https://catfact.ninja/fact",

    method: "GET",
    examples: ["get cat fact"],
    commands: ["get cat fact"],
    isActive: true,
    getUrl: function () {
      return this.baseUrl;
    },
  },
  {
    id: "chuck-norris",
    name: "Chuck Norris Jokes",
    description: "Chuck Norris jokes and search",
    headers,
    baseUrl: "https://api.chucknorris.io/jokes",
    method: "GET",
    examples: ["get chuck joke", "search chuck karate", "search chuck car"],
    commands: ["get chuck joke", "search chuck karate", "search chuck car"],
    isActive: true,
    getUrl: function (params?: Record<string, unknown>, body?: string) {
      if (params || body) {
        return `${this.baseUrl}/search`;
      }
      return `${this.baseUrl}/random`;
    },
  },
  {
    id: "bored-api",
    name: "Bored API",
    description: "Random activities when bored",
    headers,
    baseUrl: "https://bored-api.appbrewery.com/random",
    method: "GET",
    examples: ["get activity"],
    commands: ["get activity"],
    isActive: true,
    getUrl: function (params?: Record<string, unknown>, body?: string) {
      if (params || body) {
        return `${this.baseUrl}/filter`;
      }
      return `${this.baseUrl}/random`;
    },
  },
  {
    id: "github-users",
    name: "GitHub Users",
    description: "Search GitHub users",
    headers,
    baseUrl: "https://api.github.com/search/users",
    method: "GET",
    examples: ["search github john", "search github octocat"],
    commands: ["search github <username>"],
    isActive: true,
    getUrl: function () {
      return this.baseUrl;
    },
  },
  {
    id: "weather",
    name: "Weather",
    description: "Weather information",
    headers,
    baseUrl: "https://api.open-meteo.com/v1/forecast",
    method: "GET",
    examples: ["get weather Berlin", "get weather Tokyo"],
    commands: ["get weather <city>"],
    isActive: true,
    getUrl: function () {
      return this.baseUrl;
    },
  },
];

export const initialApis: Api[] = ApiList.map(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ getUrl, transformResponse, ...api }) => {
    return {
      ...api,
    };
  }
);
