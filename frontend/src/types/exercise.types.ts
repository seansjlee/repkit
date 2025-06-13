import type { ExerciseSet } from './exerciseSet.types';

export interface Exercise {
  id: string;
  name: string;
  restSeconds: number;
  exerciseSets: ExerciseSet[];
}
