import React, { useEffect, useState } from 'react';
import { useUserMutation } from '@src/hooks/useGetUser';
import api from '@src/fetch';

function Dashboard() {
  const { user } = useUserMutation();
  const [words, setWords] = useState([]);
  const wordGroup = user?.wordGroups[user?.wordGroups?.length - 1];
  useEffect(() => {
    const getWords = async () => {
      const words = await api.get('/words', { groupName: wordGroup });
      setWords(words);
    };
    getWords();
  }, []);
  return (
    <div className="flex justify-center align-middle h-full">
      <div>
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in
            reverse chronological order.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
