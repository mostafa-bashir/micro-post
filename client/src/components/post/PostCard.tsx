'use client';

import { Card, Typography, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Post } from '@/types';

const { Text, Paragraph } = Typography;

interface PostCardProps {
  post: Post;
}

function formatDate(dateString?: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return '';
  }
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card
      style={{ marginBottom: 16 }}
      hoverable
    >
      <Space direction="vertical" style={{ width: '100%' }} size="small">
        <Space>
          <UserOutlined />
          <Text strong>{post.user.email}</Text>
          {post.createdAt && (
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {formatDate(post.createdAt)}
            </Text>
          )}
        </Space>
        <Paragraph style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
          {post.content}
        </Paragraph>
      </Space>
    </Card>
  );
}

