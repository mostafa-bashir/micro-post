'use client';

import { List, Avatar, Spin, Alert, Typography, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useUsers } from '@/lib/hooks/useUsers';
import { User } from '@/types';

const { Title } = Typography;

export default function UsersPage() {
  const router = useRouter();
  const { users, isLoading, error } = useUsers();

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
        message="Error loading users"
        description={error instanceof Error ? error.message : 'An error occurred'}
        type="error"
        showIcon
      />
    );
  }

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        All Users
      </Title>
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(user: User) => (
          <List.Item
            actions={[
              <Button
                type="link"
                key="view-posts"
                onClick={() => router.push(`/dashboard/users/${user.id}/posts`)}
              >
                View Posts
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={user.email}
              description={`User ID: ${user.id}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

