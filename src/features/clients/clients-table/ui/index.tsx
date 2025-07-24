import { Empty, Skeleton, Table, TablePaginationConfig } from 'antd';
import { memo, useCallback, useMemo, useState } from 'react';

import { TClientResponse } from '@/entities/clients';

import { clientsTableColumns } from '../lib/clientsTableColumns';
import { TClient } from '../lib/types';

type TClientsTableProps = {
  data: TClientResponse[] | undefined;
  isLoading: boolean;
  onEditClient: (id: number) => void;
};

export const ClientsTable = memo(function ClientsTable({
  data,
  isLoading,
  onEditClient,
}: TClientsTableProps) {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handleTableChange = useCallback((paginationConfig: TablePaginationConfig) => {
    setPagination({
      current: paginationConfig.current!,
      pageSize: paginationConfig.pageSize!,
    });
  }, []);
  const columns = useMemo(() => clientsTableColumns({ onEditClient }), [onEditClient]);

  return (
    <div style={{ height: '100%' }}>
      <Table<TClient>
        dataSource={data ?? []}
        columns={columns}
        rowKey="id"
        scroll={{
          y: 'calc(100vh - 285px)',
          x: 'max-content',
        }}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} из ${total}`,
          pageSizeOptions: ['5', '10', '20', '50'],
        }}
        onChange={handleTableChange}
        locale={{
          emptyText: isLoading ? <Skeleton active /> : <Empty description="Нет данных" />,
        }}
      />
    </div>
  );
});
