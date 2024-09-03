import { Footer } from 'antd/es/layout/layout';
import styled from 'styled-components';

const StyledFooter = styled(Footer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: canter;
`;

export const CustomFooter = () => {
  return (
    <StyledFooter>
      <div>Ant Design ©{new Date().getFullYear()} Created by DLebrov</div>
      <div>Версия {import.meta.env.VITE_APP_VERSION}</div>
    </StyledFooter>
  );
};
