import axios from './axiosInstance';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userInfo: {
    id: number;
    username: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const signUp = async (username: string, password: string) => {
  const response = await axios.post<ApiResponse<void>>('/user', {
    username,
    password,
  });

  return response.data;
};

export const login = async (username: string, password: string) => {
  const response = await axios.post<ApiResponse<LoginResponse>>('/auth/login', {
    username,
    password,
  });

  if (response.data.success) {
    const { accessToken, refreshToken, userInfo } = response.data.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  return response.data;
};

export const logout = async () => {
  try {
    await axios.post<ApiResponse<void>>('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
  }
};

export const getCurrentUser = async () => {
  const response =
    await axios.get<ApiResponse<{ id: Number; username: string }>>('/user/me');

  return response.data;
};
