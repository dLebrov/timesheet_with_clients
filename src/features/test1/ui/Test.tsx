import { useAppDispatch, useAppSelector } from '@/app/store/hooks';

import { userActions } from '../model/testSlice';

export const Test = () => {
  const { user } = useAppSelector((state) => state.test1.testR);
  const dispatch = useAppDispatch();
  return (
    <>
      <button
        onClick={() => {
          dispatch(userActions.getAuth(!user));
        }}
      >
        клик
      </button>
      <div>{user ? 'работает' : 'не работает'}</div>
    </>
  );
};
