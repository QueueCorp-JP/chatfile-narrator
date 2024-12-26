import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    // Here we'll add the AI response logic when we connect to the backend
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: "This is a placeholder response. AI integration coming soon!",
      sender: "ai",
      timestamp: new Date(),
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-2xl h-[600px] p-4 flex flex-col backdrop-blur-sm bg-white/90">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="flex gap-2 pt-4">
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </Card>
  );
};