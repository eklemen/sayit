import { useQuery } from '@tanstack/react-query';
import api from '@src/fetch';
import { useParams } from 'react-router-dom';
import { Word, WordData } from '@src/fetch/responseTypes/word';

export function useGetWords() {
  const { groupName } = useParams();
  const userId = localStorage.getItem('userId') ?? '';
  const { data, isLoading, error } = useQuery({
    queryKey: ['words'],
    queryFn: () => api.get<Word[]>('/words', { groupName }, { apitoken: userId }),
  });
  const {
    data: allWords,
    isLoading: isLoadingAllWords,
    error: allWordsError,
  } = useQuery({
    queryKey: ['allWords'],
    queryFn: () => api.get<WordData[]>('/words/all', {}, { apitoken: userId }),
  });
  return {
    words: data,
    isLoading,
    error,
    allWords,
    isLoadingAllWords,
    allWordsError,
  };
}
