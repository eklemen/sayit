export const useTextToSpeech = () => {
  const speak = (text: string) => {
    if (!text) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    // Fetch the list of voices and find the one named "Aaron"
    // let voices = synth.getVoices();
    // let aaronVoice = voices.find(voice => voice.name === 'Google US English');
    //
    // if (aaronVoice) {
    //   utterance.voice = aaronVoice;
    // } else {
    //   console.log('Aaron voice not found, using default voice.');
    // }

    // You can still customize pitch, rate, etc.
    // utterance.pitch = 1.2;
    // utterance.rate = 1.1;

    synth.speak(utterance);
  };

  return {
    speak,
  };
};
