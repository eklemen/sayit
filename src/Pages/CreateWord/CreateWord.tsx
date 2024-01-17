import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useGetSounds } from '@src/hooks/useGetSounds';
import CreateWordForm from '@pages/CreateWord/CreateWordForm';
import Container from '@src/components/Container';
import { createWordState } from '@src/recoilAtoms';

interface FormValues {
  word: string;
}

function CreateWord() {
  const { sounds, isLoading, error } = useGetSounds();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const canRenderSounds = !error && !isLoading && sounds;
  const setWord = useSetRecoilState(createWordState);
  const { word } = useRecoilValue(createWordState);
  const onSubmitWord = (data: FormValues) => {
    console.log(data);
    setWord((prev) => {
      return {
        ...prev,
        word: data.word,
      };
    });
  };

  return (
    <Container>
      <div className="flex flex-col space-y-6 w-[80%] items-center">
        <CreateWordForm onSubmit={onSubmitWord} />
        {word && <div>sounds</div>}
      </div>
    </Container>
  );
}

export default CreateWord;
