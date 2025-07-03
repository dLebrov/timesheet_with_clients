import {
  DownOutlined,
  LoginOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, MenuProps, Typography } from 'antd';
import classNames from 'classnames/bind';
import Cookies from 'js-cookie';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/app/store/hooks';
import { ThemeType, useCustomTheme } from '@/entities/theme';
import { setUser, userRoleName, useUser } from '@/entities/user';
import { EPaths } from '@/shared/lib';

import styles from './index.module.scss';

const BLOCK_NAME = 'UserMenu';
const cn = classNames.bind(styles);

export const UserMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user } = useUser();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { theme, changeTheme } = useCustomTheme();

  const handleClickLogout = useCallback(() => {
    localStorage.removeItem('user');
    Cookies.remove('token');
    dispatch(setUser(null));
  }, [dispatch]);

  const handleClickTheme = useCallback(() => {
    changeTheme(theme === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK);
  }, [changeTheme, theme]);

  const handleOpenChange = useCallback((open: boolean) => {
    setDropdownOpen(open);
  }, []);

  const items: MenuProps['items'] = useMemo(() => {
    const themeIcon =
      theme === ThemeType.DARK ? (
        <SunOutlined style={{ marginLeft: 8 }} />
      ) : (
        <MoonOutlined style={{ marginLeft: 8 }} />
      );
    const themeName = theme === ThemeType.DARK ? 'Светлая тема' : 'Тёмная тема';

    return [
      {
        label: (
          <Typography.Text onClick={handleClickTheme}>
            {themeName}
            {themeIcon}
          </Typography.Text>
        ),
        key: '0',
      },
      {
        label: (
          <Typography.Text onClick={handleClickLogout}>
            Выйти <LogoutOutlined style={{ marginLeft: 8 }} />
          </Typography.Text>
        ),
        key: '1',
      },
    ];
  }, [handleClickLogout, handleClickTheme, theme]);

  if (!user) {
    return (
      <Button
        onClick={() => navigate(`/${EPaths.Login}`)}
        icon={<LoginOutlined />}
        iconPosition="end"
      >
        Войти
      </Button>
    );
  }

  return (
    <Dropdown menu={{ items }} open={dropdownOpen} onOpenChange={handleOpenChange}>
      <div className={cn(BLOCK_NAME)}>
        <Avatar className={cn(`${BLOCK_NAME}__avatar`)} size="large" icon={<UserOutlined />} />
        <div className={cn(`${BLOCK_NAME}__user-info`)}>
          <Typography.Text
            style={{ cursor: 'pointer' }}
          >{`${user.surname} ${user.name}`}</Typography.Text>
          <Typography.Text style={{ cursor: 'pointer' }}>{userRoleName[user.role]}</Typography.Text>
        </div>
        <DownOutlined
          className={cn(`${BLOCK_NAME}__dropdown-icon`, {
            [`${BLOCK_NAME}__dropdown-icon--open`]: dropdownOpen,
            [`${BLOCK_NAME}__dropdown-icon--white`]: theme === ThemeType.DARK,
          })}
        />
      </div>
    </Dropdown>
  );
};
