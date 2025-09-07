import { Button, DatePicker, Form, Input, message, Select } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import classNames from 'classnames/bind';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import { userApi } from '@/entities/user';
import { EPaths } from '@/shared/lib';

import { FORM_ITEM_LAYOUT, FORM_ITEM_TAIL_LAYOUT } from '../lib/constants';
import { TRegistrationForm } from '../lib/types';
import styles from './index.module.scss';

const { Option } = Select;

const BLOCK_NAME = 'Registration';
const cn = classNames.bind(styles);

export const Registration = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [createUser] = userApi.useLazyCreateUserQuery();

  const onConfirm = async (values: TRegistrationForm) => {
    try {
      const { email, gender, name, password, role, surname, username } = values;
      const birthDate = values.birthDate.toDate();
      const phone = `${values.prefix}${values.phone}`;

      const { access_token, user } = await createUser({
        email,
        gender,
        name,
        password,
        role,
        surname,
        username,
        birthDate,
        phone,
      }).unwrap();

      Cookies.set('token', access_token, {
        expires: 7,
        sameSite: 'strict',
      });
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/');
    } catch (error) {
      console.error({ error });
      message.error('Не удалось создать пользователя');
    }
  };

  const handleLogin = () => {
    navigate(`/${EPaths.Login}`);
  };

  return (
    <div className={cn(BLOCK_NAME)}>
      <div className={cn(`${BLOCK_NAME}__content`)}>
        <Form
          {...FORM_ITEM_LAYOUT}
          className={cn(`${BLOCK_NAME}__form`)}
          form={form}
          name="register"
          onFinish={onConfirm}
          initialValues={{ prefix: '+7' }}
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
            <Input
              className={cn(`${BLOCK_NAME}__number-input`)}
              addonBefore={
                <Form.Item name="prefix" noStyle>
                  <Select className={cn(`${BLOCK_NAME}__number-prefix`)}>
                    <Option value="7">+7</Option>
                  </Select>
                </Form.Item>
              }
            />
          </Form.Item>
          <Form.Item
            name="birthDate"
            label="Дата рождения"
            rules={[{ required: true, message: 'Пожалуйста, выберите дату рождения' }]}
          >
            <DatePicker
              className={cn(`${BLOCK_NAME}__date-picker`)}
              placeholder="Выберите дату рождения"
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
          <Form.Item {...FORM_ITEM_TAIL_LAYOUT}>
            <Button className={cn(`${BLOCK_NAME}__submit-button`)} type="primary" htmlType="submit">
              Зарегистрироваться
            </Button>
            или <a onClick={handleLogin}>Войти сейчас</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
