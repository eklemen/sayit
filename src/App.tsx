import type React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '@pages/Error';
import Login from '@pages/Login/Login';
import Dashboard from '@pages/Dashboard/Dashboard';
import AuthRoute from '@src/components/AuthRoute';
import Manage from '@pages/Manage/Manage';
import { ToastContainer } from 'react-toastify';
import ManageGroup from '@pages/ManageGroup/ManageGroup';

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
      path: '/manage',
      element: (
        <AuthRoute>
          <Manage />
        </AuthRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/manage/group/:groupName',
      element: (
        <AuthRoute>
          <ManageGroup />
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
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
