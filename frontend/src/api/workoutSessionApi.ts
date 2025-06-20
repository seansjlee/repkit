import axios from './axiosInstance';

export const getWorkoutSessions = async () => {
  const response = await axios.get('/workout-sessions');
  return response.data;
};

export const createWorkoutSession = async (sessionName: string) => {
  const response = await axios.post('/workout-sessions', {
    name: sessionName,
  });
  return response.data;
};

export const getWorkoutSession = async (sessionId: string) => {
  const response = await axios.get(`/workout-sessions/${sessionId}`);
  return response.data;
};

export const updateWorkoutSession = async (
  sessionId: string,
  sessionName: string,
) => {
  const response = await axios.put(`/workout-sessions/${sessionId}`, {
    id: sessionId,
    name: sessionName,
  });
  return response.data;
};

export const deleteWorkoutSession = async (sessionId: string) => {
  const response = await axios.delete(`/workout-sessions/${sessionId}`);
  return response.data;
};
