import { User } from '@src/fetch/responseTypes/user';
import api from '@src/fetch';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

type FormValues = {
  email?: string;
};

export const useGetUser = (passedEmail?: string) => {
  const email = passedEmail || localStorage.getItem('email');

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
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
  };
};
