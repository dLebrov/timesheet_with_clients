import { Button, Form, Input, message, Modal } from 'antd';
import classNames from 'classnames/bind';

import { subjectApi } from '@/entities/subjects';

import { TCreateSubjectForm } from '../lib/types';
import styles from './index.module.scss';

const BLOCK_NAME = 'CreateSubjectModal';
const cn = classNames.bind(styles);

type TCreateSubjectModalProps = {
  isModalVisible: boolean;
  onClose: () => void;
};

export const CreateSubjectModal = ({ isModalVisible, onClose }: TCreateSubjectModalProps) => {
  const [form] = Form.useForm<TCreateSubjectForm>();
  const [createSubject, { isLoading }] = subjectApi.useCreateSubjectMutation();

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const handleSubmitForm = async (formData: TCreateSubjectForm) => {
    try {
      await createSubject(formData).unwrap();

      handleClose();
      message.success('Предмет успешно добавлен');
    } catch (err) {
      console.error('Error creating subject:', err);
      message.error('Не удалось добавить предмет');
    }
  };

  return (
    <>
      <Modal
        open={isModalVisible}
        title="Создание Предмета"
        onCancel={handleClose}
        footer={null}
        centered
      >
        <Form<TCreateSubjectForm>
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
