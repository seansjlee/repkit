import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

const RequireAuth = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const check = async () => {
      const result = await isLoggedIn();
      setAuthenticated(result);
      setAuthChecked(true);
    };
    check();
  }, []);

  if (!authChecked) return null; // or a spinner

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
