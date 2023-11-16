import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useGetUser } from '@src/hooks/useGetUser';
import { useState } from 'react';

interface FormValues {
  email: string;
}
function Login() {
  const navigate = useNavigate();
  const [submittedEmail, setSubmittedEmail] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { user, isSuccess } = useGetUser(submittedEmail);
  const onSubmit = async ({ email }: FormValues) => {
    setSubmittedEmail(email);
    localStorage.setItem('email', email);
  };
  if (isSuccess && user) {
    navigate('/');
    return null;
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Enter your email to get started
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                autoComplete="email"
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                aria-invalid={errors.email ? 'true' : 'false'}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
              />
              {errors.email?.type === 'required' && (
                <p role="alert" className="text-red-700 text-sm">
                  Email is required
                </p>
              )}
              {errors.email?.type === 'pattern' && (
                <p role="alert" className="text-red-700 text-sm">
                  Invalid email format
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
