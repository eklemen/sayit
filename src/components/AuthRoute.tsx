import React from 'react';
import { Navigate } from 'react-router-dom';

function AuthRoute({ children }: { children: React.ReactNode }) {
  const email = localStorage.getItem('email');
  if (!email) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default AuthRoute;
