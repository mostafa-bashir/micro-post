'use client';

import { Layout, Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import {
  FileTextOutlined,
  UserOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const menuItems = [
  {
    key: '/dashboard/posts',
    icon: <FileTextOutlined />,
    label: 'My Posts',
  },
  {
    key: '/dashboard/create',
    icon: <PlusCircleOutlined />,
    label: 'Create Post',
  },
  {
    key: '/dashboard/users',
    icon: <UserOutlined />,
    label: 'Users',
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
  };

  return (
    <Sider
      width={200}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{ height: '100%', borderRight: 0 }}
      />
    </Sider>
  );
}

