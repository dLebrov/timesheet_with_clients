import { Layout } from 'antd';
import { HashRouter } from 'react-router-dom';

import { CustomContent } from '@/widgets/CustomContent';
import { CustomFooter } from '@/widgets/CustomFooter';
import { CustomHeader } from '@/widgets/CustomHeader';

import { PagesRouter } from './PagesRouter';

export const App = () => {
  return (
    <HashRouter>
      <Layout>
        <CustomHeader />
        <CustomContent>
          <PagesRouter />
        </CustomContent>
        <CustomFooter />
      </Layout>
    </HashRouter>
  );
};
