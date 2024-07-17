import { Footer } from 'antd/es/layout/layout';
import styled from 'styled-components';

const StyledFooter = styled(Footer)`
  text-align: center;
`;

export const CustomFooter = () => {
  return <StyledFooter> Ant Design ©{new Date().getFullYear()} Created by DLebrov</StyledFooter>;
};
