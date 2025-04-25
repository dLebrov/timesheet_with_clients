import { ConfigProvider, Layout, theme } from 'antd';
import { HashRouter } from 'react-router-dom';
import styled from 'styled-components';

import { useCustomTheme } from '@/entities/theme';
import { ThemeType } from '@/entities/theme';
import { CustomContent } from '@/widgets/CustomContent';
import { CustomHeader } from '@/widgets/CustomHeader';

import { AuthGuard } from '../AuthGuard/ui/AuthGuard';
import { PagesRouter } from './PagesRouter';

const StyledLayout = styled(Layout)`
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

export const App = () => {
  const { theme: localTheme } = useCustomTheme();

  return (
    <HashRouter>
      <AuthGuard>
        <ConfigProvider
          theme={{
            algorithm: localTheme === ThemeType.DARK ? theme.darkAlgorithm : theme.defaultAlgorithm,
          }}
        >
          <StyledLayout>
            <CustomHeader />
            <CustomContent>
              <PagesRouter />
            </CustomContent>
          </StyledLayout>
        </ConfigProvider>
      </AuthGuard>
    </HashRouter>
  );
};
