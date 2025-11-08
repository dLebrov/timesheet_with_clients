import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Select,
  SelectProps,
  TimePicker,
} from 'antd';
import classNames from 'classnames/bind';

import { ERecordStatus } from '@/entities/records';

import { statusOptions } from '../lib/constants';
import { TRecordForm } from '../lib/types';
import styles from './index.module.scss';

const BLOCK_NAME = 'RecordForm';
const cn = classNames.bind(styles);

type TRecordFormProps = {
  form: FormInstance<TRecordForm>;
  onSubmitForm: (values: TRecordForm) => void;
  isLoading: boolean;
  clientOptions: SelectProps['options'];
  serviceOptions: SelectProps['options'];
  subjectOptions: SelectProps['options'];
  onClose: () => void;
  actionLabel: string;
  clientId: number | undefined;
};

export const RecordForm = ({
  form,
  onSubmitForm,
  isLoading,
  clientOptions,
  serviceOptions,
  subjectOptions,
  onClose,
  actionLabel,
  clientId,
}: TRecordFormProps) => {
  return (
    <Form<TRecordForm>
      form={form}
      scrollToFirstError
      layout="vertical"
      onFinish={onSubmitForm}
      initialValues={{
        isPaid: false,
        description: '',
        status: ERecordStatus.Pending,
        subjectId: null,
      }}
    >
      <Form.Item
        name="serviceId"
        label="Услуга"
        rules={[{ required: true, message: 'Обязательное поле' }]}
      >
        <Select
          loading={isLoading}
          disabled={isLoading}
          options={serviceOptions}
          allowClear
          placeholder="Выберите услугу"
        />
      </Form.Item>
      <Form.Item
        name="clientId"
        label="Клиент"
        rules={[{ required: true, message: 'Обязательное поле' }]}
      >
        <Select
          loading={isLoading}
          disabled={isLoading}
          options={clientOptions}
          allowClear
          placeholder="Выберите клиента"
        />
      </Form.Item>
      <Form.Item name="subjectId" label="Предмет">
        <Select
          allowClear
          loading={isLoading}
          disabled={isLoading || !clientId}
          options={subjectOptions}
          onChange={(value) => form.setFieldValue('subjectId', value ?? null)}
          placeholder="Выберите предмет"
        />
      </Form.Item>
      <Form.Item name="description" label="Описание">
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} placeholder="Введите описание" />
      </Form.Item>
      <Form.Item name="start_time" hidden />
      <Form.Item name="end_time" hidden />
      <Form.Item
        name="timeRange"
        label="Время"
        rules={[{ required: true, message: 'Обязательное поле' }]}
        getValueFromEvent={(value) => {
          form.setFieldsValue({
            start_time: value?.[0] ?? null,
            end_time: value?.[1] ?? null,
          });
          return value;
        }}
      >
        <TimePicker.RangePicker format="HH:mm" />
      </Form.Item>
      <Form.Item
        name="date"
        label="Дата"
        rules={[{ required: true, message: 'Обязательное поле' }]}
      >
        <DatePicker format="DD.MM.YYYY" />
      </Form.Item>
      <Form.Item name="price" label="Цена">
        <Input
          prefix="₽"
          suffix="RUB"
          type="number"
          inputMode="numeric"
          placeholder="Введите цену"
        />
      </Form.Item>
      <Form.Item
        name="status"
        label="Статус"
        rules={[{ required: true, message: 'Обязательное поле' }]}
      >
        <Select
          loading={isLoading}
          disabled={isLoading}
          options={statusOptions}
          showSearch={false}
          placeholder="Выберите статус"
        />
      </Form.Item>
      <Form.Item name="isPaid" valuePropName="checked" label="Оплачено">
        <Checkbox />
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
