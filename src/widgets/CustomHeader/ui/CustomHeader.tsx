import { Button, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useCustomTheme } from '@/entities/theme/hooks/useCustomTheme';
import { ThemeType } from '@/entities/theme/lib/types';
import { IPath, PATH } from '@/shared/lib';

const StyledHeader = styled('div')<{ currentTheme: ThemeType | null }>`
  display: flex;
  width: 100%;
  height: 64px;
  justify-content: space-between;
  padding: 0 24px;
  background-color: ${(props) => (props.currentTheme === ThemeType.DARK ? '#141414' : '#ffffff')};
`;

const StyledMenu = styled(Menu)`
  width: 100%;
`;

const StyledRightContainer = styled('div')`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(253, 253, 253, 0.12);
`;

export const CustomHeader = () => {
  const navigate = useNavigate();
  const { theme, changeTheme } = useCustomTheme();

  const items = Object.values(PATH).map((item: IPath, index) => ({
    label: item.label,
    key: index + 1,
    path: item.path,
  }));

  const handleClickMenu = ({ key }: { key: string }) => {
    const selectedItem = items[Number(key) - 1];
    navigate(`/${selectedItem.path}`);
  };

  const handleClickTheme = () => {
    changeTheme(theme === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK);
  };

  return (
    <StyledHeader currentTheme={theme}>
      <StyledMenu
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={items}
        onClick={handleClickMenu}
      />
      <StyledRightContainer>
        <Button onClick={handleClickTheme}>Theme</Button>
      </StyledRightContainer>
    </StyledHeader>
  );
};
