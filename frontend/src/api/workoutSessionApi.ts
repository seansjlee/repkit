import axios from 'axios';

export const getWorkoutSessions = async () => {
  const response = await axios.get('/api/workout-sessions');
  return response.data;
};

export const createWorkoutSession = async (sessionName: string) => {
  const response = await axios.post('/api/workout-sessions', {
    name: sessionName,
  });
  return response.data;
};

export const getWorkoutSession = async (sessionId: string) => {
  const response = await axios.get(`/api/workout-sessions/${sessionId}`);
  return response.data;
};

export const updateWorkoutSession = async (
  sessionId: string,
  sessionName: string,
) => {
  const response = await axios.put(`/api/workout-sessions/${sessionId}`, {
    id: sessionId,
    name: sessionName,
  });
  return response.data;
};
