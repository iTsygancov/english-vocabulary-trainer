import { AppState, CurrentQuestionState } from '../../types';

export const initialCurrentQuestionState: CurrentQuestionState = {
  answer: [],
  currentLetterIndex: 0,
  currentLetterWithErrorIndex: null,
  errorCount: 0,
  shuffledLetters: [],
};

export const initialAppState: AppState = {
  currentQuestionIndex: 0,
  questions: [],
};

export const words: string[] = [
  'apple',
  'application',
  'button',
  'data',
  'function',
  'software',
  'sun',
  'symbol',
  'task',
  'timeout',
  'tragedy',
];
