import Cookies from 'js-cookie';

export const useUserTokenCheckAlive = () => {
  const token = Cookies.get('token');

  const tokenPayload = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const isTokenAlive = tokenPayload?.exp * 1000 > Date.now();

  return { token, isTokenAlive };
};
