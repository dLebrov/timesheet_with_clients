import { TSubjectResponse } from '@/entities/subjects';

export type TClientSubjects = {
  id: number;
  clientId: number;
  subjectId: number;
  subjects: TSubjectResponse;
  createdAt: Date;
};

export type TClientResponse = {
  id: number;
  userId: number;
  // users: Omit<usersDto, 'clients' | 'services' | 'password'>;
  surname: string | null;
  name: string;
  birthDate: Date | null;
  // только для преподавателя
  group?: string | null;
  description: string | null;
  // только для преподавателя
  client_subjects: Array<TClientSubjects>;
  // records: Omit<recordsDto, 'clients' | 'services'>[];
  createdAt: Date;
};

export type TCreateClientBody = {
  surname: string | undefined;
  name: string;
  birthDate: string | undefined;
  group: string | undefined;
  description: string | undefined;
};

export type TUpdateClientParams = {
  query: {
    id: number;
  };
  body: TCreateClientBody;
};

export type TCreateClientSubjectParams = {
  clientId: number;
  subjectId: number;
};
