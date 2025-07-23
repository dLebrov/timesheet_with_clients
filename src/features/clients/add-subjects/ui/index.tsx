import { Button, Card, message, Spin } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';

import { clientsApi } from '@/entities/clients';

import { CreateSubjectModal } from '../components/create-subject-modal';
import styles from './index.module.scss';

const BLOCK_NAME = 'Subject';
const cn = classNames.bind(styles);

export const AddSubject = () => {
  const [isOpenAddSubject, setIsOpenAddSubject] = useState(false);
  const { data, isLoading } = clientsApi.useGetSubjectsQuery();
  const [deleteSubject, { isLoading: isDeleting }] = clientsApi.useDeleteSubjectMutation();

  const handleClickAddSubject = () => {
    setIsOpenAddSubject(true);
  };

  const handleCloseAddSubject = () => {
    setIsOpenAddSubject(false);
  };

  const handleDeleteSubject = async (id: number) => {
    try {
      await deleteSubject(id);
      message.success('Предмет успешно удален');
    } catch (error) {
      console.error(error);
      message.error('Не удалось удалить предмет');
    }
  };

  if (isLoading) return <Spin size="large" />;

  return (
    <div className={cn(BLOCK_NAME)}>
      <CreateSubjectModal isModalVisible={isOpenAddSubject} onClose={handleCloseAddSubject} />
      <div className={cn(`${BLOCK_NAME}__header`)}>
        <Button type="primary" onClick={handleClickAddSubject}>
          Добавить Предмет
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
                  onClick={() => handleDeleteSubject(id)}
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
