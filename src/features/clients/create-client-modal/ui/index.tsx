import { Form, message, Modal } from 'antd';
import { useMemo } from 'react';

import { clientsApi } from '@/entities/clients';

import { ClientForm, TClientForm } from '../../client-form';

type TCreateClientModal = {
  isModalVisible: boolean;
  onCloseCreateClient: () => void;
};

export const CreateClientModal = ({ isModalVisible, onCloseCreateClient }: TCreateClientModal) => {
  const [form] = Form.useForm<TClientForm>();
  const { data: subjects, isLoading: isLoadingSubjects } = clientsApi.useGetSubjectsQuery();
  const [createClient, { isLoading: isLoadingCreateClient }] = clientsApi.useCreateClientMutation();
  const [createClientSubject, { isLoading: isLoadingClientSubject }] =
    clientsApi.useCreateClientSubjectMutation();

  const isLoading = isLoadingCreateClient || isLoadingClientSubject;

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

  const createClientSubjects = async ({
    clientId,
    subjectsForm,
  }: {
    clientId: number;
    subjectsForm: Array<number>;
  }) => {
    const requests = subjectsForm.map((subjectId) => createClientSubject({ clientId, subjectId }));
    await Promise.all(requests);
  };

  const handleSubmitForm = async (formData: TClientForm) => {
    try {
      const birthDateISO = formData.birthDate ? formData.birthDate.toISOString() : undefined;
      const { subjects: subjectForm, ...otherData } = formData;

      const data = { ...otherData, birthDate: birthDateISO };

      const result = await createClient(data);

      if (!result.data) throw new Error('Не удалось создать клиента');

      await createClientSubjects({
        clientId: result.data?.id,
        subjectsForm: subjectForm,
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
