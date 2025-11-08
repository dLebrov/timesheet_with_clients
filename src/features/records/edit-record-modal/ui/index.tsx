import { Form, message, Modal } from 'antd';
import moment from 'moment';
import { useEffect, useMemo } from 'react';

import { clientsApi, getClientName } from '@/entities/clients';
import { recordsApi } from '@/entities/records';
import { serviceApi } from '@/entities/services';

import { RecordForm, TRecordForm } from '../../record-form';

type TEditRecordModal = {
  isModalVisible: boolean;
  onCloseEditRecord: () => void;
  recordId: number | null;
};

export const EditRecordModal = ({
  isModalVisible,
  onCloseEditRecord,
  recordId,
}: TEditRecordModal) => {
  const [form] = Form.useForm<TRecordForm>();
  const { data: clients, isLoading: isLoadingClients } = clientsApi.useGetClientsQuery();
  const { data: services, isLoading: isLoadingServices } = serviceApi.useGetServicesQuery();
  const { data: recordData, isLoading: isLoadingRecordData } = recordsApi.useGetRecordQuery(
    recordId,
    {
      skip: !recordId,
    },
  );
  const [updateRecord, { isLoading: isLoadingUpdateRecord }] = recordsApi.useUpdateRecordMutation();
  const clientId = Form.useWatch('clientId', form);

  const isLoading =
    isLoadingUpdateRecord || isLoadingClients || isLoadingServices || isLoadingRecordData;

  useEffect(() => {
    if (recordData && isModalVisible) {
      const formData = {
        serviceId: recordData.serviceId,
        clientId: recordData.clientId,
        subjectId: recordData.subjectId,
        description: recordData.description,
        start_time: moment(recordData.start_time),
        end_time: moment(recordData.end_time),
        date: moment(recordData.date),
        price: recordData.price,
        status: recordData.status,
        isPaid: recordData.isPaid,
        timeRange: [moment(recordData.start_time), moment(recordData.end_time)],
      };

      form.setFieldsValue(formData);
    }
  }, [recordData, isModalVisible, form]);

  const clientOptions = useMemo(() => {
    return (
      clients?.map((client) => ({
        label: getClientName(client),
        value: client.id,
      })) ?? []
    );
  }, [clients]);

  const serviceOptions = useMemo(() => {
    return (
      services?.map((service) => ({
        label: service.name,
        value: service.id,
      })) ?? []
    );
  }, [services]);

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
    onCloseEditRecord();
  };

  const handleSubmitForm = async (formData: TRecordForm) => {
    if (!recordId) return;

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

      await updateRecord({
        query: {
          id: recordId,
        },
        body: data,
      }).unwrap();

      handleClose();
      message.success('Запись успешно изменен');
    } catch (err) {
      console.error('Error editing record:', err);
      message.error('Не удалось изменить запись');
    }
  };

  return (
    <>
      <Modal
        open={isModalVisible}
        title="Редактирование записи"
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
          clientId={clientId}
          onClose={handleClose}
          actionLabel="Сохранить"
        />
      </Modal>
    </>
  );
};
