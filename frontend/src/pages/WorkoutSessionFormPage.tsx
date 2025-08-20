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
import Input from '../components/Input';

const WorkoutSessionFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const [sessionName, setSessionName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

    setDeleting(true);

    try {
      await deleteWorkoutSession(sessionId);
      navigate('/');
    } catch (error) {
      setError('Failed to delete workout session.');
    } finally {
      setDeleting(false);
    }
  };

  if (isLoadingSession) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 ">Loading...</div>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <div className="relative flex items-center justify-center mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute left-0 flex items-center justify-center w-12 border border-gray-300 rounded-md h-9 hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-800" />
          </button>
          <h1 className="text-3xl font-bold">
            {isUpdate ? 'Edit Session' : 'New Session'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Session Name
            </label>
            <Input
              id="name"
              type="text"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              required={true}
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
              disabled={submitting || deleting}
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
                disabled={submitting || deleting}
                className="w-full px-4 py-2 font-semibold text-red-600 border border-red-600 rounded shadow-md hover:bg-red-50 disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default WorkoutSessionFormPage;
