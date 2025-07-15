import { Observable } from "rxjs";
import type { Api, ApiResponse } from "../entity";

export const headers = {
  "Content-Type": "application/json",
};

export const fetchCommand = (
  apiUrl: string,
  api: Api
): Observable<ApiResponse> => {
  return new Observable<ApiResponse>((subscriber) => {
    try {
      fetch(apiUrl, {
        method: api.method || "GET",
        headers,
        body: api.body || undefined,
      })
        .then((response) => {
          if (response.status === 500) {
            return {
              error: {
                status: response.status,
                statusText: response.statusText,
              },
            };
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          subscriber.next({
            id: (Date.now() + 1).toString(),
            apiId: api.id,
            timestamp: Date.now(),
            data: data.error || data,
            error: data?.error,
            loading: false,
          });
          subscriber.complete();
        })
        .catch((error) => {
          subscriber.error(error);
        });
    } catch (error) {
      subscriber.error(error);
    }
  });
};
