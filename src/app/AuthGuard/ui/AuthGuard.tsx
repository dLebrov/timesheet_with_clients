import { PropsWithChildren, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/app/store/hooks';
import { setUser, TUser, useUser } from '@/entities/user';
import { useUserTokenCheckAlive } from '@/entities/user/hooks/useUserToken';
import { EPaths } from '@/shared/lib';

export const AuthGuard = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { isTokenAlive } = useUserTokenCheckAlive();
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isAuthPath = pathname === `/${EPaths.Login}` || pathname === `/${EPaths.Registration}`;

  useEffect(() => {
    const userLS = localStorage.getItem('user');
    const parsedUser: Omit<TUser, 'password'> | null = userLS ? JSON.parse(userLS) : null;

    if (parsedUser && !user) {
      dispatch(setUser(parsedUser));
    }

    if (user && isTokenAlive && isAuthPath) {
      navigate('/');
    }

    const isUserMissing = !parsedUser && !user;
    const isUserInvalid = isUserMissing || !isTokenAlive;
    const shouldRedirectToLogin = isUserInvalid && !isAuthPath;

    if (shouldRedirectToLogin) {
      localStorage.removeItem('user');
      navigate(`/${EPaths.Login}`);
    }
  }, [dispatch, isAuthPath, isTokenAlive, navigate, user]);

  return <>{children}</>;
};
