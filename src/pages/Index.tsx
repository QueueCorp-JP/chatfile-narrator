import { CharacterUpload } from "@/components/CharacterUpload";
import { ChatInterface } from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4 animate-fade-up">
          <h1 className="text-4xl font-bold">AI VTuber Creator</h1>
          <p className="text-muted-foreground">Create and chat with your own AI VTuber character</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-8">
          {!showChat ? (
            <>
              <CharacterUpload />
              <Button
                onClick={() => setShowChat(true)}
                variant="outline"
                className="mt-4"
              >
                Start Chatting
              </Button>
            </>
          ) : (
            <>
              <ChatInterface />
              <Button
                onClick={() => setShowChat(false)}
                variant="outline"
                className="mt-4"
              >
                Back to Character Creation
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;