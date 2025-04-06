import { TUser } from '@/entities/user';

export type TRegistrationForm = Omit<TUser, 'id'> & {
  prefix: string;
  confirm: string;
};
