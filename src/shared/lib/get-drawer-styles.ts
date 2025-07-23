import { DrawerStyles } from 'antd/es/drawer/DrawerPanel';

import { ThemeType } from '@/entities/theme';

export const getDrawerStyles = (theme: ThemeType | null): DrawerStyles => ({
  header: {
    background: theme === ThemeType.DARK ? '#141414' : '#ffffff',
  },
  body: {
    background: theme === ThemeType.DARK ? '#141414' : '#ffffff',
  },
});
