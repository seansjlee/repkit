import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { WorkoutSession } from '../types';
import { getWorkoutSessions } from '../api/workoutSessionApi';

const WorkoutSessionListPage: React.FC = () => {
  const navigate = useNavigate();

  const { data: sessions, isLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: getWorkoutSessions,
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-xl">
        <h1 className="mb-6 text-3xl font-bold text-center">
          Workout Sessions
        </h1>

        <div className="flex justify-center mb-6">
          <Link
            to="/workout-sessions/new"
            className="px-4 py-2 font-semibold text-white transition bg-blue-600 rounded shadow-md hover:bg-blue-700"
          >
            Create New Workout Session
          </Link>
        </div>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading sessions...</p>
        ) : sessions.length === 0 ? (
          <p className="text-center text-gray-500">
            No workout sessions found.
          </p>
        ) : (
          <ul className="space-y-4">
            {sessions.map((session: WorkoutSession) => (
              <li
                key={session.id}
                className="p-4 transition bg-white rounded shadow cursor-pointer hover:shadow-lg"
                onClick={() => navigate(`/workout-sessions/${session.id}`)}
              >
                <h2 className="text-xl font-semibold">{session.name}</h2>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default WorkoutSessionListPage;
