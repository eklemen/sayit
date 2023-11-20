import { User } from '@src/fetch/responseTypes/user';
import api from '@src/fetch';
import { useQuery } from '@tanstack/react-query';

export const useGetUser = (passedEmail?: string) => {
  const email = passedEmail || localStorage.getItem('email');

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
    refetch: refetchUser,
    isSuccess,
  } = useQuery({
    queryKey: ['user', email],
    queryFn: () => api.get<User>('/user', { email }),
    enabled: !!email, // Only run the query if the email is available
  });

  return {
    user,
    userLoading,
    userError,
    isSuccess,
    refetchUser,
    email,
  };
};
