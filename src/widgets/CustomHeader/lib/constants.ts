import { ItemType } from 'antd/es/menu/interface';

import { TCustomMenuItem } from './types';

export const menuItems: ItemType<TCustomMenuItem>[] = [
  { key: '1', path: '/', label: 'Главная' },
  { key: '2', path: '/calendar', label: 'Календарь' },
  { key: '3', path: '/clients', label: 'Клиенты' },
  { key: '4', path: '/records', label: 'Записи' },
];
