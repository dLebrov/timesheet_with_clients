import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Drawer, Menu } from 'antd';
import { DrawerStyles } from 'antd/es/drawer/DrawerPanel';
import classNames from 'classnames/bind';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useCustomTheme } from '@/entities/theme/hooks/useCustomTheme';
import { ThemeType } from '@/entities/theme/lib/types';
import { useUser } from '@/entities/user';
import { UserMenu } from '@/features/user-menu';
import { useDeviceDetect } from '@/shared/hooks/useDeviceDetect';

import { MENU_ITEMS } from '../lib/constants';
import { TCustomMenuItem } from '../lib/types';
import styles from './index.module.scss';

const BLOCK_NAME = 'CustomHeader';
const cn = classNames.bind(styles);

export const CustomHeader = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const navigate = useNavigate();
  const { theme } = useCustomTheme();
  const { user } = useUser();
  const location = useLocation();
  const { isMobile } = useDeviceDetect();

  const menuItemTyped = MENU_ITEMS as TCustomMenuItem[];

  const handleClickMenu = ({ key }: { key: string }) => {
    const selectedItem = menuItemTyped.find((item) => item?.key === key);

    if (selectedItem) navigate(selectedItem.path);
    if (isMobile) setIsOpenMenu(!isOpenMenu);
  };

  const onChangeMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const selectedKeys = useMemo(() => {
    const currentKey =
      menuItemTyped.find((item) => item?.path === location.pathname)?.key || menuItemTyped[0]?.key;

    return currentKey;
  }, [location.pathname, menuItemTyped]);

  const drawerStyles: DrawerStyles = {
    header: {
      background: theme === ThemeType.DARK ? '#141414' : '#ffffff',
    },
    body: {
      background: theme === ThemeType.DARK ? '#141414' : '#ffffff',
    },
  };

  return (
    <div className={cn(BLOCK_NAME)}>
      <div
        className={cn(`${BLOCK_NAME}__header-content`, {
          [`${BLOCK_NAME}__dark-theme`]: theme === ThemeType.DARK,
        })}
      >
        {isMobile ? (
          <Button type="default" onClick={onChangeMenu}>
            {isOpenMenu ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </Button>
        ) : (
          <Menu
            className={cn(`${BLOCK_NAME}__menu`, {
              [`${BLOCK_NAME}__menu-mobile`]: isMobile,
            })}
            mode="horizontal"
            selectedKeys={[selectedKeys]}
            items={MENU_ITEMS}
            onClick={handleClickMenu}
            disabled={!user}
          />
        )}
        <div className={cn(`${BLOCK_NAME}__right-container`)}>
          <UserMenu />
        </div>
      </div>
      <Drawer
        title="Меню"
        placement="left"
        closable
        onClose={onChangeMenu}
        open={isOpenMenu}
        destroyOnClose
        styles={drawerStyles}
      >
        <Menu
          className={cn(`${BLOCK_NAME}__menu`, `${BLOCK_NAME}__menu-vertical`, {
            [`${BLOCK_NAME}__menu-mobile`]: isMobile,
          })}
          mode="vertical"
          selectedKeys={[selectedKeys]}
          items={MENU_ITEMS}
          onClick={handleClickMenu}
          disabled={!user}
        />
      </Drawer>
    </div>
  );
};
