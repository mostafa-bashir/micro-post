'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { User } from '@/types';

export const useUsers = () => {
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await api.get<User[]>('/users');
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    users: data || [],
    isLoading,
    error,
  };
};

