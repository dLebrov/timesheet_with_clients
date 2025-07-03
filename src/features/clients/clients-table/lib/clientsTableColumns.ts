import { TableProps } from 'antd';
import moment from 'moment';

import { TClient } from './types';

export const clientsTableColumns: TableProps<TClient>['columns'] = [
  {
    title: 'Фамилия',
    dataIndex: 'surname',
    key: 'surname',
  },
  {
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Дата рождения',
    dataIndex: 'birthDate',
    key: 'birthDate',
    render: (date) => (date ? moment(date).format('DD.MM.YYYY') : null),
  },
  {
    title: 'Группа',
    dataIndex: 'group',
    key: 'group',
  },
  {
    title: 'Описание',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Создан',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date) => moment(date).format('DD.MM.YYYY'),
  },
];
