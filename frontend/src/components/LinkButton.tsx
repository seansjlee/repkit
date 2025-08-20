import { Link } from 'react-router-dom';

type LinkButtonProps = {
  children: React.ReactNode;
  to: string;
};

const LinkButton = ({ children, to }: LinkButtonProps) => {
  return (
    <div className="flex justify-center mb-6">
      <Link
        to={to}
        className="px-4 py-2 font-semibold text-white transition bg-blue-600 rounded shadow-md hover:bg-blue-700"
      >
        {children}
      </Link>
    </div>
  );
};

export default LinkButton;
