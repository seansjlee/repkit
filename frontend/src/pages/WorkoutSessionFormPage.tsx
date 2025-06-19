import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createWorkoutSession,
  deleteWorkoutSession,
  getWorkoutSession,
  updateWorkoutSession,
} from '../api/workoutSessionApi';
import { ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const WorkoutSessionFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const [sessionName, setSessionName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const {
    data: session,
    isLoading: isLoadingSession,
    error: queryError,
  } = useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => getWorkoutSession(sessionId!),
    enabled: !!sessionId,
  });

  useEffect(() => {
    if (session) {
      setSessionName(session.name);
      setIsUpdate(true);
    }
  }, [session]);

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

        await updateWorkoutSession(sessionId, sessionName);
        navigate(`/workout-sessions/${sessionId}`);
      } else {
        await createWorkoutSession(sessionName);
        navigate('/');
      }
    } catch (error) {
      setError(
        isUpdate
          ? 'Failed to update workout session. Please try again.'
          : 'Failed to create workout session. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!sessionId) return;
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this workout session?',
    );
    if (!confirmDelete) return;

    setSubmitting(true);

    try {
      await deleteWorkoutSession(sessionId);
      navigate('/');
    } catch (error) {
      setError('Failed to delete workout session.');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoadingSession) {
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
          <h1 className="ml-6 text-3xl font-bold">
            {isUpdate ? 'Update Workout Session' : 'Create Workout Session'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Session Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              required
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

export default WorkoutSessionFormPage;
