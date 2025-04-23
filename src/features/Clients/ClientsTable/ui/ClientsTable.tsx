import { Empty, Skeleton, Table } from 'antd';

import { useGetClientsQuery } from '@/entities/clients';

import { clientsTableColumns } from '../lib/clientsTableColumns';
import { TClient } from '../lib/types';

export const ClientsTable = () => {
  const { data, isLoading } = useGetClientsQuery();

  return (
    <Table<TClient>
      dataSource={data ?? []}
      columns={clientsTableColumns}
      rowKey="id"
      locale={{
        emptyText: !isLoading ? <Skeleton active /> : <Empty description="Нет данных" />,
      }}
    />
  );
};
