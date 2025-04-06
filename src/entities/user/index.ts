export { authApi } from './api/authApi';
export { userApi } from './api/userApi';
export { useLazyAuthUserQuery } from './hooks/authHooks';
export { useUser } from './hooks/useUser';
export type { Gender, Role, TAuthParams, TAuthResponse, TUser } from './lib/types';
export { clearUser, setUser, userSlice } from './model/userSlice';
