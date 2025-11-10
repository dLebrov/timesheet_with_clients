import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Empty, Spin } from 'antd';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { memo } from 'react';

import { getClientName, TClientSubjects } from '@/entities/clients';
import { CardDescription } from '@/shared/components/card-description';

import { TClient } from '../../clients-table/lib/types';
import styles from './index.module.scss';

const BLOCK_NAME = 'ClientsCards';
const cn = classNames.bind(styles);

type TClientsCardsProps = {
  data: TClient[] | undefined;
  isLoading: boolean;
  onEditClient: (id: number) => void;
};
export const ClientsCards = memo(function ClientsCards({
  data = [],
  isLoading,
  onEditClient,
}: TClientsCardsProps) {
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
          {data?.map((client) => {
            const { id, description, birthDate, group, client_subjects } = client;

            return (
              <Card
                key={id}
                title={getClientName(client)}
                extra={
                  <Button
                    type="primary"
                    onClick={() => onEditClient(id)}
                    icon={<EditOutlined key="edit" />}
                  />
                }
                style={{ width: '100%' }}
              >
                <div className={cn(`${BLOCK_NAME}__card-description`)}>
                  {description && <CardDescription title="Описание" value={description} />}
                  {birthDate && (
                    <CardDescription
                      title="День рождения"
                      value={dayjs(birthDate).format('DD.MM.YYYY')}
                    />
                  )}
                  {group && <CardDescription title="Группа" value={group} />}
                  {client_subjects.length > 0 && (
                    <CardDescription
                      title="Предметы"
                      value={client_subjects
                        .map(({ subjects }: TClientSubjects) => subjects.name)
                        .join(', ')}
                    />
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
});
