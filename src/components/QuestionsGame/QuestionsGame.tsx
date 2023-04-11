import { useQuestionsGame } from '../../hooks/useQuestionsGame';
import QuestionsGameAnswer from './_Answer/QuestionsGameAnswer';
import QuestionsGameHeader from './_Header/QuestionsGameHeader';
import QuestionsGameLetters from './_Letters/QuestionsGameLetters';
import QuestionsGameStatistics from './_Statistics/QuestionsGameStatistics';

const QuestionsGame = () => {
  const {
    answer,
    currentQuestionIndex,
    errorCount,
    handleClick,
    handleResetGame,
    questions,
    shuffledLetters,
    currentLetterWithErrorIndex,
  } = useQuestionsGame();

  return (
    <div className='container py-5'>
      <div className='d-flex flex-column align-items-center w-100 text-center mx-auto'>
        {currentQuestionIndex === questions.length ? (
          <QuestionsGameStatistics
            questions={questions}
            handleResetGame={handleResetGame}
          />
        ) : (
          <div>
            <QuestionsGameHeader
              currentQuestionIndex={currentQuestionIndex}
              questions={questions}
            />
            <QuestionsGameAnswer
              answer={answer}
              errorCount={errorCount}
            />
            <QuestionsGameLetters
              errorCount={errorCount}
              currentLetterWithErrorIndex={currentLetterWithErrorIndex}
              handleClick={handleClick}
              shuffled={shuffledLetters}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsGame;
