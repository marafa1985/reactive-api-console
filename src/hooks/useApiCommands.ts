import { useEffect, useState } from "react";
import {
  catchError,
  combineLatest,
  EMPTY,
  filter,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from "rxjs";
import { matchApisByCommand } from "@/core/api/registry";
import type { UserCommand } from "@/core/entity";
import { useChatMessage } from "./useChatMessage";
import { isSpecialCommand, useSpecialCommand } from "./useSpecialCommand";
import { activeApis$ } from "@/store/feature/slices";

export const useApiCommands = () => {
  const { userMessage, systemMessage, errorMessage } = useChatMessage();
  const { handleSpecialCommand } = useSpecialCommand();
  const [userCommand, setCommand] = useState<UserCommand>({
    command: "",
    timestamp: Date.now(),
  });

  useEffect(() => {
    const processCommand$ = of(userCommand)
      .pipe(
        filter(({ command }) => !!command.trim()),
        tap(({ command }) => userMessage(command.trim())),
        withLatestFrom(activeApis$),
        switchMap(([{ command }, activeApis]) => {
          if (isSpecialCommand(command)) {
            return handleSpecialCommand(command);
          }

          return of({ command, activeApis }).pipe(
            switchMap(({ command, activeApis }) => {
              const apiCommands = matchApisByCommand(activeApis, command);
              if (apiCommands.length === 0) {
                systemMessage(`❌ No results for: ${command}`);
                return EMPTY;
              }

              return combineLatest(
                apiCommands.map((response) => response.executeCommand(command))
              ).pipe(
                tap((responses) => {
                  responses.forEach((apiResponse) =>
                    systemMessage(`✅ Executed: ${command}`, apiResponse)
                  );
                })
              );
            })
          );
        }),
        catchError((error) => {
          errorMessage(userCommand.command);
          throw error;
        })
      )
      .subscribe();

    return () => {
      processCommand$.unsubscribe();
    };
  }, [
    errorMessage,
    handleSpecialCommand,
    systemMessage,
    userCommand,
    userMessage,
  ]);

  const executeCommand = (command: string) => {
    setCommand({ command, timestamp: Date.now() });
  };

  return {
    executeCommand,
  };
};
