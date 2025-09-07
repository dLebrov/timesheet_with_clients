import { useCallback } from 'react';

import { clientsApi } from '../api/clientsApi';

export const useClientSubject = () => {
  const [createClientSubject, { isLoading }] = clientsApi.useCreateClientSubjectMutation();

  const createClientSubjectsRequest = useCallback(
    async ({ clientId, subjects }: { clientId: number; subjects: Array<number> }) => {
      const requests = subjects.map((subjectId) => createClientSubject({ clientId, subjectId }));
      await Promise.all(requests);
    },
    [createClientSubject],
  );

  return {
    createClientSubjectsRequest,
    isLoading,
  };
};
