import { Button, Typography } from 'antd';
import styled from 'styled-components';

import { ClientsTable } from '@/features/Clients/ClientsTable/ui/ClientsTable';
import { useDeviceDetect } from '@/shared/hooks/useDeviceDetect';

const StyledContainer = styled('div')``;

const StyledHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Clients = () => {
  const { isMobile } = useDeviceDetect();

  return (
    <StyledContainer>
      <StyledHeader>
        <Typography.Title>Клиенты</Typography.Title>
        <Button type="primary">Создать клиента</Button>
      </StyledHeader>
      {isMobile ? <div>test</div> : <ClientsTable />}
    </StyledContainer>
  );
};
