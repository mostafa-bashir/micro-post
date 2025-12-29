'use client';

import { use } from 'react';
import { Typography } from 'antd';
import PostList from '@/components/post/PostList';

const { Title } = Typography;

export default function UserPostsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const userId = parseInt(id, 10);

  if (isNaN(userId)) {
    return <div>Invalid user ID</div>;
  }

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        User Posts
      </Title>
      <PostList userId={userId} />
    </div>
  );
}

