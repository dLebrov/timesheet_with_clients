import { Dayjs } from 'dayjs';

export type TClientForm = {
  surname: string;
  name: string;
  birthDate: Dayjs | null;
  group: string;
  description: string;
  subjects: Array<number>;
};
