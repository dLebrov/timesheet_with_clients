import { Button } from 'antd';
import styled from 'styled-components';

const StyledContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
`;

const StyledText = styled('div')`
  font-size: 24px;
`;

export const MainPage = () => {
  return (
    <StyledContainer>
      <StyledText>Приветствую вас в системе учета клиентов</StyledText>
      <StyledText>
        Вам необходимо <Button>Войти</Button> или <Button>Зарегистрироваться</Button>
      </StyledText>
    </StyledContainer>
  );
};
