import { Button, Form, Input, message, Modal } from 'antd';
import classNames from 'classnames/bind';

import { serviceApi } from '@/entities/services/api/servicesApi';

import { TCreateServiceForm } from '../lib/types';
import styles from './index.module.scss';

const BLOCK_NAME = 'CreateSubjectModal';
const cn = classNames.bind(styles);

type TCreateServiceModalProps = {
  isModalVisible: boolean;
  onClose: () => void;
};

export const CreateServiceModal = ({ isModalVisible, onClose }: TCreateServiceModalProps) => {
  const [form] = Form.useForm<TCreateServiceForm>();
  const [createService, { isLoading }] = serviceApi.useCreateServiceMutation();

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const handleSubmitForm = async (formData: TCreateServiceForm) => {
    try {
      await createService(formData).unwrap();

      handleClose();
      message.success('Услуга успешно добавлена');
    } catch (err) {
      console.error('Error creating service:', err);
      message.error('Не удалось добавить услугу');
    }
  };

  return (
    <>
      <Modal
        open={isModalVisible}
        title="Создание Услуги"
        onCancel={handleClose}
        footer={null}
        centered
      >
        <Form<TCreateServiceForm>
          form={form}
          scrollToFirstError
          layout="vertical"
          onFinish={handleSubmitForm}
        >
          <Form.Item
            name="name"
            label="Название"
            rules={[{ required: true, message: 'Обязательное поле' }]}
          >
            <Input placeholder="Введите название" />
          </Form.Item>

          <div className={cn(`${BLOCK_NAME}__buttons`)}>
            <Form.Item noStyle>
              <Button type="default" onClick={handleClose}>
                Отмена
              </Button>
            </Form.Item>
            <Form.Item noStyle>
              <Button type="primary" htmlType="submit" disabled={isLoading} loading={isLoading}>
                Добавить
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};
