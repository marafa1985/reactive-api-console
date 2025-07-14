import { ChatMessages, ChatSearch } from "@/components";
import { useChat } from "@/hooks";
import { selectChatMessages, userMessages$ } from "@/store/feature/slices";
import { useAppSelector } from "@/store/hooks";

export const ChatPanel = () => {
  const messages = useAppSelector(selectChatMessages);
  const { searchTerm, setSearchTerm, filteredMessages } = useChat(messages);
  userMessages$.next(messages);

  return (
    <>
      <ChatSearch
        filteredMessages={filteredMessages}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <ChatMessages
        filteredMessages={filteredMessages}
        messages={messages}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </>
  );
};
