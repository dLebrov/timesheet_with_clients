import { MenuItemType } from 'antd/es/menu/interface';

export type TCustomMenuItem = { path: string } & MenuItemType;

export enum EThemesName {
  Light = 'Светлая тема',
  Dark = 'Темная тема',
}
