import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@src/components/Navbar';

function AuthRoute({ children }: { children: React.ReactNode }) {
  const email = localStorage.getItem('email');
  if (!email) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default AuthRoute;
