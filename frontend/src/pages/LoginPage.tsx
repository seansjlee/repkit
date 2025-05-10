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
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <p className="text-4xl font-bold text-gray-800">Repkit</p>
          <p className="text-xl text-gray-600 mt-2">
            Design your workout toolkit.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="username"
            placeholder="Enter your username."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-3 border rounded-md border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Input
            type="password"
            placeholder="Enter your password."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 border rounded-md border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log in
          </button>
        </form>
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>&copy; 2025 Sean Lee. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
