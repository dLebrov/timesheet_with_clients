import { Button, Typography } from 'antd';
import styled from 'styled-components';

import { useGetClientsQuery } from '@/entities/clients';
import { ClientsCards } from '@/features/Clients/ClientsCards';
import { ClientsTable } from '@/features/Clients/ClientsTable/ui/ClientsTable';
import { useDeviceDetect } from '@/shared/hooks/useDeviceDetect';

const StyledContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 112px);
`;

const StyledContent = styled('div')`
  flex: 1;
  height: 100%;
  overflow: hidden;
`;

const StyledHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  box-sizing: border-box;
  flex-shrink: 0;
`;

const StyledTitle = styled(Typography.Title)`
  margin-bottom: 0 !important;
`;

export const Clients = () => {
  const { isMobile } = useDeviceDetect();
  const { data, isLoading } = useGetClientsQuery();

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle level={2}>Клиенты</StyledTitle>
        <Button type="primary">Создать клиента</Button>
      </StyledHeader>
      <StyledContent>
        {isMobile ? (
          <ClientsCards data={data} isLoading={isLoading} />
        ) : (
          <ClientsTable data={data} isLoading={isLoading} />
        )}
      </StyledContent>
    </StyledContainer>
  );
};
