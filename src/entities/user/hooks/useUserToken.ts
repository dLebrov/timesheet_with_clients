import Cookies from 'js-cookie';

export const useUserTokenCheckAlive = () => {
  const token = Cookies.get('token');

  const tokenPayload = token
    ? JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    : null;
  const isTokenAlive = tokenPayload?.exp * 1000 > Date.now();

  return { token, isTokenAlive };
};
