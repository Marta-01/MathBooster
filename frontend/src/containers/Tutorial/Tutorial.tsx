import React, { useEffect, useState } from 'react'
import { getNextTutorial } from '../../api/user'
import { NextTutorialResponse } from '../../api/user'
import { useNavigate } from 'react-router-dom'

interface TutorialProps {}

export const Tutorial: React.FC<TutorialProps> = () => {
  const navigate = useNavigate()
  const [tutorialData, setTutorialData] = useState<NextTutorialResponse | null>(
    null
  )
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTutorialData = async () => {
      try {
        const data = await getNextTutorial()
        setTutorialData(data)
      } catch (error) {
        setError(
          (error as Error)?.message || 'Something went wrong, please try again.'
        )
      }
    }
    setError(null)
    fetchTutorialData()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div>
      {tutorialData ? (
        <div>
          <h2>Tutorial {tutorialData.tutorialId}</h2>

          {/* Embed YouTube video */}
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${
              tutorialData.video.split('v=')[1]
            }`}
            title={`Tutorial ${tutorialData.tutorialId}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>

          <h3>Quiz</h3>
          <ul>
            {tutorialData.quiz.questions.map((question, index) => (
              <li key={index}>
                <p>{question}</p>
                <p>Answer: {tutorialData.quiz.answers[index]}</p>
              </li>
            ))}
          </ul>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  )
}
