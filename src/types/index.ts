export type Question = {
  errors: number;
  shuffledLetters: string[];
  word: string;
};

export type CurrentQuestionState = {
  answer: string[];
  currentLetterIndex: number;
  currentLetterWithErrorIndex: null | number;
  errorCount: number;
  shuffledLetters: string[];
};

export type AppState = {
  currentQuestionIndex: number;
  questions: Question[];
};

export type LocalStorageState = CurrentQuestionState & AppState;
