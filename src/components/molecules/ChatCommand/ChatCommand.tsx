import { useEffect, useState } from "react";
import { BehaviorSubject, debounceTime, tap } from "rxjs";

type ChatCommandProps = {
  onSendCommand: (command: string) => void;
};

const messageChange = new BehaviorSubject<string>("");
const messageChange$ = messageChange.asObservable();

export const ChatCommand = ({ onSendCommand }: ChatCommandProps) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      onSendCommand(command.trim());
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="p-6 border-t border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex space-x-3">
          <input
            id="command"
            type="text"
            onChange={(e) => messageChange.next(e.target.value)}
            placeholder="Type a command... (e.g., 'get cat fact')"
            className="input-primary flex-1"
          />
          <button
            type="submit"
            disabled={!command.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Send
          </button>
        </div>
        <div className="text-xs text-gray-500">
          💡 Try: "get cat fact", "search chuck kick", "get weather Berlin",
          "help"
        </div>
      </form>
    </div>
  );
};
