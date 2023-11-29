import React, { useState } from 'react'
import styles from './RegisterForm.module.css'
import { register } from '../../api/auth'

interface RegisterFormProps {
  switchMode: () => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ switchMode }) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    try {
      await register(email, password)

      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setError('')

      alert('Registration successful!')
      switchMode()
    } catch (error) {
      setError(
        (error as Error)?.message || 'Something went wrong, please try again.'
      )
    }
  }

  return (
    <div className={styles.registerFormWrapper}>
      <form onSubmit={handleFormSubmit} className={styles.registerForm}>
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
        <label className={styles.label}>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Register</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <p>
        Already have an account?{' '}
        <span className={styles.switchLink} onClick={switchMode}>
          Login
        </span>
      </p>
    </div>
  )
}
