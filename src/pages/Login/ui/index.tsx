import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input, Typography } from 'antd';
import classNames from 'classnames/bind';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLazyAuthUserQuery } from '@/entities/user';
import { EPaths } from '@/shared/lib';

import { TLoginForm } from '../lib/types';
import styles from './index.module.scss';

const BLOCK_NAME = 'Login';
const cn = classNames.bind(styles);

export const Login = () => {
  const navigate = useNavigate();
  const [fetchAuth, { isLoading }] = useLazyAuthUserQuery();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = () => {
    navigate(`/${EPaths.Registration}`);
  };

  const handleSubmitForm = async (values: TLoginForm) => {
    try {
      const { login, password } = values;

      const { data } = await fetchAuth({ login, password });

      if (!data) throw new Error('Не удалось получить пользователя');

      setErrorMessage(null);

      Cookies.set('token', data.access_token, {
        expires: 1,
        sameSite: 'strict',
      });
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/');
    } catch (error) {
      console.error({ error });
      setErrorMessage('Неверный логин или пароль');
    }
  };

  return (
    <div className={cn(BLOCK_NAME)}>
      {errorMessage && (
        <Typography.Text type="danger" style={{ marginBottom: 12 }}>
          {errorMessage}
        </Typography.Text>
      )}
      <div className={cn(`${BLOCK_NAME}__form`)}>
        <Form
          name="loginForm"
          initialValues={{ canRemember: true }}
          style={{ maxWidth: 360 }}
          onFinish={handleSubmitForm}
        >
          <Form.Item
            name="login"
            rules={[{ required: true, message: 'Пожалуйста, введите имя или почту пользователя' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Имя или почта пользователя" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Пароль" />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="canRemember" valuePropName="checked" noStyle>
                <Checkbox>Запомнить меня</Checkbox>
              </Form.Item>
              <a>Забыли пароль?</a>
            </Flex>
          </Form.Item>
          <Form.Item>
            <Button loading={isLoading} disabled={isLoading} block type="primary" htmlType="submit">
              Войти
            </Button>
            или <a onClick={handleRegister}>Зарегистрироваться сейчас</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
