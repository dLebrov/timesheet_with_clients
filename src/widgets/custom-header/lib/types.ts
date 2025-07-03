import { MenuItemType } from 'antd/es/menu/interface';

export type TCustomMenuItem = MenuItemType & { path: string; key: string };
