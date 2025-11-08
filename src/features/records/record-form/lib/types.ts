import { Dayjs } from 'dayjs';

import { ERecordStatus } from '@/entities/records';

export type TRecordForm = {
  serviceId: number;
  clientId: number;
  subjectId: number;
  description: string;
  start_time: Dayjs;
  end_time: Dayjs;
  date: Dayjs;
  price: number;
  status: ERecordStatus;
  isPaid: boolean;
  // временное поле для времени начало-конец
  timeRange: [Dayjs, Dayjs];
};
