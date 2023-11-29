import axios from 'axios';

type LoginResponse = {
  token: string;
};

export const login = async (username: string, password: string): Promise<string> => {
  try {
    const response = await axios.post<LoginResponse>('/api/auth/login', {
      username,
      password,
    });

    return response.data.token;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error('Invalid username or password');
    }

    throw new Error('An error occurred, please try again later');
  }
};

export const register = async (username: string, password: string): Promise<void> => {
  try {
    await axios.post('/api/auth/register', {
      username,
      password,
    });
  } catch (error) {
    throw new Error('An error occurred, please try again later');
  }
};