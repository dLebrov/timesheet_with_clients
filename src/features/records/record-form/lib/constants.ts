import { ERecordStatus } from '@/entities/records';

export const statusOptions = [
  {
    label: 'В ожидании',
    value: ERecordStatus.Pending,
  },
  {
    label: 'Завершено',
    value: ERecordStatus.Processed,
  },
  {
    label: 'Отменено',
    value: ERecordStatus.Canceled,
  },
  {
    label: 'Перенесено',
    value: ERecordStatus.Postponed,
  },
];
