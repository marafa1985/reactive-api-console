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
    fetch(apiUrl, {
      method: api.method || "GET",
      headers,
      body: api.body || undefined,
    })
      .then((response) => response.json())
      .then((data) => {
        subscriber.next({
          id: (Date.now() + 1).toString(),
          apiId: api.id,
          timestamp: Date.now(),
          data,
          error: undefined,
          loading: false,
        });
        subscriber.complete();
      })
      .catch((error) => {
        subscriber.error(error);
      });
  });
};
