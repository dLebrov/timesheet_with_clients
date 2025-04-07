import { Role } from './types';

export const userRoleName: Record<Role, string> = {
  [Role.Teacher]: 'Преподаватель',
  [Role.Doctor]: 'Врач',
  [Role.Client]: 'Клиент',
};
