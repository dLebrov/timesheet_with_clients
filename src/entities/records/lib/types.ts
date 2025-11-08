import { TClientResponse } from '@/entities/clients';
import { TService } from '@/entities/services';
import { TSubjectResponse } from '@/entities/subjects';

export enum ERecordStatus {
  Processed = 'processed',
  Canceled = 'canceled',
  Pending = 'pending',
  Postponed = 'postponed',
}

export type TRecordResponse = {
  id: number;
  userId: number;
  // users: {};
  serviceId: number;
  services: TService;
  clientId: number;
  clients: TClientResponse;
  subjectId: number;
  subjects: TSubjectResponse | null;
  status: ERecordStatus;
  isPaid: boolean;
  description: string;
  price: number;
  date: Date;
  start_time: Date;
  end_time: Date;
  createdAt: Date;
};

export type TCreateRecordBody = {
  serviceId: number;
  clientId: number;
  subjectId: number;
  description: string;
  start_time: string;
  end_time: string;
  date: string;
  price: number;
  status: ERecordStatus;
  isPaid: boolean;
};

export type TUpdateRecordParams = {
  query: {
    id: number;
  };
  body: TCreateRecordBody;
};
