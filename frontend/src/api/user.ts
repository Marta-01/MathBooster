import axios from 'axios'

export type NextTutorialResponse = {
  tutorialId: number
  video: string
  quiz: {
    questions: string[]
    answers: string[]
  }
}

export const getNextTutorial = async (): Promise<NextTutorialResponse> => {
  try {
    // Retrieve the JWT token from wherever it is stored (e.g., local storage)
    const token = localStorage.getItem('token')

    if (!token) {
      throw new Error('JWT token not found')
    }

    const response = await axios.get<NextTutorialResponse>(
      '/api/users/getNextTutorial',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  } catch (error) {
    throw new Error('An error occurred, please try again later')
  }
}
