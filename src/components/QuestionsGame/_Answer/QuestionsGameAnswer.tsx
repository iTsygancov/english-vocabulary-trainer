type QuestionsGameAnswerProps = {
  answer: string[];
  errorCount: number;
};

const QuestionsGameAnswer = ({
  answer,
  errorCount,
}: QuestionsGameAnswerProps) => {
  return (
    <div
      id='answer'
      className='bg-light mx-1 mb-3'
      style={{
        height: '46px',
        borderRadius: '6px',
      }}
    >
      {answer.map((letter, i) => (
        <span
          key={i + letter}
          className={
            `d-inline-block rounded text-white p-2 px-3 mx-1` +
            (errorCount >= 3 ? ' bg-danger' : ' bg-success')
          }
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default QuestionsGameAnswer;
