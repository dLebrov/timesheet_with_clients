import { Button } from 'antd';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import { CustomFooter } from '@/widgets/custom-footer';

import styles from './index.module.scss';

const BLOCK_NAME = 'MainPage';
const cn = classNames.bind(styles);

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className={cn(BLOCK_NAME)}>
      <div className={cn(`${BLOCK_NAME}__actions`)}>
        <div className={cn(`${BLOCK_NAME}__question`)}>Что нам нужно сегодня?</div>
        <div className={cn(`${BLOCK_NAME}__buttons`)}>
          <Button type="primary" onClick={() => navigate('/calendar')}>
            Календарь
          </Button>
          <Button type="primary" onClick={() => navigate('/clients')}>
            Клиенты
          </Button>
          <Button type="primary" onClick={() => navigate('/records')}>
            Записи
          </Button>
        </div>
      </div>
      <CustomFooter />
    </div>
  );
};
