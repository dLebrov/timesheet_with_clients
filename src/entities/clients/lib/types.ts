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
  // client_subjects: Omit<client_subjectsDto, 'clients' | 'subjects'>[];
  // records: Omit<recordsDto, 'clients' | 'services'>[];
  createdAt: Date;
};

export type TCreateClientParams = {
  surname: string | undefined;
  name: string;
  birthDate: string | undefined;
  group: string | undefined;
  description: string | undefined;
};
