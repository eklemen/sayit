import React from 'react';
import { useGetWords } from '@src/hooks/useGetWords';
import Container from '@src/components/Container';
import { useParams } from 'react-router-dom';
import WordCard from '@pages/ManageGroup/WordCard';
import AddWordForm from '@src/components/AddWordForm';

function ManageGroup() {
  const { groupName } = useParams();
  const { words } = useGetWords();
  console.log('words-------->', words);
  return (
    <Container>
      <div className="flex flex-col space-y-6">
        <h2 className="text-4xl mb-4">{`Manage group ${
          groupName ? ': ' + groupName : ''
        }`}</h2>
        <AddWordForm />
        {words?.map((word) => {
          return <WordCard key={word._id} word={word.wordId.word} _id={word._id} />;
        })}
      </div>
    </Container>
  );
}

export default ManageGroup;
