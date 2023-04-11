type QuestionsGameLettersProps = {
  currentLetterWithErrorIndex: null | number;
  errorCount: number;
  handleClick: (letter: string, index: number) => void;
  shuffled: string[];
};

const QuestionsGameLetters = ({
  currentLetterWithErrorIndex,
  errorCount,
  handleClick,
  shuffled,
}: QuestionsGameLettersProps) => {
  return (
    <div id='letters'>
      {shuffled.map(
        (letter, i) =>
          errorCount < 3 && (
            <button
              onClick={() => handleClick(letter, i)}
              key={letter + i}
              className={
                `btn btn-primary p-2 px-3 mx-1` +
                (currentLetterWithErrorIndex === i ? ' btn-danger' : '')
              }
            >
              {letter}
            </button>
          )
      )}
    </div>
  );
};

export default QuestionsGameLetters;
