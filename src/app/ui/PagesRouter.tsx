import { Route, Routes } from 'react-router-dom';

import { MainPage } from '@/pages/MainPage';
import { EPaths } from '@/shared/lib';
import { Login } from '@/widgets/Login';

export const PagesRouter = () => {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path={EPaths.Login} element={<Login />} />
      <Route path={EPaths.Calendar} element={<>CALENDAR</>} />
      <Route path={EPaths.Clients} element={<>CLIENTS</>} />
      <Route path={EPaths.Records} element={<>RECORDS</>} />
    </Routes>
  );
};
