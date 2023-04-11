import { Question } from '../../../types';

type QuestionsGameHeaderProps = {
  currentQuestionIndex: number;
  questions: Question[];
};

const QuestionsGameHeader = ({
  currentQuestionIndex,
  questions,
}: QuestionsGameHeaderProps) => {
  return (
    <>
      <h2 className='mb-5'>English Vocabulary Trainer</h2>
      <p className='lead mb-1'>
        Form a valid English word using the given letters
      </p>
      <p className='mb-5'>
        Question <span id='current_question'>{currentQuestionIndex + 1}</span>{' '}
        of <span id='total_questions'>{questions.length}</span>
      </p>
    </>
  );
};

export default QuestionsGameHeader;
