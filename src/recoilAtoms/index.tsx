import { atom } from 'recoil';

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
