import React from 'react';
import { redirect } from 'react-router-dom';

function AuthRoute({ children }: { children: React.ReactNode }) {
  const email = localStorage.getItem('email');
  if (!email) {
    redirect('/login');
    return null;
  }
  return <>{children}</>;
}

export default AuthRoute;
