import { TAuthParams } from '@/entities/user';

export type TLoginForm = TAuthParams & {
  canRemember: boolean;
};
