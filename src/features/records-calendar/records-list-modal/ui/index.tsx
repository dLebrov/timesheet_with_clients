import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Modal, Typography } from 'antd';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { useState } from 'react';

import { getClientName } from '@/entities/clients';
import { TRecordResponse } from '@/entities/records';
import { EditRecordModal } from '@/features/records/edit-record-modal';
import { getStatusText } from '@/features/records/utils/get-status-text';
import { formatNumberWithPoints } from '@/shared/_utils/format-number-with-points';
import { getRecordTime } from '@/shared/_utils/get-record-time';

import styles from './index.module.scss';

const BLOCK_NAME = 'RecordsListModal';
const cn = classNames.bind(styles);

type RecordsListModalProps = {
  records: TRecordResponse[];
  isModalVisible: boolean;
  handleClose: () => void;
};

export const RecordsListModal = ({
  records,
  isModalVisible,
  handleClose,
}: RecordsListModalProps) => {
  const [isModalEditVisible, setModalEditVisible] = useState(false);
  const [recordId, setRecordId] = useState<number | null>(null);

  const handleCloseEditRecord = () => {
    setModalEditVisible(false);
    setRecordId(null);
  };

  if (records.length === 0) {
    return null;
  }

  return (
    <>
      <Modal
        open={isModalVisible}
        title={`Записи на дату ${dayjs(records[0].date).format('DD.MM.YYYY')}`}
        onCancel={handleClose}
        footer={null}
        centered
      >
        <div className={cn(BLOCK_NAME)}>
          {records.map((record) => {
            const { services, start_time, end_time, clients, id, subjects, status, price } = record;

            return (
              <Card
                key={id}
                title={services.name}
                extra={
                  <Button
                    type="primary"
                    onClick={() => {
                      setModalEditVisible(true);
                      setRecordId(id);
                    }}
                    icon={<EditOutlined key="edit" />}
                  />
                }
                style={{ width: '100%' }}
              >
                <div className={cn(`${BLOCK_NAME}__record`)} key={id}>
                  <Typography.Text>{`Клиент: ${getClientName(clients)}`}</Typography.Text>
                  {subjects && <Typography.Text>{`Предмет: ${subjects?.name}`}</Typography.Text>}
                  <Typography.Text>{`время: ${getRecordTime({ start_time, end_time })}`}</Typography.Text>
                  {price ? (
                    <Typography.Text>{`Цена: ${formatNumberWithPoints(price)}`}</Typography.Text>
                  ) : null}
                  <div className={cn(`${BLOCK_NAME}__status`)}>{getStatusText(status)}</div>
                </div>
              </Card>
            );
          })}
        </div>
      </Modal>
      <EditRecordModal
        isModalVisible={isModalEditVisible}
        onCloseEditRecord={handleCloseEditRecord}
        recordId={recordId}
      />
    </>
  );
};
