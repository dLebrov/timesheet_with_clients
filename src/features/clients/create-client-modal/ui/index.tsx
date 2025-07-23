import { Button, DatePicker, Form, Input, message, Modal } from 'antd';
import classNames from 'classnames/bind';

import { clientsApi } from '@/entities/clients';

import { TCreateClientForm } from '../lib/types';
import styles from './index.module.scss';

const BLOCK_NAME = 'CreateClientModal';
const cn = classNames.bind(styles);

type TCreateClientModal = {
  isModalVisible: boolean;
  onCloseCreateClient: () => void;
};

export const CreateClientModal = ({ isModalVisible, onCloseCreateClient }: TCreateClientModal) => {
  const [form] = Form.useForm<TCreateClientForm>();
  const [createClient, { isLoading }] = clientsApi.useCreateClientMutation();

  const handleClose = () => {
    form.resetFields();
    onCloseCreateClient();
  };

  const handleSubmitForm = async (formData: TCreateClientForm) => {
    try {
      const birthDateISO = formData.birthDate ? formData.birthDate.toISOString() : undefined;

      const data = { ...formData, birthDate: birthDateISO };

      await createClient(data);

      handleClose();
      message.success('Клиент успешно создан');
    } catch (err) {
      console.error('Error creating client:', err);
      message.error('Не удалось создать клиента');
    }
  };

  return (
    <>
      <Modal
        open={isModalVisible}
        title="Создание клиента"
        onCancel={handleClose}
        footer={null}
        centered
      >
        <Form<TCreateClientForm>
          form={form}
          scrollToFirstError
          layout="vertical"
          onFinish={handleSubmitForm}
        >
          <Form.Item name="surname" label="Фамилия">
            <Input placeholder="Введите фамилию" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Имя"
            rules={[{ required: true, message: 'Обязательное поле' }]}
          >
            <Input placeholder="Введите имя" />
          </Form.Item>
          <Form.Item name="birthDate" label="Дата рождения">
            <DatePicker format="DD.MM.YYYY" />
          </Form.Item>
          <Form.Item name="group" label="Группа">
            <Input placeholder="Введите группу" />
          </Form.Item>
          <Form.Item name="description" label="Описание">
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} placeholder="Введите описание" />
          </Form.Item>

          <div className={cn(`${BLOCK_NAME}__buttons`)}>
            <Form.Item noStyle>
              <Button type="default" onClick={handleClose}>
                Отмена
              </Button>
            </Form.Item>
            <Form.Item noStyle>
              <Button type="primary" htmlType="submit" disabled={isLoading} loading={isLoading}>
                Создать
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};
