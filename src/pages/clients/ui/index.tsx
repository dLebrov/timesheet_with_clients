import { Button, Typography } from 'antd';
import classNames from 'classnames/bind';

import { useGetClientsQuery } from '@/entities/clients';
import { ClientsCards } from '@/features/clients/clients-cards';
import { ClientsTable } from '@/features/clients/clients-table';
import { useDeviceDetect } from '@/shared/hooks/useDeviceDetect';

import styles from './index.module.scss';

const BLOCK_NAME = 'Clients';
const cn = classNames.bind(styles);

export const Clients = () => {
  const { isMobile } = useDeviceDetect();
  const { data, isLoading } = useGetClientsQuery();

  return (
    <div className={cn(BLOCK_NAME)}>
      <div className={cn(`${BLOCK_NAME}__header`)}>
        <Typography.Title className={cn(`${BLOCK_NAME}__title`)} level={2}>
          Клиенты
        </Typography.Title>
        <Button type="primary">Создать клиента</Button>
      </div>
      <div className={cn(`${BLOCK_NAME}__content`)}>
        {isMobile ? (
          <ClientsCards data={data} isLoading={isLoading} />
        ) : (
          <ClientsTable data={data} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};
