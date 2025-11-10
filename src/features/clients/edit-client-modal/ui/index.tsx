import { Form, message, Modal } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';

import { clientsApi, useClientSubject } from '@/entities/clients';
import { subjectApi } from '@/entities/subjects';

import { ClientForm, TClientForm } from '../../client-form';

type TEditClientModal = {
  isModalVisible: boolean;
  onCloseEditClient: () => void;
  clientId: number | null;
};

export const EditClientModal = ({
  isModalVisible,
  onCloseEditClient,
  clientId,
}: TEditClientModal) => {
  const [form] = Form.useForm<TClientForm>();

  const { createClientSubjectsRequest, isLoading: isLoadingClientSubject } = useClientSubject();
  const { data: subjects, isLoading: isLoadingSubjects } = subjectApi.useGetSubjectsQuery();
  const { data: clientData, isLoading: isLoadingClientData } = clientsApi.useGetClientQuery(
    clientId,
    {
      skip: !clientId,
    },
  );
  const [updateClient, { isLoading: isLoadingUpdateClient }] = clientsApi.useUpdateClientMutation();
  const [deleteManyClientSubject] = clientsApi.useDeleteManyClientSubjectMutation();

  const isLoading =
    isLoadingUpdateClient || isLoadingClientSubject || isLoadingSubjects || isLoadingClientData;

  useEffect(() => {
    if (clientData && isModalVisible) {
      const formData = {
        name: clientData.name,
        surname: clientData.surname ?? undefined,
        group: clientData.group ?? undefined,
        description: clientData.description ?? undefined,
        birthDate: clientData.birthDate ? dayjs(clientData.birthDate) : undefined,
        subjects: clientData.client_subjects?.map(({ subjectId }) => subjectId) || [],
      };

      form.setFieldsValue(formData);
    }
  }, [clientData, isModalVisible, form]);

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
    onCloseEditClient();
  };

  const handleSubmitForm = async (formData: TClientForm) => {
    if (!clientId) return;

    try {
      const birthDateISO = formData.birthDate ? formData.birthDate.toISOString() : undefined;
      const { subjects: subjectForm, ...otherData } = formData;

      const data = { ...otherData, birthDate: birthDateISO };

      const result = await updateClient({
        query: {
          id: clientId,
        },
        body: data,
      }).unwrap();

      const oldClientSubjectsIds = clientData?.client_subjects?.map(({ id }) => id) || [];
      if (oldClientSubjectsIds.length > 0) {
        await deleteManyClientSubject({ ids: oldClientSubjectsIds }).unwrap();
      }

      if (subjectForm.length > 0) {
        await createClientSubjectsRequest({
          clientId: result?.id,
          subjects: subjectForm,
        });
      }

      handleClose();
      message.success('Клиент успешно изменен');
    } catch (err) {
      console.error('Error editing client:', err);
      message.error('Не удалось изменить клиента');
    }
  };

  return (
    <>
      <Modal
        open={isModalVisible}
        title="Редактирование клиента"
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
          actionLabel="Сохранить"
        />
      </Modal>
    </>
  );
};
