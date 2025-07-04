import axios from '../api/axiosInstance';

export const isLoggedIn = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return false;
    }

    await axios.get('/user/me');
    return true;
  } catch (error) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    return false;
  }
};
