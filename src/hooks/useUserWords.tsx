import { useMutation, useQuery } from '@tanstack/react-query';
import api from '@src/fetch';
import { Word } from '@src/fetch/responseTypes/word';
import { FormValues } from '@src/components/WordGroupForm';

export interface UpdateWords {
  groupName: string;
  wordsToAdd: string[];
  wordsToDelete: string[];
}

interface UseUserWords {
  onSuccess?: () => void;
  onError?: () => void;
}
export function useUserWords({ onSuccess, onError }: UseUserWords = {}) {
  const userId = localStorage.getItem('userId') ?? '';
  const { mutate, error, data } = useMutation({
    mutationFn: (data: UpdateWords) =>
      api.put('/wordGroups/update', data, {
        apitoken: userId || '',
      }),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: (err) => {
      onError && onError();
    },
  });
  return {
    mutate,
    error,
    data,
  };
}
