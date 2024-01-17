import { atom } from 'recoil';

// Manage Word Group
interface SaveWordsState {
  toaster?: {
    message: string;
    type: 'success' | 'error';
    toastId?: string;
  };
}
export const saveWordsState = atom<SaveWordsState>({
  key: 'saveWordFormStatus',
  default: undefined,
});
/////////////////

// Create New Word
interface Sound {
  letters: string;
  audioKey: string;
}
interface CreateWordState {
  word?: string;
  sounds?: Sound[];
}

export const createWordState = atom<CreateWordState>({
  key: 'createWord',
  default: {
    word: '',
  } as CreateWordState,
});
/////////////////
