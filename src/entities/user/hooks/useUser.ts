import { useAppSelector } from '@/app/store/hooks';

export const useUser = () => {
  const { user } = useAppSelector((state) => state.user);

  return { user };
};
