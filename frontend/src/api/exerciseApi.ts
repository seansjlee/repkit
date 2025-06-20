import axios from './axiosInstance';
import type { Exercise } from '../types/exercise.types';
import type { ExerciseSet } from '../types/exerciseSet.types';

export const getExercises = async (sessionId: string): Promise<Exercise[]> => {
  const response = await axios.get(`/workout-sessions/${sessionId}/exercises`);

  return response.data;
};

export const createExercise = async (
  sessionId: string,
  exerciseName: string,
  restSeconds: number | null,
  exerciseSets: ExerciseSet[],
) => {
  const response = await axios.post(
    `/workout-sessions/${sessionId}/exercises`,
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
    `/workout-sessions/${sessionId}/exercises/${exerciseId}`,
  );

  return response.data;
};

export const updateExercise = async (
  sessionId: string,
  exerciseId: string,
  exerciseName: string,
  restSeconds: number | null,
  exerciseSets: ExerciseSet[],
) => {
  const response = await axios.put(
    `/workout-sessions/${sessionId}/exercises/${exerciseId}`,
    {
      name: exerciseName,
      restSeconds: restSeconds,
      exerciseSets: exerciseSets,
    },
  );

  return response.data;
};

export const deleteExercise = async (sessionId: string, exerciseId: string) => {
  const response = await axios.delete(
    `/workout-sessions/${sessionId}/exercises/${exerciseId}`,
  );

  return response.data;
};
