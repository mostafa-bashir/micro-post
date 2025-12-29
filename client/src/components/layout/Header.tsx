'use client';

import { Layout, Button, Typography, Space } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '@/lib/hooks/useAuth';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <AntHeader
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        background: '#001529',
      }}
    >
      <Text style={{ color: '#fff', fontSize: '18px', fontWeight: 500 }}>
        Micro Posts
      </Text>
      <Space>
        {user && (
          <Text style={{ color: '#fff' }}>{user.email}</Text>
        )}
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          onClick={logout}
        >
          Logout
        </Button>
      </Space>
    </AntHeader>
  );
}

