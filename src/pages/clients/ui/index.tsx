import { Button, Typography } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';

import { clientsApi } from '@/entities/clients';
import { ClientsCards } from '@/features/clients/clients-cards';
import { ClientsTable } from '@/features/clients/clients-table';
import { CreateClientModal } from '@/features/clients/create-client-modal';
import { useDeviceDetect } from '@/shared/hooks/useDeviceDetect';

import styles from './index.module.scss';

const BLOCK_NAME = 'Clients';
const cn = classNames.bind(styles);

export const Clients = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { isMobile } = useDeviceDetect();
  const { data, isLoading } = clientsApi.useGetClientsQuery();

  const handleOpenCreateClient = () => {
    setModalVisible(true);
  };

  const handleCloseCreateClient = () => {
    setModalVisible(false);
  };

  return (
    <div className={cn(BLOCK_NAME)}>
      <div className={cn(`${BLOCK_NAME}__header`)}>
        <Typography.Title className={cn(`${BLOCK_NAME}__title`)} level={2}>
          Клиенты
        </Typography.Title>
        <div className={cn(`${BLOCK_NAME}__actions`)}>
          <Button type="primary" onClick={handleOpenCreateClient}>
            Создать клиента
          </Button>
        </div>
      </div>
      <div className={cn(`${BLOCK_NAME}__content`)}>
        {isMobile ? (
          <ClientsCards data={data} isLoading={isLoading} />
        ) : (
          <ClientsTable data={data} isLoading={isLoading} />
        )}
      </div>
      <CreateClientModal
        isModalVisible={isModalVisible}
        onCloseCreateClient={handleCloseCreateClient}
      />
    </div>
  );
};
