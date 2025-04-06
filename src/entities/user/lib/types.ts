export enum Role {
  Teacher = 'teacher',
  Doctor = 'doctor',
  Client = 'client',
}

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export type TUser = {
  id: number;
  surname: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  birthDate: any;
  gender: Gender;
  role: Role;
  password: string;
};

export type TAuthParams = {
  login: string;
  password: string;
};

export type TAuthResponse = {
  access_token: string;
  user: Omit<TUser, 'password'>;
};

export type TUserParams = Omit<TUser, 'id'>;
