import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Drawer, Menu } from 'antd';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useCustomTheme } from '@/entities/theme/hooks/useCustomTheme';
import { ThemeType } from '@/entities/theme/lib/types';
import { useUser } from '@/entities/user';
import { UserMenu } from '@/features/UserMenu';
import { useDeviceDetect } from '@/shared/hooks/useDeviceDetect';

import { menuItems } from '../lib/constants';
import { TCustomMenuItem } from '../lib/types';

const StyledHeader = styled('div')<{ $currentTheme: ThemeType | null }>`
  display: flex;
  width: 100%;
  height: 64px;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background-color: ${(props) => (props.$currentTheme === ThemeType.DARK ? '#141414' : '#ffffff')};
`;

const StyledMenu = styled(Menu)<{ $isMobile: boolean }>`
  width: 100%;

  & > li {
    padding-top: ${(props) => (props.$isMobile ? '0' : '15px')};
  }
`;

const StyledRightContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  width: 100%;
`;

export const CustomHeader = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const navigate = useNavigate();
  const { theme } = useCustomTheme();
  const { user } = useUser();
  const location = useLocation();
  const { isMobile } = useDeviceDetect();

  const menuItemTyped = menuItems as TCustomMenuItem[];

  const handleClickMenu = ({ key }: { key: string }) => {
    const selectedItem = menuItemTyped.find((item) => item?.key === key);

    if (selectedItem) navigate(selectedItem.path);
  };

  const onChangeMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const selectedKeys = useMemo(() => {
    const currentKey =
      menuItemTyped.find((item) => item?.path === location.pathname)?.key || menuItemTyped[0]?.key;

    return currentKey;
  }, [location.pathname, menuItemTyped]);

  return (
    <>
      <StyledHeader $currentTheme={theme}>
        {isMobile ? (
          <Button type="default" onClick={onChangeMenu}>
            {isOpenMenu ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </Button>
        ) : (
          <StyledMenu
            $isMobile={isMobile}
            mode="horizontal"
            selectedKeys={[selectedKeys]}
            items={menuItems}
            onClick={handleClickMenu}
            disabled={!user}
          />
        )}
        <StyledRightContainer>
          <UserMenu />
        </StyledRightContainer>
      </StyledHeader>
      <Drawer
        title="Меню"
        placement="left"
        closable
        onClose={onChangeMenu}
        open={isOpenMenu}
        destroyOnClose
      >
        <StyledMenu
          $isMobile={isMobile}
          mode="vertical"
          selectedKeys={[selectedKeys]}
          items={menuItems}
          onClick={handleClickMenu}
          disabled={!user}
          style={{ height: '100%' }}
        />
      </Drawer>
    </>
  );
};
