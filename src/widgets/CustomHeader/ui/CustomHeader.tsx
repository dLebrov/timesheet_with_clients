import {
  LoginOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Menu, Typography } from 'antd';
import Cookies from 'js-cookie';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAppDispatch } from '@/app/store/hooks';
import { useCustomTheme } from '@/entities/theme/hooks/useCustomTheme';
import { ThemeType } from '@/entities/theme/lib/types';
import { setUser, userRoleName, useUser } from '@/entities/user';
import { EPaths } from '@/shared/lib';

import { menuItems } from '../lib/constants';
import { TCustomMenuItem } from '../lib/types';

const StyledHeader = styled('div')<{ $currentTheme: ThemeType | null }>`
  display: flex;
  width: 100%;
  height: 64px;
  justify-content: space-between;
  padding: 0 24px;
  background-color: ${(props) => (props.$currentTheme === ThemeType.DARK ? '#141414' : '#ffffff')};
`;

const StyledMenu = styled(Menu)`
  width: 100%;
  & > li {
    padding-top: 10px;
  }
`;

const StyledRightContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid rgba(253, 253, 253, 0.12);
  gap: 20px;
  width: 100%;
`;

const StyledUserContainer = styled('div')`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const StyledUserInfo = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const CustomHeader = () => {
  const navigate = useNavigate();
  const { theme, changeTheme } = useCustomTheme();
  const { user } = useUser();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const menuItemTyped = menuItems as TCustomMenuItem[];

  const handleClickMenu = ({ key }: { key: string }) => {
    const selectedItem = menuItemTyped.find((item) => item?.key === key);

    if (selectedItem) navigate(selectedItem.path);
  };

  const handleClickTheme = () => {
    changeTheme(theme === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK);
  };

  const handleClickLogout = () => {
    localStorage.removeItem('user');
    Cookies.remove('token');
    dispatch(setUser(null));
  };

  const themeIcon = theme === ThemeType.DARK ? <SunOutlined /> : <MoonOutlined />;

  const selectedKeys = useMemo(() => {
    const currentKey =
      menuItemTyped.find((item) => item?.path === location.pathname)?.key || menuItemTyped[0]?.key;

    return currentKey;
  }, [location.pathname, menuItemTyped]);

  return (
    <StyledHeader $currentTheme={theme}>
      <StyledMenu
        mode="horizontal"
        selectedKeys={[selectedKeys]}
        items={menuItems}
        onClick={handleClickMenu}
        disabled={!user}
      />
      <StyledRightContainer>
        <Button onClick={handleClickTheme}>{themeIcon}</Button>

        {user && (
          <StyledUserContainer>
            <Avatar style={{ backgroundColor: '#87d068' }} size="large" icon={<UserOutlined />} />
            <StyledUserInfo>
              <Typography.Text>{`${user.surname} ${user.name}`}</Typography.Text>
              <Typography.Text>{userRoleName[user.role]}</Typography.Text>
            </StyledUserInfo>
            <Button onClick={handleClickLogout} icon={<LogoutOutlined />} />
          </StyledUserContainer>
        )}
        {!user && <Button onClick={() => navigate(`/${EPaths.Login}`)} icon={<LoginOutlined />} />}
      </StyledRightContainer>
    </StyledHeader>
  );
};
