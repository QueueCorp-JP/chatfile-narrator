export const useVoice = () => {
  const speak = async (text: string) => {
    // Voice synthesis implementation will go here
    console.log("Speaking:", text);
  };

  return {
    speak,
  };
};