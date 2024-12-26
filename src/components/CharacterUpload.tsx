import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const CharacterUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const [characterData, setCharacterData] = useState({
    name: "",
    description: "",
    avatar: null as File | null,
    voiceSample: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "avatar" | "voiceSample") => {
    const file = e.target.files?.[0];
    if (file) {
      setCharacterData((prev) => ({
        ...prev,
        [type]: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Here we'll add the upload logic when we connect to Supabase
      toast({
        title: "Success",
        description: "Character data uploaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload character data.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6 animate-fade-up backdrop-blur-sm bg-white/90">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Character Name</Label>
          <Input
            id="name"
            value={characterData.name}
            onChange={(e) => setCharacterData((prev) => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Character Description</Label>
          <Textarea
            id="description"
            value={characterData.description}
            onChange={(e) => setCharacterData((prev) => ({ ...prev, description: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="avatar">Avatar Image</Label>
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "avatar")}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="voiceSample">Voice Sample</Label>
          <Input
            id="voiceSample"
            type="file"
            accept="audio/*"
            onChange={(e) => handleFileChange(e, "voiceSample")}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full transition-all hover:scale-[1.02]"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Create Character"}
        </Button>
      </form>
    </Card>
  );
};