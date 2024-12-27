import { useState } from "react";
import { Live2DCanvas } from "./components/Live2DCanvas";
import { ChatBox } from "./components/ChatBox";
import { CharacterSelect } from "./components/CharacterSelect";
import { useCharacter } from "./hooks/useCharacter";
import { useChat } from "./hooks/useChat";
import { useVoice } from "./hooks/useVoice";

function App() {
  const [isCharacterSelected, setIsCharacterSelected] = useState(false);
  const { character, setCharacter } = useCharacter();
  const { messages, addMessage } = useChat();
  const { speak } = useVoice();

  const handleCharacterSelect = (selectedCharacter: any) => {
    setCharacter(selectedCharacter);
    setIsCharacterSelected(true);
  };

  const handleSendMessage = async (message: string) => {
    if (!character) return;

    addMessage({ role: "user", content: message });

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          character: character.name,
        }),
      });

      const data = await response.json();
      const reply = data.message;

      addMessage({ role: "assistant", content: reply });
      speak(reply);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        {isCharacterSelected ? (
          <>
            <div className="flex-1 relative">
              <Live2DCanvas />
            </div>
            <div className="h-1/4 bg-white p-4">
              <ChatBox messages={messages} onSendMessage={handleSendMessage} />
            </div>
          </>
        ) : (
          <CharacterSelect onSelect={handleCharacterSelect} />
        )}
      </div>
    </div>
  );
}

export default App;