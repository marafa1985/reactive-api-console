import { useEffect, useState } from "react";
import { debounceTime, BehaviorSubject as Subject, tap } from "rxjs";

type ChatCommandProps = {
  onSendCommand: (command: string) => void;
};

const messageChange = new Subject<string>("");
const messageChange$ = messageChange.asObservable();

export const ChatCommand = ({ onSendCommand }: ChatCommandProps) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  useEffect(() => {
    const subscription$ = messageChange$
      .pipe(
        debounceTime(500),
        tap((value) => setDisabled(!value.trim()))
      )
      .subscribe();
    return () => subscription$.unsubscribe();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (messageChange.value.trim()) {
      onSendCommand(messageChange.value.trim());
      (e.target as HTMLFormElement).reset();
      setDisabled(true);
    }
  };

  return (
    <div className="p-6 border-t border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex space-x-3">
          <input
            id="command"
            type="text"
            onInput={(e) => messageChange.next(e.currentTarget.value)}
            placeholder="Type a command... (e.g., 'get cat fact')"
            className="input-primary flex-1"
          />
          <button
            type="submit"
            disabled={disabled}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Send
          </button>
        </div>
        <div className="text-xs text-gray-500">
          💡 Try: "help", "get cat fact", "search chuck kick", "get weather
          Berlin", "history", "clear"
        </div>
      </form>
    </div>
  );
};
