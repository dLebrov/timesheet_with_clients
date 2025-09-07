import { Form, message, Modal } from 'antd';
import moment from 'moment';
import { useEffect, useMemo } from 'react';

import { clientsApi, useClientSubject } from '@/entities/clients';

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
  const { data: subjects, isLoading: isLoadingSubjects } = clientsApi.useGetSubjectsQuery();
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
        birthDate: clientData.birthDate ? moment(clientData.birthDate) : undefined,
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
      });

      if (!result.data) throw new Error('Не удалось изменить клиента');

      const oldClientSubjectsIds = clientData?.client_subjects?.map(({ id }) => id) || [];
      if (oldClientSubjectsIds.length) {
        await deleteManyClientSubject({ ids: oldClientSubjectsIds });
      }

      await createClientSubjectsRequest({
        clientId: result.data?.id,
        subjects: subjectForm,
      });

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
