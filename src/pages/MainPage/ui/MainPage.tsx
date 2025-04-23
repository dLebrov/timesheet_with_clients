import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { CustomFooter } from '@/widgets/CustomFooter';

const StyledContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledActions = styled('div')`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  gap: 24px;
`;

const StyledText = styled('div')`
  font-size: 24px;
  font-weight: 600;
`;

const StyledBtnContainer = styled('div')`
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  padding: 0 24px;
`;

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <StyledActions>
        <StyledText>Что нам нужно сегодня?</StyledText>
        <StyledBtnContainer>
          <Button type="primary" onClick={() => navigate('/calendar')}>
            Календарь
          </Button>
          <Button type="primary" onClick={() => navigate('/clients')}>
            Клиенты
          </Button>
          <Button type="primary" onClick={() => navigate('/records')}>
            Записи
          </Button>
        </StyledBtnContainer>
      </StyledActions>
      <CustomFooter />
    </StyledContainer>
  );
};
