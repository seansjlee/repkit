import type { ExerciseSet } from './exerciseSet.types';

export interface Exercise {
  id: String;
  name: String;
  restSeconds: number;
  exerciseSets: ExerciseSet[];
}
