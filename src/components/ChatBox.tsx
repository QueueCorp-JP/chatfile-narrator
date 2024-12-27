import { useState } from "react";
import { Message } from "../types";

interface ChatBoxProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export const ChatBox = ({ messages, onSendMessage }: ChatBoxProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-4 py-2 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {message.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};