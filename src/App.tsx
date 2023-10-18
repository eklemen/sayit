import type React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '@pages/Error';
import Login from '@pages/Login/Login';
import Dashboard from '@pages/Dashboard/Dashboard';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <div>home</div>,
      errorElement: <ErrorPage />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
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
