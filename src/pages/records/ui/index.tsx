import { Button, Typography } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';

import { recordsApi } from '@/entities/records';
import { CreateRecordModal } from '@/features/records/create-record-modal';
import { EditRecordModal } from '@/features/records/edit-record-modal';
import { RecordsCards } from '@/features/records/records-cards';
import { RecordsTable } from '@/features/records/records-table';
import { useDeviceDetect } from '@/shared/hooks';

import styles from './index.module.scss';

const BLOCK_NAME = 'Records';
const cn = classNames.bind(styles);

export const Records = () => {
  const [isModalCreateVisible, setModalCreateVisible] = useState(false);
  const [isModalEditVisible, setModalEditVisible] = useState(false);
  const [recordId, setRecordId] = useState<number | null>(null);
  const { isMobile } = useDeviceDetect();
  const { data, isLoading } = recordsApi.useGetRecordsQuery();

  const handleOpenCreateRecord = () => {
    setModalCreateVisible(true);
  };

  const handleCloseCreateRecord = () => {
    setModalCreateVisible(false);
  };

  const handleOpenEditRecord = (id: number) => {
    setRecordId(id);
    setModalEditVisible(true);
  };

  const handleCloseEditRecord = () => {
    setModalEditVisible(false);
    setRecordId(null);
  };

  return (
    <div className={cn(BLOCK_NAME)}>
      <div className={cn(`${BLOCK_NAME}__header`)}>
        <Typography.Title className={cn(`${BLOCK_NAME}__title`)} level={2}>
          Записи
        </Typography.Title>
        <div className={cn(`${BLOCK_NAME}__actions`)}>
          <Button type="primary" onClick={handleOpenCreateRecord}>
            Создать запись
          </Button>
        </div>
      </div>
      <div className={cn(`${BLOCK_NAME}__content`)}>
        {isMobile ? (
          <RecordsCards data={data} isLoading={isLoading} onEditRecord={handleOpenEditRecord} />
        ) : (
          <RecordsTable data={data} isLoading={isLoading} onEditRecord={handleOpenEditRecord} />
        )}
      </div>
      <CreateRecordModal
        isModalVisible={isModalCreateVisible}
        onCloseCreateRecord={handleCloseCreateRecord}
      />
      <EditRecordModal
        isModalVisible={isModalEditVisible}
        onCloseEditRecord={handleCloseEditRecord}
        recordId={recordId}
      />
    </div>
  );
};
