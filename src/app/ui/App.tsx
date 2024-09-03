import { ConfigProvider, Layout, theme } from 'antd';
import { HashRouter } from 'react-router-dom';

import { useCustomTheme } from '@/entities/theme/hooks/useCustomTheme';
import { ThemeType } from '@/entities/theme/lib/types';
import { CustomContent } from '@/widgets/CustomContent';
import { CustomFooter } from '@/widgets/CustomFooter';
import { CustomHeader } from '@/widgets/CustomHeader';

import { PagesRouter } from './PagesRouter';

export const App = () => {
  const { theme: localTheme } = useCustomTheme();

  return (
    <HashRouter>
      <ConfigProvider
        theme={{
          // 1. Use dark algorithm
          algorithm: localTheme === ThemeType.DARK ? theme.darkAlgorithm : theme.defaultAlgorithm,

          // 2. Combine dark algorithm and compact algorithm
          // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        }}
      >
        <Layout>
          <CustomHeader />
          <CustomContent>
            <PagesRouter />
          </CustomContent>
          <CustomFooter />
        </Layout>
      </ConfigProvider>
    </HashRouter>
  );
};
