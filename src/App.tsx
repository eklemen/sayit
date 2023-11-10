import type React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '@pages/Error';
import Login from '@pages/Login/Login';
import Dashboard from '@pages/Dashboard/Dashboard';
import CreateWord from '@pages/CreateWord/CreateWord';
import AuthRoute from '@src/components/AuthRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <AuthRoute>
          <Dashboard />
        </AuthRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/dashboard',
      element: (
        <AuthRoute>
          <Dashboard />
        </AuthRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/create-word',
      element: (
        <AuthRoute>
          <CreateWord />
        </AuthRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
