import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: LoginCredentials): Promise<void>;
  signOut(): void;
  getUserRole(): string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@AGSchedules:token');
    const user = localStorage.getItem('@AGSchedules:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@AGSchedules:token', token);
    localStorage.setItem('@AGSchedules:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@AGSchedules:token');
    localStorage.removeItem('@AGSchedules:user');

    setData({} as AuthState);
  }, []);

  const getUserRole = useCallback(() => {
    const user = localStorage.getItem('@AGSchedules:user');

    if (user) {
      const parsedUser = JSON.parse(user);

      return parsedUser.type;
    }

    return null;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, getUserRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('use Auth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
