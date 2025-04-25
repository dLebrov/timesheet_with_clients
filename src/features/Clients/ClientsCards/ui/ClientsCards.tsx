import { Button, Card, Empty, Spin } from 'antd';
import moment from 'moment';
import { memo } from 'react';
import styled from 'styled-components';

import { getClientName, TClientResponse } from '@/entities/clients';

import { CardDescription } from './CardDescription';

const StyledContainer = styled('div')<{ $isLoading: boolean }>`
  height: 100%;
  display: flex;
  align-items: ${(props) => (props.$isLoading ? 'center' : 'flex-start')};
  box-sizing: border-box;
`;

const StyledCardsContainer = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  gap: 16px;
  overflow-y: auto;
  padding-right: 8px;
`;

const StyledCardWrapper = styled('div')``;

const StyledDescriptionWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

type TClientsCardsProps = {
  data: TClientResponse[] | undefined;
  isLoading: boolean;
};
// разобраться с высотой скролла на мобилке
export const ClientsCards = memo(function ClientsCards({ data, isLoading }: TClientsCardsProps) {
  return (
    <StyledContainer $isLoading={isLoading}>
      {isLoading && <Spin size="large" />}
      {!isLoading && !data?.length && <Empty description="Нет данных" />}
      {!isLoading && data?.length && (
        <StyledCardsContainer>
          {data?.map((client) => {
            const { id, description, birthDate, group } = client;
            return (
              <StyledCardWrapper>
                <Card
                  key={id}
                  title={getClientName(client)}
                  extra={<Button type="primary">Редактировать</Button>}
                  style={{ width: '100%' }}
                >
                  <StyledDescriptionWrapper>
                    {description && <CardDescription title="Описание" value={description} />}
                    {birthDate && (
                      <CardDescription
                        title="День рождения"
                        value={moment(birthDate).format('DD.MM.YYYY')}
                      />
                    )}
                    {group && <CardDescription title="Группа" value={group} />}
                  </StyledDescriptionWrapper>
                </Card>
              </StyledCardWrapper>
            );
          })}
        </StyledCardsContainer>
      )}
    </StyledContainer>
  );
});
