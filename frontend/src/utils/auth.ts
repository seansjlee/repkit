import axios from '../api/axiosInstance';

export const isLoggedIn = async () => {
  try {
    await axios.get('/user/me');
    return true;
  } catch {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};
