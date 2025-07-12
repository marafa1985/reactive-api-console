import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Api, ApiResponse } from "@/core/entity";
import { ApiList } from "@/core/config/apis-list";

export const endpointApi = createApi({
  reducerPath: "endpointApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["endpointApi"],
  endpoints: (builder) => ({
    getApiResponse: builder.query<ApiResponse, Api>({
      query: (api: Api) => {
        const apiWithGetUrl = ApiList.find(
          (endpoint) => endpoint.id === api.id
        );
        if (apiWithGetUrl) {
          return {
            url: apiWithGetUrl.getUrl(api.params, api.body),
            method: api.method || "GET",
            params: api.params || undefined,
            headers: {
              "Content-Type": "application/json",
            },
            body: api.body || undefined,
          };
        }
        return {
          url: api.baseUrl,
          method: api.method || "GET",
          params: api.params || undefined,
          headers: {
            "Content-Type": "application/json",
          },
          body: api.body || undefined,
        };
      },
      providesTags: [{ type: "endpointApi", id: "LIST" }],
    }),
  }),
});

export const { useGetApiResponseQuery } = endpointApi;
