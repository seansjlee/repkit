import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil } from 'lucide-react';
import { getWorkoutSession } from '../api/workoutSessionApi';
import { getExercises } from '../api/exerciseApi';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import LinkButton from '../components/LinkButton';

const ExerciseListPage: React.FC = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(
    null,
  );

  // fetch session
  const { data: session, isLoading: isLoadingSession } = useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => getWorkoutSession(sessionId!),
    enabled: !!sessionId,
  });

  // fetch exercises
  const { data: exercises = [], isLoading: isLoadingExercises } = useQuery({
    queryKey: ['exercises', sessionId],
    queryFn: () => getExercises(sessionId!),
    enabled: !!sessionId,
  });

  if (isLoadingSession) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 ">Loading session...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 ">Session not found.</div>
      </div>
    );
  }

  const toggleExpand = (exerciseId: string) => {
    setExpandedExerciseId((prev) => (prev === exerciseId ? null : exerciseId));
  };

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

        <LinkButton to={`/workout-sessions/${sessionId}/exercises/new`}>
          Add Exercise
        </LinkButton>

        {isLoadingExercises ? (
          <p className="text-center text-gray-500">Loading exercises...</p>
        ) : exercises.length === 0 ? (
          <p className="text-center text-gray-500">No exercises found.</p>
        ) : (
          <ul className="space-y-4">
            {exercises.map((exercise) => (
              <li
                key={exercise.id}
                className="p-4 transition bg-white rounded shadow cursor-pointer hover:shadow-lg"
                onClick={() => toggleExpand(exercise.id)}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{exercise.name}</h2>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="p-1 rounded hover:bg-gray-100"
                      onClick={() =>
                        navigate(
                          `/workout-sessions/${sessionId}/exercises/${exercise.id}/edit`,
                        )
                      }
                    >
                      <Pencil className="w-4 h-4 text-black" />
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                      onClick={() =>
                        navigate(
                          `/workout-sessions/${sessionId}/exercises/${exercise.id}/timer`,
                        )
                      }
                    >
                      Start
                    </button>
                  </div>
                </div>
                {expandedExerciseId === exercise.id && (
                  <div className="mt-4 space-y-2">
                    {exercise.exerciseSets.map((exerciseSet, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded"
                      >
                        <span>Set {exerciseSet.setNumber}</span>
                        <span>
                          {exerciseSet.weight} kg × {exerciseSet.reps} reps
                        </span>
                      </div>
                    ))}
                    <p className="mt-2 text-sm text-gray-500">
                      Rest between sets: {exercise.restSeconds} seconds
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default ExerciseListPage;
