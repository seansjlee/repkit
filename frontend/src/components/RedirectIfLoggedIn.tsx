import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

const RedirectIfLoggedIn = () => {
  const [checked, setChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    isLoggedIn().then((result) => {
      setLoggedIn(result);
      setChecked(true);
    });
  }, []);

  if (!checked) return null;

  return loggedIn ? <Navigate to="/workout-sessions" replace /> : <Outlet />;
};

export default RedirectIfLoggedIn;
