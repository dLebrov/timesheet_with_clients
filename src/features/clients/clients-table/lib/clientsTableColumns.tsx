import { EditOutlined } from '@ant-design/icons';
import { Button, TableProps } from 'antd';
import moment from 'moment';

import { TClientSubjects } from '@/entities/clients';

import { TClient } from './types';

type TClientsTableColumnsProps = {
  onEditClient: (id: number) => void;
};

export const clientsTableColumns = ({
  onEditClient,
}: TClientsTableColumnsProps): TableProps<TClient>['columns'] => [
  {
    title: '',
    key: 'actions',
    render: (_, record) => (
      <Button
        type="primary"
        onClick={() => onEditClient(record.id)}
        icon={<EditOutlined key="edit" />}
      />
    ),
  },
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
    width: 150,
  },
  {
    title: 'Группа',
    dataIndex: 'group',
    key: 'group',
  },
  {
    title: 'Предметы',
    dataIndex: 'client_subjects',
    key: 'client_subjects',
    render: (subjectsData) =>
      subjectsData.map(({ subjects }: TClientSubjects) => subjects.name).join(', '),
  },
  {
    title: 'Описание',
    dataIndex: 'description',
    key: 'description',
    width: 400,
  },
  {
    title: 'Создан',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date) => moment(date).format('DD.MM.YYYY'),
  },
];
