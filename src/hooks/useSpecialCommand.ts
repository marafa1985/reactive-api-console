import {
  activeApis$,
  clearMessages,
  userMessages$,
} from "@/store/feature/slices";
import { useChatMessage } from "./useChatMessage";
import { useAppDispatch } from "@/store/hooks";
import { EMPTY, of, take, tap } from "rxjs";

type SpecialCommand = "clear" | "help" | "history";
export const isSpecialCommand = (command: string): command is SpecialCommand =>
  ["clear", "help", "history"].includes(command.toLowerCase().trim());

export const useSpecialCommand = () => {
  const dispatch = useAppDispatch();
  const { systemMessage } = useChatMessage();

  const handleSpecialCommand = (command: SpecialCommand) => {
    switch (command) {
      case "clear":
        return of(command).pipe(
          tap(() => {
            dispatch(clearMessages());
            dispatch({ type: "responses/clearResponses" });
          })
        );

      case "help":
        return activeApis$.pipe(
          take(1),
          tap((activeApis) => {
            let helpText = "🤖 Available Commands:\n\n";

            helpText += "📋 Special Commands:\n";
            helpText += "• clear - Clear chat and results\n";
            helpText += "• help - Show this help message\n";
            helpText += "• history - Show command history\n\n";

            activeApis.forEach((api) => {
              helpText += `🔌 ${api.name}:\n`;
              api.examples.forEach((example) => {
                helpText += `• ${example} - ${example}\n`;
              });
              helpText += "\n";
            });

            systemMessage(helpText);
          })
        );

      case "history":
        return userMessages$.pipe(
          take(1),
          tap((userMessages) => {
            const historyText =
              userMessages.length > 0
                ? "📜 Command History:\n" +
                  userMessages.map((msg) => `• ${msg.content}`).join("\n")
                : "📜 No command history yet.";

            systemMessage(historyText);
          })
        );

      default:
        return EMPTY;
    }
  };

  return {
    handleSpecialCommand,
  };
};
