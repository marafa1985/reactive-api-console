import { useEffect, useState } from "react";
import { BehaviorSubject, debounceTime, tap } from "rxjs";

const messageChange = new BehaviorSubject<string>("");
const messageChange$ = messageChange.asObservable();

export const useCommandInput = () => {
  const [command, setCommand] = useState("");

  useEffect(() => {
    const subscription = messageChange$
      .pipe(
        debounceTime(500),
        tap((value) => {
          setCommand(value);
        })
      )
      .subscribe();
    return () => subscription.unsubscribe();
  }, []);

  const updateCommand = (value: string) => {
    messageChange.next(value);
  };

  const clearCommand = () => {
    messageChange.next("");
    setCommand("");
  };

  return {
    command,
    updateCommand,
    clearCommand,
  };
};
