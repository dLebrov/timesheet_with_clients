import { Button, Card, message, Spin } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';

import { serviceApi } from '@/entities/services/api/servicesApi';

import { CreateServiceModal } from '../components/create-service-modal';
import styles from './index.module.scss';

const BLOCK_NAME = 'AddServices';
const cn = classNames.bind(styles);

export const AddServices = () => {
  const [isOpenAddServices, setIsOpenAddServices] = useState(false);
  const { data, isLoading } = serviceApi.useGetServicesQuery();
  const [deleteService, { isLoading: isDeleting }] = serviceApi.useDeleteServiceMutation();

  const handleClickAddServices = () => {
    setIsOpenAddServices(true);
  };

  const handleCloseAddServices = () => {
    setIsOpenAddServices(false);
  };

  const handleDeleteServices = async (id: number) => {
    try {
      await deleteService(id).unwrap();
      message.success('Услуга успешно удалена');
    } catch (error) {
      console.error(error);
      message.error('Не удалось удалить услугу');
    }
  };

  if (isLoading) return <Spin size="large" />;

  return (
    <div className={cn(BLOCK_NAME)}>
      <CreateServiceModal isModalVisible={isOpenAddServices} onClose={handleCloseAddServices} />
      <div className={cn(`${BLOCK_NAME}__header`)}>
        <Button type="primary" onClick={handleClickAddServices}>
          Добавить Услугу
        </Button>
      </div>
      <div className={cn(`${BLOCK_NAME}__cards-container`)}>
        {data?.map(({ id, name }) => {
          return (
            <Card
              key={id}
              title={name}
              extra={
                <Button
                  type="primary"
                  color="red"
                  onClick={() => handleDeleteServices(id)}
                  disabled={isDeleting}
                >
                  Удалить
                </Button>
              }
            />
          );
        })}
      </div>
    </div>
  );
};
