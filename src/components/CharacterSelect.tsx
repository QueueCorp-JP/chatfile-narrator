interface CharacterSelectProps {
  onSelect: (character: any) => void;
}

export const CharacterSelect = ({ onSelect }: CharacterSelectProps) => {
  const characters = [
    { id: 1, name: "Character 1", thumbnail: "/character1.png" },
    { id: 2, name: "Character 2", thumbnail: "/character2.png" },
  ];

  return (
    <div className="flex items-center justify-center h-full">
      <div className="grid grid-cols-2 gap-8">
        {characters.map((character) => (
          <button
            key={character.id}
            onClick={() => onSelect(character)}
            className="p-4 border rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <img
              src={character.thumbnail}
              alt={character.name}
              className="w-48 h-48 object-cover mb-2"
            />
            <div className="text-center">{character.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};