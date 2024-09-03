import { useCallback, useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';

import { ThemeType } from '../lib/types';
import { themeActions } from '../model';

export const useCustomTheme = () => {
  const { theme } = useAppSelector((state) => state.theme);
  const LSTheme: ThemeType | null = useMemo(
    () => (localStorage.getItem('theme') as ThemeType) || ThemeType.DARK,
    [],
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!theme) {
      dispatch(themeActions.setTheme(LSTheme));
    }
  }, [LSTheme, dispatch, theme]);

  const handleChangeTheme = useCallback(
    (value: ThemeType) => {
      localStorage.setItem('theme', value);
      dispatch(themeActions.setTheme(value));
    },
    [dispatch],
  );

  return {
    theme,
    changeTheme: handleChangeTheme,
  };
};
