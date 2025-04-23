import { ConfigProvider, Layout, theme } from 'antd';
import { HashRouter } from 'react-router-dom';

import { useCustomTheme } from '@/entities/theme';
import { ThemeType } from '@/entities/theme';
import { CustomContent } from '@/widgets/CustomContent';
import { CustomHeader } from '@/widgets/CustomHeader';

import { AuthGuard } from '../AuthGuard/ui/AuthGuard';
import { PagesRouter } from './PagesRouter';

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
          <Layout>
            <CustomHeader />
            <CustomContent>
              <PagesRouter />
            </CustomContent>
          </Layout>
        </ConfigProvider>
      </AuthGuard>
    </HashRouter>
  );
};
