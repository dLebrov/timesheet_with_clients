import { Empty, Skeleton, Table, TablePaginationConfig } from 'antd';
import { memo, useCallback, useMemo, useState } from 'react';

import { recordsTableColumns } from '../lib/recordsTableColumns';
import { TRecord } from '../lib/types';

type TRecordsTableProps = {
  data: TRecord[] | undefined;
  isLoading: boolean;
  onEditRecord: (id: number) => void;
};

export const RecordsTable = memo(function RecordsTable({
  data,
  isLoading,
  onEditRecord,
}: TRecordsTableProps) {
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
  const columns = useMemo(() => recordsTableColumns({ onEditRecord }), [onEditRecord]);

  return (
    <div style={{ height: '100%' }}>
      <Table<TRecord>
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
