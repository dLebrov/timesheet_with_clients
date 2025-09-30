import { TClientResponse } from '@/entities/clients';
import { TService } from '@/entities/services';

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
  clientId: number;
  clients: TClientResponse;
  serviceId: number;
  services: TService;
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
  userId: 0;
  clientId: 0;
  serviceId: 0;
  status: 'processed';
  isPaid: true;
  description: 'string';
  price: 0;
  date: 'string';
  start_time: 'string';
  end_time: 'string';
};

export type TUpdateRecordParams = {
  query: {
    id: number;
  };
  body: TCreateRecordBody;
};
