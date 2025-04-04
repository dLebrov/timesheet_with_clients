import { Content } from 'antd/es/layout/layout';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledContent = styled(Content)`
  height: calc(100vh - 150px);
`;

type CustomContentProps = PropsWithChildren;

export const CustomContent: React.FC<CustomContentProps> = ({ children }) => {
  return <StyledContent>{children}</StyledContent>;
};
