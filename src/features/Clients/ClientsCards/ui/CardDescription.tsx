import { Typography } from 'antd';
import styled from 'styled-components';

const StyledContainer = styled('div')`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  box-sizing: border-box;
`;

type TCardDescriptionProps = {
  title: string;
  value: string;
};

export const CardDescription = ({ title, value }: TCardDescriptionProps) => {
  return (
    <StyledContainer>
      <Typography.Title level={5} style={{ whiteSpace: 'nowrap' }}>
        {title}
      </Typography.Title>
      <Typography.Text style={{ paddingTop: 2 }}>{value}</Typography.Text>
    </StyledContainer>
  );
};
