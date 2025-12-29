import { jwtDecode } from 'jwt-decode';
import { User } from '@/types';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export interface TokenPayload {
  sub: number; // user id
  email: string;
  iat?: number;
  exp?: number;
}

export const auth = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getUserFromToken: (): User | null => {
    if (typeof window === 'undefined') return null;
    
    const token = auth.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return {
        id: decoded.sub,
        email: decoded.email,
      };
    } catch (error) {
      console.error('Failed to decode token:', error);
      auth.removeToken();
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    const token = auth.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      // Check if token is expired
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        auth.removeToken();
        return false;
      }
      return true;
    } catch {
      auth.removeToken();
      return false;
    }
  },
};

