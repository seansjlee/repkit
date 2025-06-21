export const useVoice = (lang: string = 'en-GB') => {
  const speak = (text: string) => {
    if (!window.speechSynthesis) return;

    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  return { speak };
};
