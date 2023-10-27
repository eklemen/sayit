import { User } from '@src/fetch/responseTypes/user';
import api from '@src/fetch';
import { useState } from 'react';

type FormValues = {
  email?: string;
};

export const useUserMutation = () => {
  const [user, setUser] = useState<User>();

  const fetchUser = async ({ email }: FormValues) => {
    if (user) return user;
    const userEmail = email || localStorage.getItem('email');
    const userData = await api.get<User>('/user', { email: userEmail });
    setUser(userData);
    return userData;
  };

  return { fetchUser, user };
};
