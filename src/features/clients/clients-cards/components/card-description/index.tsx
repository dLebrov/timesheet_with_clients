import { Typography } from 'antd';
import classNames from 'classnames/bind';

import styles from './index.module.scss';

const BLOCK_NAME = 'CardDescription';
const cn = classNames.bind(styles);

type TCardDescriptionProps = {
  title: string;
  value: string;
};

export const CardDescription = ({ title, value }: TCardDescriptionProps) => {
  return (
    <div className={cn(BLOCK_NAME)}>
      <Typography.Title level={5} style={{ whiteSpace: 'nowrap' }}>
        {title}
      </Typography.Title>
      <Typography.Text style={{ paddingTop: 2 }}>{value}</Typography.Text>
    </div>
  );
};
