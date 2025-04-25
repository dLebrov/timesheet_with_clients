import { Content } from 'antd/es/layout/layout';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledContent = styled(Content)`
  height: calc(100vh - 64px);
  padding: 24px;
  box-sizing: border-box;
  width: 100%;
`;

type CustomContentProps = PropsWithChildren;

export const CustomContent: React.FC<CustomContentProps> = ({ children }) => {
  return <StyledContent>{children}</StyledContent>;
};
