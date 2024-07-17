import axios from 'axios';

export const api = axios.create({
  withCredentials: true,
  // ${process.env.PUBLIC_URL}
  baseURL: `/`,
});

export const setAuthHeader = (access_token: string) => {
  api.defaults.headers.Authorization = `Bearer ${access_token}`;
};
