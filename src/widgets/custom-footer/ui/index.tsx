import { Footer } from 'antd/es/layout/layout';
import classNames from 'classnames/bind';

import styles from './index.module.scss';

const BLOCK_NAME = 'CustomFooter';
const cn = classNames.bind(styles);

export const CustomFooter = () => {
  return (
    <Footer className={cn(BLOCK_NAME)}>
      <div>Ant Design ©{new Date().getFullYear()} Created by dLebrov</div>
      <div>Версия {import.meta.env.VITE_APP_VERSION}</div>
    </Footer>
  );
};
