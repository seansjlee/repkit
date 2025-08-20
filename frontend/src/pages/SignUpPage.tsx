import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api/userApi';
import Input from '../components/Input';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);

    try {
      await signUp(username, password);
      navigate('/login');
    } catch (error) {
      setError('Sign up failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-3xl font-bold text-center">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">
              Username
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={true}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-medium">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={true}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="space-y-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-4 py-2 font-semibold text-white transition bg-blue-600 rounded shadow-md hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Signing up...' : 'Sign up'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full px-4 py-2 font-semibold text-blue-600 border border-blue-600 rounded shadow-md hover:bg-blue-50"
            >
              Back to login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUpPage;
