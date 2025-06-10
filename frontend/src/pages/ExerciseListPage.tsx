import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil } from 'lucide-react';
import type { WorkoutSession } from '../types';
import { getWorkoutSession } from '../api/workoutSessionApi';

const ExerciseListPage: React.FC = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    const fetchData = async () => {
      try {
        const data = await getWorkoutSession(sessionId);
        setSession(data);
      } catch (error) {
        console.error('Failed to fetch session:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId]);

  if (loading) {
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
      </div>
    </main>
  );
};

export default ExerciseListPage;
