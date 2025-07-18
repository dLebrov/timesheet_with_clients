import { Dayjs } from 'dayjs';

export type TCreateClientForm = {
  surname: string;
  name: string;
  birthDate: Dayjs | null;
  group: string;
  description: string;
};
