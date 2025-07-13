import type { ApiCommandUseCase } from "../use-case/api-command.use-case";
import { weatherApi } from "./weather.api";
import { boredApi } from "./bored.api";
import { catFactApi } from "./cat-fact.api";
import { chuckNorrisApi } from "./chuck-norris.api";
import { githubUsersApi } from "./github-users.api";
import type { Api } from "../entity";

export const apiRegistry: ApiCommandUseCase[] = [
  catFactApi,
  chuckNorrisApi,
  boredApi,
  githubUsersApi,
  weatherApi,
];

export const getApiById = (id: string): ApiCommandUseCase | undefined =>
  apiRegistry.find(({ api }) => api.id === id);

export const matchApisByCommand = (
  apis: Api[],
  command: string
): ApiCommandUseCase[] => {
  const matchedApis = [];

  for (const api of apis) {
    const apiCommandUseCase = getApiById(api.id);
    if (apiCommandUseCase && apiCommandUseCase.matchedCommand(command)) {
      matchedApis.push(apiCommandUseCase);
    }
  }

  return matchedApis;
};
