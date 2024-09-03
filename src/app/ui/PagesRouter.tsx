import { Route, Routes } from 'react-router-dom';

import { MainPage } from '@/pages/MainPage';
import { PATH } from '@/shared/lib';

export const PagesRouter = () => {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path={PATH.CALENDAR.path} element={<>CALENDAR</>} />
      <Route path={PATH.CLIENTS.path} element={<>CLIENTS</>} />
      <Route path={PATH.RECORDS.path} element={<>RECORDS</>} />
    </Routes>
  );
};
