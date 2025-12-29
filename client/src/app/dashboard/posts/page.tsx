'use client';

import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import PostList from '@/components/post/PostList';

export default function PostsPage() {
  const router = useRouter();

  return (
    <div>
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0 }}>My Posts</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push('/dashboard/create')}
        >
          Create New Post
        </Button>
      </Space>
      <PostList userId="me" />
    </div>
  );
}

