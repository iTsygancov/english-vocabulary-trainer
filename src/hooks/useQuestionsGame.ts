import { useEffect, useState } from 'react';
import {
  initialAppState,
  initialCurrentQuestionState,
} from '../components/QuestionsGame/QuestionsGame.data';
import { getQuestionsData } from '../components/QuestionsGame/QuestionsGame.utils';
import { AppState, CurrentQuestionState, LocalStorageState } from '../types';
import useKeyPress from './useKeyPress';
import { useLocalStorage } from './useLocalStorage';

const TIME_DELAY = 500;
const LOCALSTORAGE_NAME = 'state';

export const useQuestionsGame = () => {
  const [currentQuestionState, setCurrentQuestionState] =
    useState<CurrentQuestionState>(initialCurrentQuestionState);
  const [appState, setAppState] = useState<AppState>(initialAppState);
  const [isConfirmWindowShown, setIsConfirmWindowShown] = useState(false);

  const [getLocalStorage, setLocalStorage] = useLocalStorage(LOCALSTORAGE_NAME);
  const {
    answer,
    currentLetterIndex,
    currentLetterWithErrorIndex,
    errorCount,
    shuffledLetters,
  } = currentQuestionState;
  const { currentQuestionIndex, questions } = appState;
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    setIsConfirmWindowShown(true);
  }, []);

  useEffect(() => {
    const localStorage: LocalStorageState = getLocalStorage();
    if (
      isConfirmWindowShown &&
      localStorage &&
      window.confirm('Do you want to continue your previous game?')
    ) {
      setAppState({
        currentQuestionIndex: localStorage.currentQuestionIndex,
        questions: localStorage.questions,
      });
      setCurrentQuestionState({
        answer: localStorage.answer,
        currentLetterIndex: localStorage.currentLetterIndex,
        currentLetterWithErrorIndex: localStorage.currentLetterWithErrorIndex,
        errorCount: localStorage.errorCount,
        shuffledLetters: localStorage.shuffledLetters,
      });
    } else {
      setAppState((prevState) => ({
        ...prevState,
        questions: getQuestionsData(),
      }));
    }
  }, [isConfirmWindowShown]);

  useEffect(() => {
    if (questions.length > 0) {
      setLocalStorage({
        currentQuestionIndex,
        questions,
        answer,
        currentLetterIndex,
        currentLetterWithErrorIndex,
        errorCount,
        shuffledLetters,
      });
    }
  }, [
    questions,
    currentQuestionIndex,
    currentLetterIndex,
    answer,
    currentLetterWithErrorIndex,
    errorCount,
    shuffledLetters,
  ]);

  useEffect(() => {
    if (currentQuestion) {
      setCurrentQuestionState((prevState) => ({
        ...prevState,
        shuffledLetters: currentQuestion?.shuffledLetters,
      }));
    }
  }, [currentQuestion?.word]);

  useEffect(() => {
    if (errorCount >= 3) {
      setCurrentQuestionState((prevState) => ({
        ...prevState,
        answer: currentQuestion?.word.split(''),
        currentLetterIndex: currentQuestion?.word.length,
        shuffledLetters: [],
      }));
    }
  }, [errorCount]);

  useEffect(() => {
    if (currentLetterIndex === currentQuestion?.word.length) {
      setTimeout(() => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].errors = errorCount;

        setCurrentQuestionState((prevState) => ({
          ...prevState,
          answer: [],
          currentLetterIndex: 0,
          errorCount: 0,
        }));
        setAppState((prevState) => ({
          ...prevState,
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
          questions: updatedQuestions,
        }));
      }, TIME_DELAY);
    }
  }, [currentLetterIndex]);

  useKeyPress((event: KeyboardEvent) => {
    if (currentQuestionIndex === questions.length) {
      return;
    }
    const regex = /^[a-zA-Z]$/;
    if (!regex.test(event.key)) return;

    const pressedLetter = event.key;
    const letterIndex = shuffledLetters.findIndex(
      (letter) => letter === pressedLetter
    );
    if (letterIndex !== -1 && currentQuestionIndex !== questions.length) {
      handleClick(pressedLetter, letterIndex);
    } else {
      setCurrentQuestionState((prevState) => ({
        ...prevState,
        errorCount: prevState.errorCount + 1,
      }));
    }
  });

  const handleClick = (letter: string, index: number) => {
    if (letter === currentQuestion.word[currentLetterIndex]) {
      const newShuffledLetters = shuffledLetters.filter((_, i) => i !== index);
      setCurrentQuestionState((prevState) => ({
        ...prevState,
        answer: [...answer, letter],
        currentLetterIndex: currentLetterIndex + 1,
        currentLetterWithErrorIndex: null,
        shuffledLetters: newShuffledLetters,
      }));
    } else {
      setCurrentQuestionState((prevState) => ({
        ...prevState,
        currentLetterWithErrorIndex: index,
        errorCount: prevState.errorCount + 1,
      }));
      setTimeout(() => {
        setCurrentQuestionState((prevState) => ({
          ...prevState,
          currentLetterWithErrorIndex: null,
        }));
      }, TIME_DELAY);
    }
  };

  const handleResetGame = () => {
    setCurrentQuestionState(initialCurrentQuestionState);
    setAppState({
      ...initialAppState,
      questions: getQuestionsData(),
    });
  };

  return {
    answer,
    currentLetterWithErrorIndex,
    currentQuestionIndex,
    errorCount,
    handleClick,
    handleResetGame,
    questions,
    shuffledLetters,
  };
};
