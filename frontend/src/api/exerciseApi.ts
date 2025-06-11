import axios from 'axios';
import type { Exercise } from '../types';

export const getExercises = async (sessionId: string): Promise<Exercise[]> => {
  const response = await axios.get(`/api/workout-sessions/${sessionId}`);

  return response.data.exercises;
};

export const createExercise = async (
  sessionId: string,
  exerciseName: string,
  sets: number | null,
  reps: number | null,
  restSeconds: number | null,
) => {
  const response = await axios.post(
    `/api/workout-sessions/${sessionId}/exercises`,
    { name: exerciseName, sets: sets, reps: reps, restSeconds: restSeconds },
  );

  return response.data;
};
