export type WorkoutSession = {
  id: string;
  name: string;
  exercises: Exercise[];
};

export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  restSeconds: number;
};
