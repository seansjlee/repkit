import axios from './axiosInstance';

export const signUp = async (username: string, password: string) => {
  const response = await axios.post('/user', { username, password });

  return response.data;
};

export const login = async (username: string, password: string) => {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  const response = await axios.post('/login', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    withCredentials: true,
  });

  return response.data;
};

export const logout = async () => {
  const response = await axios.post('/logout');

  return response.data;
};
