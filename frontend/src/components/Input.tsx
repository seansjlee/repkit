type InputProps = {
  id: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
};

const Input = ({
  id,
  type,
  value,
  onChange,
  className = '',
  required = false,
}: InputProps) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      required={required}
    />
  );
};

export default Input;
