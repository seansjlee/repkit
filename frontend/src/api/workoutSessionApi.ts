import axios from 'axios';
import type { WorkoutSession } from '../types';
import type { Exercise } from '../types';

export const getWorkoutSessions = async () => {
  const response = await axios.get('/api/workout-sessions');
  return response.data;
};
