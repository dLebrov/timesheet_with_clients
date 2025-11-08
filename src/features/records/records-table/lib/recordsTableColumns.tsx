import { EditOutlined } from '@ant-design/icons';
import { Button, TableProps } from 'antd';
import moment from 'moment';

import { getClientName } from '@/entities/clients';

import { formatNumberWithPoints } from '../../utils/format-number-with-points';
import { getRecordTime } from '../../utils/get-record-time';
import { getStatusText } from '../../utils/get-status-text';
import { isPaidIcon } from '../../utils/is-paid-icon';
import { TRecord } from './types';

type TRecordsTableColumnsProps = {
  onEditRecord: (id: number) => void;
};

export const recordsTableColumns = ({
  onEditRecord,
}: TRecordsTableColumnsProps): TableProps<TRecord>['columns'] => [
  {
    title: '',
    key: 'actions',
    render: (_, record) => (
      <Button
        type="primary"
        onClick={() => onEditRecord(record.id)}
        icon={<EditOutlined key="edit" />}
      />
    ),
  },
  {
    title: 'Название Услуги',
    dataIndex: ['services', 'name'],
    key: 'services.name',
  },
  {
    title: 'Клиент',
    key: 'client.name',
    render: (_, { clients }) => getClientName(clients),
  },
  {
    title: 'Предмет',
    key: 'subject.name',
    render: (_, { subjects }) => subjects?.name,
    onCell: () => ({ style: { minWidth: 100 } }),
  },
  {
    title: 'Описание',
    dataIndex: 'description',
    key: 'description',
    onCell: () => ({ style: { minWidth: 200 } }),
  },
  {
    title: 'Время Записи',
    key: 'time',
    render: (_, { start_time, end_time }) => {
      return getRecordTime({ start_time, end_time });
    },
    align: 'center',
  },
  {
    title: 'Дата Записи',
    dataIndex: 'date',
    key: 'date',
    render: (date) => (date ? moment(date).format('DD.MM.YYYY') : null),
    align: 'center',
  },
  {
    title: 'Оплачено',
    dataIndex: 'isPaid',
    key: 'isPaid',
    render: (isPaid) => isPaidIcon(isPaid),
    align: 'center',
    width: 110,
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'price',
    render: (price) => (price !== null ? `${formatNumberWithPoints(price)} ₽` : null),
    align: 'center',
    width: 120,
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    render: (status) => getStatusText(status),
  },
];
