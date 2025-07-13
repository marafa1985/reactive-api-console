import type { Observable } from "rxjs";
import type { Api, ApiResponse } from "../entity";

export interface ApiCommandUseCase {
  api: Api;
  executeCommand: (command: string) => Observable<ApiResponse>;
  matchedCommand: (command: string) => boolean;
}
