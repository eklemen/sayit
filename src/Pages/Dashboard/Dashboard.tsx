import React, { useEffect, useState } from 'react';
import { useGetUser } from '@src/hooks/useGetUser';
import api from '@src/fetch';
import { Word } from '@src/fetch/responseTypes/word';
import { useGetSounds } from '@src/hooks/useGetSounds';
import { useQuery } from '@tanstack/react-query';

function Dashboard() {
  const { user, userLoading } = useGetUser();
  const wordGroup = user?.wordGroups[user?.wordGroups?.length - 1];
  const { soundMap } = useGetSounds();
  const { data: words, isLoading: loadingWords } = useQuery({
    queryKey: ['words', wordGroup],
    queryFn: () =>
      api.get<Word[]>(
        '/words',
        { groupName: wordGroup },
        {
          apitoken: user?._id || '',
        },
      ),
    enabled: !!wordGroup,
  });
  const [currentCard, setCurrentCard] = useState(0);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  useEffect(() => {
    if (words) {
      setCurrentWord(words[currentCard]);
    }
  }, [words]);
  const playAudio = (source: string) => {
    // const source = soundMap ? soundMap[key] : '';
    const audio = new Audio(source);
    audio.play().catch((error) => console.error('Error playing audio:', error));
  };
  return (
    <div className="flex-center h-full">
      <div className="flex-center flex-col">
        <div className="card">
          {userLoading || loadingWords || !currentWord ? <div>loading...</div> : null}
          {currentWord && (
            <div className="flex mb-4">
              {currentWord.wordId.sounds.map((sound) => {
                return (
                  <button
                    key={sound._id}
                    className="link mx-0.5 text-8xl"
                    onClick={() => playAudio(soundMap?.[sound.audioKey] || '')}
                  >
                    {sound.letters}
                  </button>
                );
              })}
            </div>
          )}
          {/*{currentWord && (*/}
          {/*  <button className="flex">{currentWord.wordId.fullAudio}</button>*/}
          {/*)}*/}
        </div>
        <div className="flex justify-center">
          <button
            disabled={currentCard === 0}
            onClick={() => setCurrentCard(currentCard - 1)}
          >
            {'<'}
          </button>
          <button
            disabled={loadingWords || currentCard === (words?.length ?? 0) - 1}
            onClick={() => setCurrentCard(currentCard + 1)}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
