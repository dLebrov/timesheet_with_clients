import { Button, DatePicker, Form, FormInstance, Input, Select, SelectProps } from 'antd';
import classNames from 'classnames/bind';

import { TClientForm } from '../lib/types';
import styles from './index.module.scss';

const BLOCK_NAME = 'ClientForm';
const cn = classNames.bind(styles);

type TClientFormProps = {
  form: FormInstance<TClientForm>;
  onSubmitForm: (values: TClientForm) => void;
  isLoadingSubjects: boolean;
  isLoading: boolean;
  subjectsOptions: SelectProps['options'];
  onClose: () => void;
  actionLabel: string;
};

export const ClientForm = ({
  form,
  onSubmitForm,
  isLoadingSubjects,
  isLoading,
  subjectsOptions,
  onClose,
  actionLabel,
}: TClientFormProps) => {
  return (
    <Form<TClientForm> form={form} scrollToFirstError layout="vertical" onFinish={onSubmitForm}>
      <Form.Item name="surname" label="Фамилия">
        <Input placeholder="Введите фамилию" />
      </Form.Item>
      <Form.Item name="name" label="Имя" rules={[{ required: true, message: 'Обязательное поле' }]}>
        <Input placeholder="Введите имя" />
      </Form.Item>
      <Form.Item name="birthDate" label="Дата рождения">
        <DatePicker format="DD.MM.YYYY" />
      </Form.Item>
      <Form.Item name="group" label="Группа">
        <Input placeholder="Введите группу(ОГЭ, ЕГЭ и тд.)" />
      </Form.Item>
      <Form.Item
        name="subjects"
        label="Предметы"
        tooltip="Добавить новые предметы можно через меню пользователя"
      >
        <Select
          loading={isLoadingSubjects}
          disabled={isLoadingSubjects}
          options={subjectsOptions}
          showSearch={false}
          mode="multiple"
          allowClear
          placeholder="Выберите предметы"
        />
      </Form.Item>
      <Form.Item name="description" label="Описание">
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} placeholder="Введите описание" />
      </Form.Item>

      <div className={cn(`${BLOCK_NAME}__buttons`)}>
        <Form.Item noStyle>
          <Button type="default" onClick={onClose}>
            Отмена
          </Button>
        </Form.Item>
        <Form.Item noStyle>
          <Button type="primary" htmlType="submit" disabled={isLoading} loading={isLoading}>
            {actionLabel}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
