import { useState } from "react";
import { Message } from "../types";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return {
    messages,
    addMessage,
  };
};