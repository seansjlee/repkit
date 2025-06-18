import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import WorkoutSessionListPage from './pages/WorkoutSessionListPage';
import WorkoutSessionFormPage from './pages/WorkoutSessionFormPage';
import ExerciseListPage from './pages/ExerciseListPage';
import ExerciseFormPage from './pages/ExerciseFormPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/workout-sessions" element={<WorkoutSessionListPage />} />
        <Route path="/" element={<Navigate to="/workout-sessions" />} />
        <Route path="*" element={<Navigate to="/workout-sessions" />} />
        <Route
          path="/workout-sessions/new"
          element={<WorkoutSessionFormPage />}
        />
        <Route
          path="/workout-sessions/:sessionId/exercises"
          element={<ExerciseListPage />}
        />
        <Route
          path="/workout-sessions/:sessionId/edit"
          element={<WorkoutSessionFormPage />}
        />
        <Route
          path="/workout-sessions/:sessionId/exercises/new"
          element={<ExerciseFormPage />}
        />
        <Route
          path="/workout-sessions/:sessionId/exercises/:exerciseId/edit"
          element={<ExerciseFormPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
