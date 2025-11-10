import { Spin } from 'antd';
import classNames from 'classnames/bind';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { EPaths } from '@/shared/lib';

import styles from './pages-router.module.scss';

const Clients = lazy(() =>
  import('@/pages/clients/ui').then((module) => ({
    default: module.Clients,
  })),
);
const Login = lazy(() =>
  import('@/pages/login').then((module) => ({
    default: module.Login,
  })),
);
const MainPage = lazy(() =>
  import('@/pages/main-page').then((module) => ({
    default: module.MainPage,
  })),
);
const Registration = lazy(() =>
  import('@/pages/registration').then((module) => ({
    default: module.Registration,
  })),
);

const Records = lazy(() =>
  import('@/pages/records').then((module) => ({
    default: module.Records,
  })),
);

const RecordsCalendar = lazy(() =>
  import('@/pages/records-calendar').then((module) => ({
    default: module.RecordsCalendar,
  })),
);

const BLOCK_NAME = 'PagesRouter';
const cn = classNames.bind(styles);

export const PagesRouter = () => {
  return (
    <Suspense
      fallback={
        <div className={cn(`${BLOCK_NAME}__fallback`)}>
          <Spin size="large" />
        </div>
      }
    >
      <Routes>
        <Route index element={<MainPage />} />
        <Route path={EPaths.Registration} element={<Registration />} />
        <Route path={EPaths.Login} element={<Login />} />
        <Route path={EPaths.Calendar} element={<RecordsCalendar />} />
        <Route path={EPaths.Clients} element={<Clients />} />
        <Route path={EPaths.Records} element={<Records />} />
      </Routes>
    </Suspense>
  );
};
