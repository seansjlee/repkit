import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWorkoutSession } from '../api/workoutSessionApi';

const WorkoutSessionFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [sessionName, setSessionName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await createWorkoutSession(sessionName);
      navigate('/workout-sessions');
    } catch (error) {
      setError('Failed to create workout session. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-3xl font-bold text-center">
          Create Workout Session
        </h1>

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

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-4 py-2 font-semibold text-white transition bg-blue-600 rounded shadow-md hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default WorkoutSessionFormPage;
