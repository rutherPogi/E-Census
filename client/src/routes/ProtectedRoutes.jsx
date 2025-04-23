import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../utils/auth/authContext.jsx';

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleConnectionChange = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // You can swap this for a spinner
  }

  if (!isAuthenticated) {
    if (!isOnline) {
      return <div>You are offline and not logged in. Please connect to the internet to log in.</div>;
    } else {
      return <Navigate to='/' />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoutes;
