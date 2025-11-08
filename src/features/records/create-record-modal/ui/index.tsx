import { Form, message, Modal } from 'antd';
import { useMemo } from 'react';

import { clientsApi, getClientName } from '@/entities/clients';
import { recordsApi } from '@/entities/records';
import { serviceApi } from '@/entities/services';

import { RecordForm, TRecordForm } from '../../record-form';

type TCreateRecordModal = {
  isModalVisible: boolean;
  onCloseCreateRecord: () => void;
};

export const CreateRecordModal = ({ isModalVisible, onCloseCreateRecord }: TCreateRecordModal) => {
  const [form] = Form.useForm<TRecordForm>();
  const { data: clients, isLoading: isLoadingClients } = clientsApi.useGetClientsQuery();
  const { data: services, isLoading: isLoadingServices } = serviceApi.useGetServicesQuery();
  const [createRecord, { isLoading: isLoadingCreateRecord }] = recordsApi.useCreateRecordMutation();
  const clientId = Form.useWatch('clientId', form);

  const isLoading = isLoadingClients || isLoadingServices || isLoadingCreateRecord;

  const serviceOptions = useMemo(() => {
    return (
      services?.map((service) => ({
        label: service.name,
        value: service.id,
      })) ?? []
    );
  }, [services]);

  const clientOptions = useMemo(() => {
    return (
      clients?.map((client) => ({
        label: getClientName(client),
        value: client.id,
      })) ?? []
    );
  }, [clients]);

  const subjectOptions = useMemo(() => {
    const foundClient = clients?.find((client) => client.id === clientId);

    if (!foundClient) return [];

    return foundClient.client_subjects.map(({ subjects }) => ({
      label: subjects.name,
      value: subjects.id,
    }));
  }, [clientId, clients]);

  const handleClose = () => {
    form.resetFields();
    onCloseCreateRecord();
  };

  const handleSubmitForm = async (formData: TRecordForm) => {
    try {
      const copyFormData: TRecordForm = { ...formData };
      // @ts-ignore
      delete copyFormData.timeRange;
      const dateISO = copyFormData.date.toISOString();
      const startTimeISO = copyFormData.start_time.toISOString();
      const endTimeISO = copyFormData.end_time.toISOString();
      const data = {
        ...copyFormData,
        date: dateISO,
        start_time: startTimeISO,
        end_time: endTimeISO,
        price: Number(copyFormData.price),
      };
      await createRecord(data).unwrap();
      handleClose();
      message.success('Запись успешно создана');
    } catch (err) {
      console.error('Error creating record:', err);
      message.error('Не удалось создать запись');
    }
  };

  return (
    <>
      <Modal
        open={isModalVisible}
        title="Создание Записи"
        onCancel={handleClose}
        footer={null}
        centered
      >
        <RecordForm
          form={form}
          onSubmitForm={handleSubmitForm}
          isLoading={isLoading}
          clientOptions={clientOptions}
          serviceOptions={serviceOptions}
          subjectOptions={subjectOptions}
          onClose={handleClose}
          clientId={clientId}
          actionLabel="Создать"
        />
      </Modal>
    </>
  );
};
