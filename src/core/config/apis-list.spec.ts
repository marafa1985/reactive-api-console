import { describe, it, expect } from "vitest";
import { initialApiEndpoints } from "./apis-list";

const getApiByKey = (apiId: string) => {
  const catFactsApi = initialApiEndpoints.find((api) => api.id == apiId);
  if (!catFactsApi) {
    throw Error("can't find cat-facts");
  }

  return catFactsApi;
};

describe("initialApiEndpoints", () => {
  it("should returns baseUrl when getUrl is called in case cat-facts", () => {
    const catFactApi = getApiByKey("cat-facts");
    const githubApi = getApiByKey("github-users");
    const weatherApi = getApiByKey("weather");

    expect(catFactApi.baseUrl).toEqual(catFactApi.getUrl(undefined, undefined));
    expect(githubApi.baseUrl).toEqual(githubApi.getUrl(undefined, undefined));
    expect(weatherApi.baseUrl).toEqual(weatherApi.getUrl(undefined, undefined));
  });

  it("should returns baseUrl/random when getUrl is called, in case chuck-norris", () => {
    const api = getApiByKey("chuck-norris");
    const randApI = `${api.baseUrl}/random`;

    expect(randApI).toEqual(api.getUrl(undefined, undefined));
  });

  it("should returns baseUrl/search when getUrl is called, in case chuck-norris with param", () => {
    const api = getApiByKey("chuck-norris");
    const randApI = `${api.baseUrl}/search`;

    expect(randApI).toEqual(api.getUrl("query=kick", undefined));
  });

  it("should returns baseUrl/random when getUrl is called, in case bored-api", () => {
    const api = getApiByKey("bored-api");
    const randApI = `${api.baseUrl}/random`;

    expect(randApI).toEqual(api.getUrl(undefined, undefined));
  });

  it("should returns baseUrl/search when getUrl is called, in case bored-api with param", () => {
    const api = getApiByKey("bored-api");
    const randApI = `${api.baseUrl}/filter`;

    expect(randApI).toEqual(api.getUrl("type=education", undefined));
  });
});
