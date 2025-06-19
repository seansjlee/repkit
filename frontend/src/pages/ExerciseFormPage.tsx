import { ArrowLeft, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createExercise,
  deleteExercise,
  getExercise,
  updateExercise,
} from '../api/exerciseApi';
import type { ExerciseSet } from '../types/exerciseSet.types';
import { useQuery } from '@tanstack/react-query';

const ExerciseFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { sessionId, exerciseId } = useParams();

  const [exerciseName, setExerciseName] = useState('');
  const [exerciseSets, setExerciseSets] = useState<ExerciseSet[]>([]);
  const [restSeconds, setRestSeconds] = useState<number | null>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    data: exercise,
    isLoading: isLoadingExercise,
    error: queryError,
  } = useQuery({
    queryKey: ['exercise', sessionId, exerciseId],
    queryFn: () => getExercise(sessionId!, exerciseId!),
    enabled: !!sessionId && !!exerciseId,
  });

  useEffect(() => {
    if (exercise) {
      setExerciseName(exercise.name);
      setExerciseSets(exercise.exerciseSets);
      setRestSeconds(exercise.restSeconds);
      setIsUpdate(true);
    }
  }, [exercise]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (isUpdate) {
        if (!sessionId) {
          setError('Session ID is missing. Cannot update workout session.');
          return;
        }
        if (!exerciseId) {
          setError('Exercise ID is missing. Cannot update exercise.');
          return;
        }

        await updateExercise(
          sessionId!,
          exerciseId!,
          exerciseName,
          restSeconds,
          exerciseSets,
        );
        navigate(`/workout-sessions/${sessionId}/exercises`);
      } else {
        await createExercise(
          sessionId!,
          exerciseName,
          restSeconds,
          exerciseSets,
        );
        navigate(`/workout-sessions/${sessionId}/exercises`);
      }
    } catch (error) {
      setError(
        isUpdate
          ? 'Failed to update exercise. Please try again.'
          : 'Failed to create exercise. Please try again',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const addSet = () => {
    setExerciseSets([...exerciseSets, { weight: null, reps: null }]);
  };

  const updateSet = (
    index: number,
    key: 'weight' | 'reps',
    value: number | null,
  ) => {
    setExerciseSets((prev) =>
      prev.map((set, i) => (i === index ? { ...set, [key]: value } : set)),
    );
  };

  const removeSet = (index: number) => {
    const updated = exerciseSets.filter((_, i) => i !== index);
    setExerciseSets(updated);
  };

  const handleDelete = async () => {
    if (!sessionId || !exerciseId) return;
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this exercise?',
    );
    if (!confirmDelete) return;

    setSubmitting(true);

    try {
      await deleteExercise(sessionId, exerciseId);
      navigate(`/workout-sessions/${sessionId}/exercises`);
    } catch (error) {
      setError('Failed to delete exercise.');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoadingExercise) {
    return <p className="mt-10 text-center text-gray-500">Loading...</p>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-12 border border-gray-300 rounded-md h-9 hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-800" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold ">
              {isUpdate ? 'Update Exercise' : 'Add New Exercise'}
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Exercise Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Sets</label>
            <button
              type="button"
              onClick={addSet}
              className="flex items-center px-3 py-1 mb-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Set
            </button>
            {exerciseSets.map((exerciseSet, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 mb-2 border rounded-md"
              >
                <span className="text-sm font-medium">Set {index + 1}</span>
                <input
                  type="number"
                  placeholder="Weight"
                  className="w-32 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={exerciseSet.weight ?? ''}
                  onChange={(e) =>
                    updateSet(
                      index,
                      'weight',
                      e.target.value === '' ? null : Number(e.target.value),
                    )
                  }
                />
                <input
                  type="number"
                  placeholder="Reps"
                  className="w-32 px-2 py-1 text-sm border rounded w-30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={exerciseSet.reps ?? ''}
                  onChange={(e) =>
                    updateSet(
                      index,
                      'reps',
                      e.target.value === '' ? null : Number(e.target.value),
                    )
                  }
                />
                <button
                  type="button"
                  onClick={() => removeSet(index)}
                  className="ml-auto text-sm text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="restSeconds" className="block mb-1 font-medium">
              Rest Between Sets (seconds)
            </label>
            <input
              id="restSeconds"
              type="number"
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={restSeconds !== null ? restSeconds : ''}
              onChange={(e) =>
                setRestSeconds(
                  e.target.value === '' ? null : Number(e.target.value),
                )
              }
            />
          </div>

          {(error || queryError) && (
            <p className="text-sm text-red-500">
              {error || queryError?.message}
            </p>
          )}

          <div className="space-y-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-4 py-2 font-semibold text-white transition bg-blue-600 rounded shadow-md hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting
                ? isUpdate
                  ? 'Updating...'
                  : 'Creating...'
                : isUpdate
                  ? 'Update'
                  : 'Create'}
            </button>
            {isUpdate && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={submitting}
                className="w-full px-4 py-2 font-semibold text-red-600 border border-red-600 rounded shadow-md hover:bg-red-50 disabled:opacity-50"
              >
                {submitting ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default ExerciseFormPage;
