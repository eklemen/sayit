import { SoundKeys } from '@src/fetch/responseTypes/sound';

interface Sound {
  letters: string;
  audioKey: SoundKeys;
  _id: string;
}

export interface WordData {
  _id: string;
  word: string;
  fullAudio: string;
  sounds: Sound[];
  __v: number;
}

export interface Word {
  _id: string;
  userId: string;
  wordId: WordData;
  hasCompleted: boolean;
  __v: number;
  groupName: string;
}
