import { Button, DatePicker, Form, Input, Select } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useLazyCreateUserQuery } from '@/entities/user/hooks/userHooks';

import { formItemLayout, tailFormItemLayout } from '../lib/constants';
import { TRegistrationForm } from '../lib/types';

const { Option } = Select;

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="7">+7</Option>
    </Select>
  </Form.Item>
);

const StyledRegistrationContainer = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledRegistrationWrapper = styled('div')`
  padding: 0 24px;
  min-width: 575px;

  @media screen and (max-width: 575px) {
    min-width: 374px;
  }
`;

export const Registration = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [createUser] = useLazyCreateUserQuery();

  const onConfirm = async (values: TRegistrationForm) => {
    try {
      const { email, gender, name, password, role, surname, username } = values;
      const birthDate = values.birthDate.toDate();
      const phone = `${values.prefix}${values.phone}`;

      const { data } = await createUser({
        email,
        gender,
        name,
        password,
        role,
        surname,
        username,
        birthDate,
        phone,
      });

      if (!data) throw new Error('Не удалось создать пользователя');

      Cookies.set('token', data.access_token, {
        expires: 7,
        sameSite: 'strict',
      });
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/');
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <StyledRegistrationContainer>
      <StyledRegistrationWrapper>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onConfirm}
          initialValues={{ prefix: '+7' }}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <Form.Item
            name="surname"
            label="Фамилия"
            rules={[
              { required: true, message: 'Пожалуйста, введите вашу фамилию', whitespace: true },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Имя"
            rules={[{ required: true, message: 'Пожалуйста, введите ваше имя', whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Логин"
            tooltip="Придумайте свой логин. Дальше с помощью него или email вы сможете входить в систему"
            rules={[{ required: true, message: 'Пожалуйста, введите ваш логин', whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'Введите корректный E-mail',
              },
              {
                required: true,
                message: 'Пожалуйста, введите ваш E-mail',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Номер телефона"
            rules={[
              { required: true, message: 'Пожалуйста, введите ваш номер телефона' },
              { pattern: /^\d+$/, message: 'Номер телефона должен содержать только цифры' },
              {
                len: 10,
                message: 'Номер телефона должен содержать 10 цифр',
              },
            ]}
          >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="birthDate"
            label="Дата рождения"
            rules={[{ required: true, message: 'Пожалуйста, выберите дату рождения' }]}
          >
            <DatePicker
              placeholder="Выберите дату рождения"
              style={{ width: '100%' }}
              locale={locale}
              format="DD.MM.YYYY"
            />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Пол"
            rules={[{ required: true, message: 'Пожалуйста, выберите ваш пол' }]}
          >
            <Select placeholder="Выберите ваш пол">
              <Option value="male">Мужской</Option>
              <Option value="female">Женский</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="role"
            label="Роль"
            rules={[{ required: true, message: 'Пожалуйста, выберите вашу роль в системе' }]}
          >
            <Select placeholder="Выберите ваш пол">
              <Option value="teacher">Преподаватель</Option>
              <Option value="doctor">Врач</Option>
              <Option value="client">Клиент</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="password"
            label="Пароль"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите ваш пароль',
              },
              {
                min: 8,
                message: 'Пароль должен содержать минимум 8 символов',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Подтвердите пароль"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Пожалуйста, подтвердите ваш пароль',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </StyledRegistrationWrapper>
    </StyledRegistrationContainer>
  );
};
