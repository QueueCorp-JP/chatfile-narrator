import { useState } from "react";

export const useCharacter = () => {
  const [character, setCharacter] = useState<any>(null);

  return {
    character,
    setCharacter,
  };
};