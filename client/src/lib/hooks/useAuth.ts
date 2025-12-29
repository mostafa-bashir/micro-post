'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { auth } from '@/lib/auth';
import { LoginCredentials, RegisterCredentials, LoginResponse, RegisterResponse, User } from '@/types';

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<LoginResponse> => {
      const { data } = await api.post<LoginResponse>('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      auth.setToken(data.access_token);
      message.success('Login successful!');
      router.push('/dashboard/posts');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
      const { data } = await api.post<RegisterResponse>('/users/register', credentials);
      return data;
    },
    onSuccess: () => {
      message.success('Registration successful! Please login.');
      router.push('/login');
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Registration failed. Please try again.');
    },
  });

  const logout = () => {
    auth.removeToken();
    queryClient.clear();
    router.push('/login');
    message.success('Logged out successfully');
  };

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ['user'],
    queryFn: () => {
      const user = auth.getUserFromToken();
      return Promise.resolve(user);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    user,
    isLoading,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    logout,
    isAuthenticated: auth.isAuthenticated(),
  };
};

