import { Empty, Skeleton, Table } from 'antd';
import { memo } from 'react';

import { TClientResponse } from '@/entities/clients';

import { clientsTableColumns } from '../lib/clientsTableColumns';
import { TClient } from '../lib/types';

type TClientsTableProps = {
  data: TClientResponse[] | undefined;
  isLoading: boolean;
};

export const ClientsTable = memo(function ClientsTable({ data, isLoading }: TClientsTableProps) {
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
});
