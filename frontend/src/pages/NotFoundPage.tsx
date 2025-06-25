import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-2 text-lg text-gray-600">Page Not Found</p>
        <Link
          to="/"
          className="inline-block px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Go to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
