import axios from 'axios';

export type NextTutorialResponse = {
  name: string;
  tutorialId: number;
  video: string;
  quiz: {
    questions: {
      question: string;
      answers: string[];
      correctAnswerIndex: number;
    }[];
  };
};

export const getNextTutorial = async (): Promise<NextTutorialResponse> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('JWT token not found');
    }

    const response = await axios.get<NextTutorialResponse>(
      '/api/users/getNextTutorial',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('An error occurred, please try again later');
  }
};

export const submitQuiz = async (howManyCorrect: number): Promise<void> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('JWT token not found');
    }

    await axios.post(
      '/api/users/submitAnswers',
      {
        howManyCorrect,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw new Error('An error occurred, please try again later');
  }
};

export const resetProgress = async (): Promise<void> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('JWT token not found');
    }

    await axios.post(
      '/api/users/resetProgress',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw new Error('An error occurred, please try again later');
  }
}