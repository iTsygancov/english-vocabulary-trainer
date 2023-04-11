import { useMemo } from 'react';
import { Question } from '../../../types';

type StatsProps = {
  questions: Question[];
  handleResetGame: () => void;
};

const useQuestionsGameStatistics = (questions: Question[]) => {
  const wordsWithoutErrors = useMemo(() => {
    return questions?.filter((question) => question.errors === 0).length;
  }, [questions]);

  const numberOfErrors = useMemo(() => {
    return questions.reduce((acc, question) => acc + question.errors, 0);
  }, [questions]);

  const wordWithMostErrors = useMemo(() => {
    const result = questions?.sort((a, b) => b.errors - a.errors)[0];
    if (result?.errors === 0) {
      return "You don't have any errors";
    }
    return result?.word;
  }, [questions]);
  return {
    wordsWithoutErrors,
    numberOfErrors,
    wordWithMostErrors,
  };
};

function QuestionsGameStatistics({ questions, handleResetGame }: StatsProps) {
  const { wordsWithoutErrors, numberOfErrors, wordWithMostErrors } =
    useQuestionsGameStatistics(questions);

  return (
    <div>
      <h2>Statistics</h2>
      <p>
        Number of words collected without errors - {wordsWithoutErrors} of 6
      </p>
      <p>Number of errors - {numberOfErrors}</p>
      <p>Word with most errors - {wordWithMostErrors}</p>
      <button
        className='btn btn-primary'
        onClick={handleResetGame}
      >
        Start new game
      </button>
    </div>
  );
}

export default QuestionsGameStatistics;
