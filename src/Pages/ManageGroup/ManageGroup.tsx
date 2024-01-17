import React from 'react';
import { useGetWords } from '@src/hooks/useGetWords';
import Container from '@src/components/Container';
import { useParams } from 'react-router-dom';
import WordGroupManager from '@src/components/WordGroupManager';

function ManageGroup() {
  const { groupName } = useParams();
  const { words } = useGetWords();
  console.log('words-------->', words);
  return (
    <Container>
      <div className="flex flex-col space-y-6 w-[80%] items-center">
        <h2 className="text-4xl px-6 mb-4 text-center">{`Manage group ${
          groupName ? ': ' + groupName : ''
        }`}</h2>
        <WordGroupManager />
      </div>
    </Container>
  );
}

export default ManageGroup;
