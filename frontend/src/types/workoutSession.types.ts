import type { Exercise } from '../types';

export interface WorkoutSession {
  id: String;
  name: String;
  exercises: Exercise[];
}
