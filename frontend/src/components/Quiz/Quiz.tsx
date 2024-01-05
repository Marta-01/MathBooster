import React, { useState } from 'react';
import styles from './Quiz.module.css';

type Question = {
  question: string;
  answers: string[];
  correctAnswerIndex: number;
};

type QuizProps = {
  questions: Question[];
  onQuizSubmit: (score: number) => void;
};

export const Quiz: React.FC<QuizProps> = ({ questions, onQuizSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleAnswerSelection = (value: number) => {
    setSelectedAnswer(value);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      alert('Please select an answer');
      return;
    }

    setAnswers((answers) => [...answers, selectedAnswer]);

    if (questions[selectedQuestion].correctAnswerIndex === selectedAnswer) {
      setScore((score) => score + 1);
    }

    if (selectedQuestion === questions.length - 1) {
      setIsQuizFinished(true);
      return;
    }

    setSelectedAnswer(null);
    setSelectedQuestion((prevQuestion) => prevQuestion + 1);
  };

  return (
    <div className={styles.questionCard}>
      {!isQuizFinished ? (
        <>
          <div className={styles.question}>
            <p>{questions[selectedQuestion].question}</p>
          </div>
          <div className={styles.answerContainer}>
            {questions[selectedQuestion].answers.map((answer, index) => (
              <label
                key={index + 100 * selectedQuestion}
                className={`${styles.answer} ${
                  selectedAnswer === index ? styles.selectedAnswer : ''
                }`}
              >
                <input
                  className={styles.answerInput}
                  type="radio"
                  name="answer"
                  value="a"
                  onChange={() => handleAnswerSelection(index)}
                  checked={selectedAnswer === index}
                />
                {`${['a', 'b', 'c', 'd'][index]}. ${answer}`}
              </label>
            ))}
          </div>
          <button className={styles.submitButton} onClick={handleSubmit}>
            {selectedQuestion === questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        </>
      ) : (
        <div className={styles.results}>
          <p className={styles.question}>Results</p>
          <p>{`You scored ${score} out of ${questions.length}`}</p>
          <div className={styles.resultAnswersContainer}>
            {questions.map((question, index) => {
              const isCorrect = question.correctAnswerIndex === +answers[index];
              return (
                <div
                  key={index}
                  className={
                    isCorrect
                      ? styles.correctAnswerResult
                      : styles.incorrectAnswerResult
                  }
                >
                  <p>{`${index + 1}. Question: ${question.question} ?`}</p>
                  <p>{`Your answer: ${question.answers[answers[index]]}`}</p>
                  {!isCorrect && (
                    <p>{`Correct answer: ${
                      question.answers[question.correctAnswerIndex]
                    }`}</p>
                  )}
                </div>
              );
            })}
            <button className={styles.submitButton} onClick={() => onQuizSubmit(score)}>
              Go to next tutorial
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
