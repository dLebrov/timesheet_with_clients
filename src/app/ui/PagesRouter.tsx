import { Route, Routes } from 'react-router-dom';

import { PATH } from '@/shared/lib';

export const PagesRouter = () => {
  return (
    <Routes>
      <Route index element={<></>}></Route>
      <Route path={PATH.MAIN.path} element={<></>}></Route>
    </Routes>
  );
};
