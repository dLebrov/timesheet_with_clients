import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useLazyAuthUserQuery } from '@/entities/user';

import { TLoginForm } from '../lib/types';

const StyledLoginContainer = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledLoginWrapper = styled('div')`
  min-width: 360px;
`;

export const Login = () => {
  const navigate = useNavigate();
  const [fetchAuth, { isLoading }] = useLazyAuthUserQuery();

  const handleRegister = () => {
    navigate('/register');
  };
  const handleSubmitForm = async (values: TLoginForm) => {
    try {
      const { login, password } = values;

      const { data } = await fetchAuth({ login, password });

      if (!data) throw new Error('Не удалось получить пользователя');

      Cookies.set('token', data.access_token, {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <StyledLoginContainer>
      <StyledLoginWrapper>
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
      </StyledLoginWrapper>
    </StyledLoginContainer>
  );
};
