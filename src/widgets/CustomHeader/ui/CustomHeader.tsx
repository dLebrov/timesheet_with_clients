import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Menu, Typography } from 'antd';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAppSelector } from '@/app/store/hooks';
import { useCustomTheme } from '@/entities/theme/hooks/useCustomTheme';
import { ThemeType } from '@/entities/theme/lib/types';

import { menuItems } from '../lib/constants';
import { EThemesName, TCustomMenuItem } from '../lib/types';

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

export const CustomHeader = memo(function CustomHeader() {
  const navigate = useNavigate();
  const { theme, changeTheme } = useCustomTheme();
  const { user } = useAppSelector((state) => state.user);

  const handleClickMenu = ({ key }: { key: string }) => {
    const selectedItem = menuItems.find((item) => item?.key === key) as TCustomMenuItem;

    if (selectedItem) navigate(`/${selectedItem.path}`);
  };

  const handleClickTheme = () => {
    changeTheme(theme === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK);
  };

  const themeName = theme === ThemeType.DARK ? EThemesName.Light : EThemesName.Dark;

  return (
    <StyledHeader $currentTheme={theme}>
      <StyledMenu
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={menuItems}
        onClick={handleClickMenu}
      />
      <StyledRightContainer>
        <Button onClick={handleClickTheme}>{themeName}</Button>

        {user && (
          <StyledUserContainer>
            <Avatar size="large" icon={<UserOutlined />} />
            <StyledUserInfo>
              <Typography.Text>{`${user.surname} ${user.name}`}</Typography.Text>
              <Typography.Text>{user.email}</Typography.Text>
            </StyledUserInfo>
          </StyledUserContainer>
        )}
      </StyledRightContainer>
    </StyledHeader>
  );
});
