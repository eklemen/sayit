import React, { useEffect, useState } from 'react';
import { useUserMutation } from '@src/hooks/useGetUser';
import api from '@src/fetch';
import { Word } from '@src/fetch/responseTypes/word';
import { useGetSounds } from '@src/hooks/useGetSounds';
import { SoundKeys } from '@src/fetch/responseTypes/sound';

function Dashboard() {
  const { user, fetchUser } = useUserMutation();
  const { soundMap } = useGetSounds();
  const [currentCard, setCurrentCard] = useState(0);
  const [words, setWords] = useState<Word[]>([]);
  useEffect(() => {
    if (user) {
      const wordGroup = user?.wordGroups[user?.wordGroups?.length - 1];
      const getWords = async () => {
        const words = await api.get(
          '/words',
          { groupName: wordGroup },
          {
            apitoken: user._id,
          },
        );
        setWords(words);
      };
      getWords();
    } else {
      fetchUser({});
    }
  }, [user]);
  const currentWord = words[currentCard];
  const playAudio = (source: string) => {
    // const source = soundMap ? soundMap[key] : '';
    const audio = new Audio(source);
    audio.play().catch((error) => console.error('Error playing audio:', error));
  };
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex justify-center items-center">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow h-fit flex flex-col">
          {!currentWord && <div>loading...</div>}
          {currentWord && (
            <div className="flex mb-4">
              {currentWord.wordId.sounds.map((sound) => {
                return (
                  <button
                    key={sound._id}
                    className="text-blue-500 underline hover:text-blue-700 mx-0.5 text-8xl"
                    onClick={() => playAudio(soundMap?.[sound.audioKey] || '')}
                  >
                    {sound.letters}
                  </button>
                );
              })}
            </div>
          )}
          {currentWord && (
            <button className="flex">{currentWord.wordId.fullAudio}</button>
          )}
          <div className="flex justify-center">
            <button
              disabled={currentCard === 0}
              onClick={() => setCurrentCard(currentCard - 1)}
            >
              {'<'}
            </button>
            <button
              disabled={currentCard === words.length - 1}
              onClick={() => setCurrentCard(currentCard + 1)}
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
