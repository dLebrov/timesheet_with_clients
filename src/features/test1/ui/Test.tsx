import { useAppDispatch, useAppSelector } from '@/app/store/hooks';

import { TEST_TEST_IDS } from '../lib/constants';
import { userActions } from '../model/testSlice';

export const Test = () => {
  // const { user } = useAppSelector((state) => state.test1.testR);
  // const dispatch = useAppDispatch();
  const handleClick = () => {
    // dispatch(userActions.getAuth(!user));
  };

  return (
    <>
      <button data-testid={TEST_TEST_IDS.button} onClick={handleClick}>
        клик
      </button>
      {/* <div data-testid="">{user ? 'работает' : 'не работает'}</div> */}
    </>
  );
};
