import { Alert, Button, Calendar, Spin, Typography } from 'antd';
import classNames from 'classnames/bind';
import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useMemo, useState } from 'react';

import { recordsApi, TRecordResponse } from '@/entities/records';
import { CreateRecordModal } from '@/features/records/create-record-modal';
import { RecordsListModal } from '@/features/records-calendar/records-list-modal/ui';
import { getRecordTime } from '@/shared/_utils/get-record-time';
import { useDeviceDetect } from '@/shared/hooks';

import { DESKTOP_TEXT, MOBILE_TEXT } from '../lib/constants';
import styles from './index.module.scss';

const BLOCK_NAME = 'RecordsCalendar';
const cn = classNames.bind(styles);

export const RecordsCalendar = () => {
  const { data, isLoading } = recordsApi.useGetRecordsQuery();
  const { isMobile } = useDeviceDetect();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalCreateVisible, setModalCreateVisible] = useState(false);

  const recordsByDate = useMemo(() => {
    if (!data) return {};

    return data.reduce<Record<string, TRecordResponse[]>>((acc, record) => {
      const key = dayjs(record.date).format('YYYY-MM-DD');
      acc[key] = acc[key] ? [...acc[key], record] : [record];
      return acc;
    }, {});
  }, [data]);

  const renderDateCell = useCallback(
    (value: Dayjs) => {
      const list = recordsByDate[value.format('YYYY-MM-DD')] ?? [];

      if (isMobile) {
        return (
          <div className={cn(`${BLOCK_NAME}__dateCell-mobile`)}>
            <Typography.Title level={2}> {list.length > 0 ? list.length : null}</Typography.Title>
          </div>
        );
      }

      return (
        <ul className={cn(`${BLOCK_NAME}__dateCell`)}>
          {list.map((record) => (
            <li className={cn(`${BLOCK_NAME}__record`)} key={record.id}>
              <Typography.Text>
                {getRecordTime({ start_time: record.start_time, end_time: record.end_time })}
              </Typography.Text>
            </li>
          ))}
        </ul>
      );
    },
    [isMobile, recordsByDate],
  );

  const selectedDateRecords = useMemo(() => {
    if (!selectedDate) return [];
    const key = selectedDate.format('YYYY-MM-DD');
    return recordsByDate[key] ?? [];
  }, [recordsByDate, selectedDate]);

  const onSelectDate = useCallback((value: Dayjs) => {
    setSelectedDate(value);
    setIsModalVisible(true);
  }, []);

  const handleCloseCreateRecord = () => {
    setModalCreateVisible(false);
  };

  const handleOpenCreateRecord = () => {
    setModalCreateVisible(true);
  };

  if (isLoading) {
    return (
      <div className={cn(BLOCK_NAME)}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={cn(BLOCK_NAME)}>
      {isMobile && <Alert message={MOBILE_TEXT} type="warning" />}
      {!isMobile && <Alert message={DESKTOP_TEXT} type="warning" />}
      <div className={cn(`${BLOCK_NAME}__actions`)}>
        <Button type="primary" onClick={handleOpenCreateRecord}>
          Создать запись
        </Button>
      </div>
      <Calendar mode="month" cellRender={renderDateCell} onSelect={onSelectDate} />
      <RecordsListModal
        records={selectedDateRecords}
        isModalVisible={isModalVisible}
        handleClose={() => setIsModalVisible(false)}
      />
      <CreateRecordModal
        isModalVisible={isModalCreateVisible}
        onCloseCreateRecord={handleCloseCreateRecord}
      />
    </div>
  );
};
