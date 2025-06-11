import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createExercise } from '../api/exerciseApi';

const ExerciseFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState<number | null>(null);
  const [reps, setReps] = useState<number | null>(null);
  const [restSeconds, setRestSeconds] = useState<number | null>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await createExercise(sessionId!, exerciseName, sets, reps, restSeconds);
      navigate(`/workout-sessions/${sessionId}`);
    } catch (error) {
      setError('Failed to create new exercise. Please try again');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {};

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
            <label htmlFor="sets" className="block mb-1 font-medium">
              Sets
            </label>
            <input
              id="sets"
              type="number"
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sets !== null ? sets : ''}
              onChange={(e) =>
                setSets(e.target.value === '' ? null : Number(e.target.value))
              }
            />
          </div>
          <div>
            <label htmlFor="reps" className="block mb-1 font-medium">
              Reps
            </label>
            <input
              id="reps"
              type="number"
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={reps !== null ? reps : ''}
              onChange={(e) =>
                setReps(e.target.value === '' ? null : Number(e.target.value))
              }
            />
          </div>
          <div>
            <label htmlFor="restSeconds" className="block mb-1 font-medium">
              Rest Time
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

          {error && <p className="text-sm text-red-500">{error}</p>}

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
