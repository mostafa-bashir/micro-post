'use client';

import { Spin, Empty, Alert } from 'antd';
import { usePosts } from '@/lib/hooks/usePosts';
import PostCard from './PostCard';

interface PostListProps {
  userId?: number | 'me';
}

export default function PostList({ userId }: PostListProps) {
  const { posts, isLoading, error } = usePosts(userId);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error loading posts"
        description={error instanceof Error ? error.message : 'An error occurred'}
        type="error"
        showIcon
      />
    );
  }

  if (posts.length === 0) {
    return (
      <Empty
        description="No posts found"
        style={{ padding: '50px' }}
      />
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

