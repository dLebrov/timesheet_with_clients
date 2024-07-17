import { Content } from 'antd/es/layout/layout';
import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledContent = styled(Content)`
  height: calc(100vh - 131px);
`;

interface CustomContentProps {
  children: ReactNode;
}

export const CustomContent: React.FC<CustomContentProps> = ({ children }) => {
  return <StyledContent>{children}</StyledContent>;
};
