import { Route, Routes } from 'react-router-dom';

import { Login } from '@/pages/Login';
import { MainPage } from '@/pages/MainPage';
import { Registration } from '@/pages/Registration';
import { EPaths } from '@/shared/lib';

export const PagesRouter = () => {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path={EPaths.Registration} element={<Registration />} />
      <Route path={EPaths.Login} element={<Login />} />
      <Route path={EPaths.Calendar} element={<>CALENDAR</>} />
      <Route path={EPaths.Clients} element={<>CLIENTS</>} />
      <Route path={EPaths.Records} element={<>RECORDS</>} />
    </Routes>
  );
};
