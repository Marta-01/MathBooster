// AuthContainer.tsx
import React, { useState } from 'react';
import { LoginForm } from '../../components/LoginForm';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import styles from './AuthContainer.module.css';

enum AuthMode {
  Login = 'login',
  Register = 'register',
}

export const AuthContainer: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.Login);

  const switchAuthMode = () => {
    setAuthMode((prevMode) => (prevMode === AuthMode.Login ? AuthMode.Register : AuthMode.Login));
  };

  return (
    <div className={styles.card}>
      {authMode === AuthMode.Login ? (
        <LoginForm switchMode={switchAuthMode} />
      ) : (
        <RegisterForm switchMode={switchAuthMode} />
      )}
    </div>
  );
};
