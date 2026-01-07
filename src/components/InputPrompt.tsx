import useUserMessageStore from "@/store/userMessageStore";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

export const InputPrompt = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const addMessage = useUserMessageStore((state) => state.addMessage);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    addMessage(trimmed);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full self-end">
      <div className="w-full flex items-center gap-2 p-2 border rounded-md bg-transparent text-white">
        <input
          type="text"
          placeholder={inputValue ? "" : "Ask simplechat anything..."}
          className="bg-transparent outline-none w-full placeholder:text-white"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading} className="p-2">
          <SendHorizontal />
        </button>
      </div>
    </form>
  );
};
