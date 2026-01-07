import { create } from "zustand";
import { Message, Sender } from "@/lib/types";

interface UserMessageStore {
  messages: Message[];
  addMessage: (text: string, sender?: Sender) => void;
  clearMessages: () => void;
}

const makeMessage = (text: string, sender: Sender = "user"): Message => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  text,
  sender,
  createdAt: Date.now(),
});

const useUserMessageStore = create<UserMessageStore>((set) => ({
  messages: [],
  addMessage: (text: string, sender: Sender = "bot") =>
    set((state) => ({
      messages: [...state.messages, makeMessage(text, sender)],
    })),
  clearMessages: () => set({ messages: [] }),
}));

export default useUserMessageStore;
