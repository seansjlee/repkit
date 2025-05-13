import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/input/Input';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-x-hidden bg-blue-50">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-3xl">
        <div className="mb-6 text-center">
          <p className="text-4xl font-bold text-gray-800">Repkit</p>
          <p className="mt-2 text-xl text-gray-600">
            your reps, your kit, your way.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="username"
            placeholder="Enter your username."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-3 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Input
            type="password"
            placeholder="Enter your password."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-3 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log in
          </button>
        </form>
        <div className="mt-6 text-sm text-center text-gray-500">
          <p>&copy; 2025 Sean Lee. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
