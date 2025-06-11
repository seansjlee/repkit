import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil } from 'lucide-react';
import { type Exercise, type WorkoutSession } from '../types';
import { getWorkoutSession } from '../api/workoutSessionApi';
import { getExercises } from '../api/exerciseApi';

const ExerciseListPage: React.FC = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loadingSession, setLoadingSession] = useState(true);
  const [loadingExercises, setLoadingExercises] = useState(true);

  // fetch session
  useEffect(() => {
    if (!sessionId) return;

    const fetchSession = async () => {
      try {
        const data = await getWorkoutSession(sessionId);
        setSession(data);
      } catch (error) {
        console.error('Failed to fetch session:', error);
      } finally {
        setLoadingSession(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  // fetch exercises
  useEffect(() => {
    if (!sessionId) return;

    const fetchExercises = async () => {
      try {
        const data = await getExercises(sessionId);
        console.log('getExercises returned:', data);
        setExercises(data);
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
      } finally {
        setLoadingExercises(false);
      }
    };

    fetchExercises();
  }, [sessionId]);

  if (loadingSession) {
    return (
      <p className="mt-10 text-center text-gray-500">Loading session...</p>
    );
  }

  if (!session) {
    return <p className="mt-10 text-center text-red-500">Session not found.</p>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-center mb-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center justify-center w-12 border border-gray-300 rounded-md h-9 hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-800" />
          </button>
          <h1 className="ml-6 text-3xl font-bold">{session.name}</h1>
          <button
            type="button"
            onClick={() => navigate(`/workout-sessions/${session.id}/edit`)}
            className="flex items-center justify-center w-12 ml-6 border border-gray-300 rounded-md h-9 hover:bg-gray-100"
          >
            <Pencil className="w-5 h-5 text-gray-800" />
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <Link
            to={`/workout-sessions/${sessionId}/new-exercise`}
            className="px-4 py-2 font-semibold text-white transition bg-blue-600 rounded shadow-md hover:bg-blue-700"
          >
            Add Exercise
          </Link>
        </div>

        {loadingExercises ? (
          <p className="text-center text-gray-500">Loading exercises...</p>
        ) : exercises.length === 0 ? (
          <p className="text-center text-gray-500">No exercises found.</p>
        ) : (
          <ul className="space-y-4">
            {exercises.map((exercise) => (
              <li
                key={exercise.id}
                className="p-4 transition bg-white rounded shadow cursor-pointer hover:shadow-lg"
              >
                <h2 className="text-xl font-semibold">{exercise.name}</h2>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default ExerciseListPage;
