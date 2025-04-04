import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };
  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <StyledContainer>
      <StyledText>Приветствую вас в системе учёта клиентов</StyledText>
      <StyledText>
        Вам необходимо <Button onClick={handleLogin}>Войти</Button> или{' '}
        <Button onClick={handleRegister}>Зарегистрироваться</Button>
      </StyledText>
    </StyledContainer>
  );
};
