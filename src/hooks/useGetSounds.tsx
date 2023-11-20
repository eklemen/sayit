import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@src/fetch';
import { SoundKeys, Sounds } from '@src/fetch/responseTypes/sound';

export const useGetSounds = () => {
  const { data, isLoading, error } = useQuery<Sounds>({
    queryKey: ['sounds'],
    queryFn: () => api.get('/sounds'),
  });
  // soundMap contains a key of the sound filename and a value of the presigned url
  const soundMap = useMemo(() => {
    if (data) {
      return data.reduce((acc, sound) => {
        acc[sound.key] = sound.url;
        return acc;
      }, {} as Record<SoundKeys, string>);
    }
  }, [data]);
  return {
    sounds: data,
    isLoading,
    error,
    soundMap,
  };
};
