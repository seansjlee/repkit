import axios from 'axios';
import type { Exercise } from '../types';
import type { ExerciseSet } from '../types/exerciseSet.types';

export const getExercises = async (sessionId: string): Promise<Exercise[]> => {
  const response = await axios.get(`/api/workout-sessions/${sessionId}`);

  return response.data.exercises;
};

export const createExercise = async (
  sessionId: string,
  exerciseName: string,
  restSeconds: number | null,
  exerciseSets: ExerciseSet[],
) => {
  const response = await axios.post(
    `/api/workout-sessions/${sessionId}/exercises`,
    {
      name: exerciseName,
      restSeconds: restSeconds,
      exerciseSets: exerciseSets,
    },
  );

  return response.data;
};

export const getExercise = async (sessionId: string, exerciseId: string) => {
  const response = await axios.get(
    `/api/workout-sessions/${sessionId}/exercises/${exerciseId}`,
  );

  return response.data;
};
