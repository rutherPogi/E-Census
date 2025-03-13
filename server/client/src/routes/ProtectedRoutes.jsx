import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../utils/auth/authContext.jsx'


const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Small delay to ensure auth state is checked
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return isAuthenticated ? <Outlet/> : <Navigate to='/'/>
}

export default ProtectedRoutes