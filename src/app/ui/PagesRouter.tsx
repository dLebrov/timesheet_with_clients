import { Route, Routes } from 'react-router-dom';

import { Clients } from '@/pages/clients/ui';
import { Login } from '@/pages/login';
import { MainPage } from '@/pages/main-page';
import { Registration } from '@/pages/registration';
import { EPaths } from '@/shared/lib';

export const PagesRouter = () => {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path={EPaths.Registration} element={<Registration />} />
      <Route path={EPaths.Login} element={<Login />} />
      <Route path={EPaths.Calendar} element={<>CALENDAR</>} />
      <Route path={EPaths.Clients} element={<Clients />} />
      <Route path={EPaths.Records} element={<>RECORDS</>} />
    </Routes>
  );
};
