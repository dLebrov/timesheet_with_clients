export type TAuthParams = {
  login: string;
  password: string;
};

export type TUser = {
  id: number;
  name: string;
  surname: string;
  password: string;
  email: string;
  username: string;
};

export type TAuthResponse = {
  access_token: string;
  user: Omit<TUser, 'password'>;
};
