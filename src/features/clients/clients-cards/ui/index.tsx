import { Button, Card, Empty, Spin } from 'antd';
import classNames from 'classnames/bind';
import moment from 'moment';
import { memo } from 'react';

import { getClientName, TClientResponse } from '@/entities/clients';

import { CardDescription } from '../components/card-description';
import styles from './index.module.scss';

const BLOCK_NAME = 'ClientsCards';
const cn = classNames.bind(styles);

type TClientsCardsProps = {
  data: TClientResponse[] | undefined;
  isLoading: boolean;
};
// разобраться с высотой скролла на мобилке
export const ClientsCards = memo(function ClientsCards({ data, isLoading }: TClientsCardsProps) {
  return (
    <div
      className={cn(BLOCK_NAME, {
        [`${BLOCK_NAME}__loading`]: isLoading,
      })}
    >
      {isLoading && <Spin size="large" />}
      {!isLoading && !data?.length && <Empty description="Нет данных" />}
      {!isLoading && data?.length && (
        <div className={cn(`${BLOCK_NAME}__cards-container`)}>
          {data?.map((client) => {
            const { id, description, birthDate, group } = client;

            return (
              <Card
                key={id}
                title={getClientName(client)}
                extra={<Button type="primary">Редактировать</Button>}
                style={{ width: '100%' }}
              >
                <div className={cn(`${BLOCK_NAME}__card-description`)}>
                  {description && <CardDescription title="Описание" value={description} />}
                  {birthDate && (
                    <CardDescription
                      title="День рождения"
                      value={moment(birthDate).format('DD.MM.YYYY')}
                    />
                  )}
                  {group && <CardDescription title="Группа" value={group} />}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
});
