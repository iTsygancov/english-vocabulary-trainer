import { Question } from '../../types';
import { words } from './QuestionsGame.data';

export const randomizeIndex = (count: number): number => {
  return Math.floor(count * Math.random());
};

export const randomizeElements = (array: string[], count: number): string[] => {
  if (count > array.length) {
    throw new Error(
      'Array size cannot be smaller than expected random numbers count.'
    );
  }
  const result = [];
  const guardian = new Set();
  while (result.length < count) {
    const index = randomizeIndex(count);
    if (guardian.has(index)) {
      continue;
    }
    const element = array[index];
    guardian.add(index);
    result.push(element);
  }
  return result;
};

export const shuffleLetters = (word: string): string[] => {
  let arrayFromWord = word.split('');
  let arrayLength = arrayFromWord.length;

  for (let i = arrayLength - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = arrayFromWord[i];
    arrayFromWord[i] = arrayFromWord[j];
    arrayFromWord[j] = tmp;
    if (arrayFromWord.join('') === word) i = arrayLength - 1;
  }

  return arrayFromWord;
};

const getSixRandomElements = (arr: string[]): string[] => {
  if (arr.length < 6) {
    throw new Error('Array must have at least 6 elements');
  }
  const shuffled = arr.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, 6);
};

export const getQuestionsData = (): Question[] => {
  const randomWords = getSixRandomElements(words);

  return randomWords.map((word) => ({
    errors: 0,
    shuffledLetters: shuffleLetters(word),
    word: word,
  }));
};
