// LoginForm.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/auth'
import styles from './LoginForm.module.css'

interface LoginFormProps {
  switchMode: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ switchMode }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const token = await login(email, password)

      localStorage.setItem('token', token)

      navigate('/tutorial')
    } catch (error) {
      setError(
        (error as Error)?.message || 'Something went wrong, please try again.'
      )
    }
  }

  return (
    <div className={styles.loginFormWrapper}>
      <form onSubmit={handleFormSubmit} className={styles.loginForm}>
        <label className={styles.label}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className={styles.label}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <p>
        Don't have an account?{' '}
        <span className={styles.switchLink} onClick={switchMode}>
          Register
        </span>
      </p>
    </div>
  )
}
