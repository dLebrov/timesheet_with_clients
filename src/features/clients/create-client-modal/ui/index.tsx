import { Form, message, Modal } from 'antd';
import { useMemo } from 'react';

import { clientsApi, useClientSubject } from '@/entities/clients';

import { ClientForm, TClientForm } from '../../client-form';

type TCreateClientModal = {
  isModalVisible: boolean;
  onCloseCreateClient: () => void;
};

export const CreateClientModal = ({ isModalVisible, onCloseCreateClient }: TCreateClientModal) => {
  const [form] = Form.useForm<TClientForm>();
  const { createClientSubjectsRequest, isLoading: isLoadingClientSubject } = useClientSubject();
  const { data: subjects, isLoading: isLoadingSubjects } = clientsApi.useGetSubjectsQuery();
  const [createClient, { isLoading: isLoadingCreateClient }] = clientsApi.useCreateClientMutation();

  const isLoading = isLoadingCreateClient || isLoadingClientSubject || isLoadingSubjects;

  const options = useMemo(() => {
    return (
      subjects?.map((subject) => ({
        label: subject.name,
        value: subject.id,
      })) ?? []
    );
  }, [subjects]);

  const handleClose = () => {
    form.resetFields();
    onCloseCreateClient();
  };

  const handleSubmitForm = async (formData: TClientForm) => {
    try {
      const birthDateISO = formData.birthDate ? formData.birthDate.toISOString() : undefined;
      const { subjects: subjectForm, ...otherData } = formData;

      const data = { ...otherData, birthDate: birthDateISO };

      const result = await createClient(data);

      if (!result.data) throw new Error('Не удалось создать клиента');

      await createClientSubjectsRequest({
        clientId: result.data?.id,
        subjects: subjectForm,
      });

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
        <ClientForm
          form={form}
          onSubmitForm={handleSubmitForm}
          isLoadingSubjects={isLoadingSubjects}
          isLoading={isLoading}
          subjectsOptions={options}
          onClose={handleClose}
          actionLabel="Создать"
        />
      </Modal>
    </>
  );
};
