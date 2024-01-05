import React, { useEffect, useState } from 'react';
import { getNextTutorial, resetProgress, submitQuiz } from '../../api/user';
import { NextTutorialResponse } from '../../api/user';
import { useNavigate } from 'react-router-dom';
import { Video } from '../../components/Video/Video';

import styles from './Tutorial.module.css';
import { Quiz } from '../../components/Quiz';

interface TutorialProps {}

export const Tutorial: React.FC<TutorialProps> = () => {
  const navigate = useNavigate();
  const [tutorialData, setTutorialData] = useState<NextTutorialResponse | null>(
    null
  );
  const [isVideoStage, setIsVideoStage] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTutorialData = async () => {
    try {
      const data = await getNextTutorial();
      setTutorialData(data);
    } catch (error) {
      setError(
        (error as Error)?.message || 'Something went wrong, please try again.'
      );
    }
  };

  useEffect(() => {
    setError(null);
    fetchTutorialData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleQuizSubmit = (score: number) => {
    submitQuiz(score)
      .then(() => fetchTutorialData())
      .then(() => setIsVideoStage(true))
      .catch(console.error);
    console.log(
      `You scored ${score} out of ${tutorialData?.quiz.questions.length}`
    );
  };

  const handleResetProgress = () => {
    resetProgress().then(() => fetchTutorialData());
  }

  return (
    <div>
      <div className={styles.logoutButtonContainer}>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {tutorialData ? (
        <div className={styles.container}>
          {tutorialData.tutorialId === -1 ? (
            <>
              <p>You have completed all tutorials!</p>
              <button onClick={handleResetProgress}>Try again</button>
            </>
          ) : (
            <>
              <h2>
                {tutorialData.tutorialId}. {tutorialData.name}
              </h2>
              {isVideoStage ? (
                <Video
                  url={tutorialData.video}
                  onChangeClick={() => setIsVideoStage(false)}
                />
              ) : (
                <Quiz
                  questions={tutorialData.quiz.questions}
                  onQuizSubmit={handleQuizSubmit}
                />
              )}
            </>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};
