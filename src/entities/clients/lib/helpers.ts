import { TClientResponse } from './types';

export const getClientName = (client: TClientResponse): string => {
  return client?.surname ? `${client.surname} ${client.name}` : client.name;
};
