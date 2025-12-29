'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import api from '@/lib/api';
import { auth } from '@/lib/auth';
import { Post, CreatePostData } from '@/types';

export const usePosts = (userId?: number | 'me') => {
  const queryClient = useQueryClient();

  const queryKey = userId ? ['posts', userId] : ['posts'];

  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey,
    queryFn: async () => {
      let url = '/posts';
      if (userId === 'me') {
        // Get current user ID from token
        const user = auth.getUserFromToken();
        if (!user) {
          throw new Error('User not authenticated');
        }
        url = `/posts/user/${user.id}`;
      } else if (userId) {
        url = `/posts/user/${userId}`;
      }
      const { data } = await api.get<Post[]>(url);
      return data;
    },
    staleTime: 30 * 1000, // 30 seconds
  });

  const createPostMutation = useMutation({
    mutationFn: async (postData: CreatePostData): Promise<Post> => {
      const { data } = await api.post<Post>('/posts', postData);
      return data;
    },
    onSuccess: () => {
      message.success('Post created successfully!');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      // Also invalidate user-specific queries
      queryClient.invalidateQueries({ queryKey: ['posts', 'me'] });
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Failed to create post');
    },
  });

  return {
    posts: data || [],
    isLoading,
    error,
    createPost: createPostMutation.mutateAsync,
    isCreating: createPostMutation.isPending,
  };
};

