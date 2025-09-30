import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Tag } from 'antd';

import { ERecordStatus } from '@/entities/records';

export const getStatusText = (status: ERecordStatus) => {
  switch (status) {
    case ERecordStatus.Processed:
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          Проведено
        </Tag>
      );
    case ERecordStatus.Canceled:
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">
          Отменено
        </Tag>
      );
    case ERecordStatus.Postponed:
      return (
        <Tag icon={<ExclamationCircleOutlined />} color="warning">
          Перенесено
        </Tag>
      );
    case ERecordStatus.Pending:
      return (
        <Tag icon={<SyncOutlined spin />} color="processing">
          В ожидании
        </Tag>
      );
    default:
      return <Tag color="default">Не указано</Tag>;
  }
};
