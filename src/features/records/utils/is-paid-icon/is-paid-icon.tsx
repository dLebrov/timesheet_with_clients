import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export const isPaidIcon = (isPaid: boolean) =>
  isPaid ? (
    <CheckCircleOutlined style={{ color: 'green' }} />
  ) : (
    <CloseCircleOutlined style={{ color: 'red' }} />
  );
