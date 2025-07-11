import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiEndpoint, ApiResponse } from "../../../core/entity";

export const endpointApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["api"],
  endpoints: (builder) => ({
    getApiResponse: builder.query<ApiResponse, ApiEndpoint>({
      query: (api: ApiEndpoint) => ({
        url: api.baseUrl,
        method: api.method || "GET",
        params: api.params || undefined,
        headers: {
          "Content-Type": "application/json",
        },
        body: api.body || undefined,
      }),
      providesTags: [{ type: "api", id: "LIST" }],
    }),
  }),
});

export const { useGetApiResponseQuery } = endpointApi;
