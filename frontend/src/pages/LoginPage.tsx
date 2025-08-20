import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/userApi';
import RepkitLogo from '../assets/repkit.png';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await login(username, password);
      navigate('/workout-sessions');
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={RepkitLogo} alt="Repkit Logo" className="w-56 sm:w-72" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="space-y-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-4 py-2 font-semibold text-white transition bg-blue-600 rounded shadow-md hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Logging in...' : 'Log in'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="w-full px-4 py-2 font-semibold text-blue-600 border border-blue-600 rounded shadow-md hover:bg-blue-50"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
