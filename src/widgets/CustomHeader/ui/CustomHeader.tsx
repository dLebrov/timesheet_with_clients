import { Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';

import { PATH } from '@/shared/lib';

export const CustomHeader = () => {
  const items = Object.values(PATH).map((item, index) => ({ label: item.label, key: index + 1 }));

  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items} />
    </Header>
  );
};
