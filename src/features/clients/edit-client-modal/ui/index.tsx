import { Form, message, Modal } from 'antd';
import moment from 'moment';
import { useEffect, useMemo } from 'react';

import { clientsApi } from '@/entities/clients';

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
  const { data: subjects, isLoading: isLoadingSubjects } = clientsApi.useGetSubjectsQuery();
  const { data: clientData, isLoading: isLoadingClientData } = clientsApi.useGetClientQuery(
    clientId,
    {
      skip: !clientId,
    },
  );
  const [createClientSubject, { isLoading: isLoadingClientSubject }] =
    clientsApi.useCreateClientSubjectMutation();

  const isLoading = isLoadingClientData || isLoadingClientSubject;

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

  // const createClientSubjects = async ({
  //   clientId,
  //   subjectsForm,
  // }: {
  //   clientId: number;
  //   subjectsForm: Array<number>;
  // }) => {
  //   const requests = subjectsForm.map((subjectId) => createClientSubject({ clientId, subjectId }));
  //   await Promise.all(requests);
  // };

  const handleSubmitForm = async (formData: TClientForm) => {
    try {
      const birthDateISO = formData.birthDate ? formData.birthDate.toISOString() : undefined;
      const { subjects: subjectForm, ...otherData } = formData;

      const data = { ...otherData, birthDate: birthDateISO };

      // const result = await editClient(data);

      // if (!result.data) throw new Error('Не удалось создать клиента');

      // await createClientSubjects({
      //   clientId: result.data?.id,
      //   subjectsForm: subjectForm,
      // });

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
