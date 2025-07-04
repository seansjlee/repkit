import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getExercise } from '../api/exerciseApi';
import { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react';
import { useVoice } from '../hooks/useVoice';

const ExerciseTimerPage: React.FC = () => {
  const { sessionId, exerciseId } = useParams();
  const navigate = useNavigate();
  const { speak } = useVoice();

  const [phase, setPhase] = useState<'ready' | 'set' | 'rest' | 'done'>(
    'ready',
  );
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [restKey, setRestKey] = useState(0);

  const { data: exercise, isLoading } = useQuery({
    queryKey: ['exercise', sessionId, exerciseId],
    queryFn: () => getExercise(sessionId!, exerciseId!),
    enabled: !!sessionId && !!exerciseId,
  });

  useEffect(() => {
    if (phase === 'set') {
      speak(
        `Set ${currentSetIndex + 1}, ${exercise.exerciseSets[currentSetIndex]?.reps} reps.`,
      );
    } else if (phase === 'rest') {
      speak('Rest');
    } else if (phase === 'done') {
      speak('Workout complete');
    }
  }, [phase]);

  const handleFinishSet = () => {
    if (currentSetIndex + 1 === exercise?.exerciseSets?.length) {
      setPhase('done');
    } else {
      setPhase('rest');
      setIsRunning(true);
      setRestKey((prev) => prev + 1);
    }
  };

  const handleRestComplete = () => {
    setCurrentSetIndex((prev) => prev + 1);
    setPhase('set');
    setIsRunning(true);
  };

  const handlePrevious = () => {
    if (phase === 'rest') {
      setPhase('set');
      setIsRunning(true);
    } else if (phase === 'set' && currentSetIndex > 0) {
      setCurrentSetIndex((prev) => prev - 1);
      setPhase('rest');
      setIsRunning(true);
    } else if (phase === 'set') {
      setPhase('ready');
      setIsRunning(false);
    }
  };

  const handleNext = () => {
    if (phase === 'ready') {
      setPhase('set');
      setIsRunning(true);
    } else if (
      phase === 'rest' &&
      currentSetIndex + 1 < (exercise?.exerciseSets?.length ?? 0)
    ) {
      setPhase('set');
      setIsRunning(true);
      setCurrentSetIndex((prev) => prev + 1);
    } else if (
      phase === 'set' &&
      currentSetIndex + 1 < (exercise?.exerciseSets?.length ?? 0)
    ) {
      setPhase('rest');
      setIsRunning(true);
    } else if (phase === 'set') {
      setPhase('done');
    }
  };

  if (isLoading || !exercise) {
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
            onClick={() => navigate(-1)}
            className="absolute left-0 flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-800" />
          </button>
          <h1 className="text-2xl font-bold">{exercise.name}</h1>
        </div>

        {/* Timer Display */}
        <div className="flex flex-col items-center mb-6">
          {phase === 'ready' && (
            <CountdownCircleTimer
              isPlaying={isRunning}
              duration={5}
              colors={'#00BFFF'}
              size={200}
              onComplete={() => setPhase('set')}
            >
              {({ remainingTime }) => (
                <div className="flex flex-col items-center">
                  <p className="text-3xl font-semibold">{remainingTime}s</p>
                  <p className="text-sm text-gray-500">Get ready...</p>
                </div>
              )}
            </CountdownCircleTimer>
          )}

          {phase === 'set' && (
            <CountdownCircleTimer
              isPlaying={isRunning}
              duration={1000} // long dummy value
              colors={'#10B981'}
              size={200}
              trailColor="#e5e7eb"
              onComplete={() => ({ shouldRepeat: true })}
            >
              {({ elapsedTime }) => (
                <div className="flex flex-col items-center">
                  <p className="text-3xl font-semibold">
                    {Math.floor(elapsedTime)}s
                  </p>
                  <p className="text-sm text-gray-500">
                    Set {currentSetIndex + 1} in progress
                  </p>
                </div>
              )}
            </CountdownCircleTimer>
          )}

          {phase === 'rest' && (
            <CountdownCircleTimer
              key={restKey}
              isPlaying={isRunning}
              duration={exercise.restSeconds}
              colors={'#F59E0B'}
              size={200}
              onComplete={handleRestComplete}
            >
              {({ remainingTime }) => (
                <div className="flex flex-col items-center">
                  <p className="text-3xl font-semibold">{remainingTime}s</p>
                  <p className="text-sm text-gray-500">Resting...</p>
                </div>
              )}
            </CountdownCircleTimer>
          )}

          {phase === 'done' && (
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                Workout Complete!
              </p>
              <button
                onClick={() =>
                  navigate(`/workout-sessions/${sessionId}/exercises`)
                }
                className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Back to Session
              </button>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="relative flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <button
              onClick={handlePrevious}
              className="p-2 border rounded-full hover:bg-gray-100"
              disabled={phase === 'ready'}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              className="p-3 text-white bg-blue-600 rounded-full hover:bg-blue-700"
              onClick={() => {
                if (phase === 'ready') {
                  speak(`${exercise.name}. Get ready.`);
                }
                setIsRunning((prev) => !prev);
              }}
            >
              {isRunning ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>

            <button
              onClick={handleNext}
              className="p-2 border rounded-full hover:bg-gray-100"
              disabled={phase === 'done'}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {phase === 'set' && (
            <button
              onClick={handleFinishSet}
              className="absolute bottom-[-3.5rem] px-4 py-2 border rounded hover:bg-gray-100"
            >
              Finish Set
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default ExerciseTimerPage;
