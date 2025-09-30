import { ConfigProvider, Layout, theme } from 'antd';
import { App as AntdApp } from 'antd';
import ruRU from 'antd/es/locale/ru_RU';
import classNames from 'classnames/bind';
import { HashRouter } from 'react-router-dom';

import { useCustomTheme } from '@/entities/theme';
import { ThemeType } from '@/entities/theme';
import { CustomHeader } from '@/widgets/custom-header';

import { AuthGuard } from '../auth-guard';
import styles from './index.module.scss';
import { PagesRouter } from './pages-router';

const BLOCK_NAME = 'App';
const cn = classNames.bind(styles);

export const App = () => {
  const { theme: localTheme } = useCustomTheme();

  return (
    <HashRouter>
      <AuthGuard>
        <ConfigProvider
          theme={{
            algorithm: localTheme === ThemeType.DARK ? theme.darkAlgorithm : theme.defaultAlgorithm,
          }}
          locale={ruRU}
        >
          <AntdApp rootClassName={cn(BLOCK_NAME)}>
            <Layout>
              <div className={cn(`${BLOCK_NAME}__header`)}>
                <CustomHeader />
              </div>
              <div className={cn(`${BLOCK_NAME}__content`)}>
                <PagesRouter />
              </div>
            </Layout>
          </AntdApp>
        </ConfigProvider>
      </AuthGuard>
    </HashRouter>
  );
};
