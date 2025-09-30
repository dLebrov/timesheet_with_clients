import { Button, Typography } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';

import { clientsApi } from '@/entities/clients';
import { ClientsCards } from '@/features/clients/clients-cards';
import { ClientsTable } from '@/features/clients/clients-table';
import { CreateClientModal } from '@/features/clients/create-client-modal';
import { EditClientModal } from '@/features/clients/edit-client-modal';
import { useDeviceDetect } from '@/shared/hooks';

import styles from './index.module.scss';

const BLOCK_NAME = 'Clients';
const cn = classNames.bind(styles);

export const Clients = () => {
  const [isModalCreateVisible, setModalCreateVisible] = useState(false);
  const [isModalEditVisible, setModalEditVisible] = useState(false);
  const [clientId, setClientId] = useState<number | null>(null);
  const { isMobile } = useDeviceDetect();
  const { data, isLoading } = clientsApi.useGetClientsQuery();

  const handleOpenCreateClient = () => {
    setModalCreateVisible(true);
  };

  const handleCloseCreateClient = () => {
    setModalCreateVisible(false);
  };

  const handleOpenEditClient = (id: number) => {
    setClientId(id);
    setModalEditVisible(true);
  };

  const handleCloseEditClient = () => {
    setModalEditVisible(false);
    setClientId(null);
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
          <ClientsCards data={data} isLoading={isLoading} onEditClient={handleOpenEditClient} />
        ) : (
          <ClientsTable data={data} isLoading={isLoading} onEditClient={handleOpenEditClient} />
        )}
      </div>
      <CreateClientModal
        isModalVisible={isModalCreateVisible}
        onCloseCreateClient={handleCloseCreateClient}
      />
      <EditClientModal
        isModalVisible={isModalEditVisible}
        onCloseEditClient={handleCloseEditClient}
        clientId={clientId}
      />
    </div>
  );
};
