import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Empty, Spin } from 'antd';
import classNames from 'classnames/bind';
import moment from 'moment';
import { memo } from 'react';

import { getClientName } from '@/entities/clients';
import { CardDescription } from '@/shared/components/card-description';

import { TRecord } from '../../records-table/lib/types';
import { formatNumberWithPoints } from '../../utils/format-number-with-points';
import { getRecordTime } from '../../utils/get-record-time';
import { getStatusText } from '../../utils/get-status-text';
import { isPaidIcon } from '../../utils/is-paid-icon';
import styles from './index.module.scss';

const BLOCK_NAME = 'RecordsCards';
const cn = classNames.bind(styles);

type TRecordsCardsProps = {
  data: TRecord[] | undefined;
  isLoading: boolean;
  onEditRecord: (id: number) => void;
};

export const RecordsCards = memo(function RecordsCards({
  data = [],
  isLoading,
  onEditRecord,
}: TRecordsCardsProps) {
  const hasData = data.length > 0;

  return (
    <div
      className={cn(BLOCK_NAME, {
        [`${BLOCK_NAME}__loading`]: isLoading,
      })}
    >
      {isLoading && <Spin size="large" />}
      {!isLoading && !hasData && <Empty description="Нет данных" />}
      {!isLoading && hasData && (
        <div className={cn(`${BLOCK_NAME}__cards-container`)}>
          {data?.map(
            ({
              id,
              description,
              start_time,
              end_time,
              clients,
              services,
              date,
              subjects,
              isPaid,
              price,
              status,
            }) => {
              const recordTime = getRecordTime({ start_time, end_time });
              const recordDate = date ? moment(date).format('DD.MM.YYYY') : null;

              return (
                <Card
                  title={services.name}
                  extra={
                    <Button
                      type="primary"
                      onClick={() => onEditRecord(id)}
                      icon={<EditOutlined key="edit" />}
                    />
                  }
                  style={{ width: '100%' }}
                >
                  <div className={cn(`${BLOCK_NAME}__card-description`)}>
                    {description && <CardDescription title="Описание" value={description} />}
                    {clients && <CardDescription title="Клиент" value={getClientName(clients)} />}
                    {subjects && <CardDescription title="Предмет" value={subjects.name} />}
                    {recordTime && <CardDescription title="Время Записи" value={recordTime} />}
                    {recordDate && <CardDescription title="Дата Записи" value={recordDate} />}
                    <CardDescription title="Оплачено" value={isPaidIcon(isPaid)} />
                    {price !== null && (
                      <CardDescription title="Цена" value={`${formatNumberWithPoints(price)} ₽`} />
                    )}
                    {status && <CardDescription title="Статус" value={getStatusText(status)} />}
                  </div>
                </Card>
              );
            },
          )}
        </div>
      )}
    </div>
  );
});
