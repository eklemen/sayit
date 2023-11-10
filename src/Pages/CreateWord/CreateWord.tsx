import React from 'react';
import { useForm } from 'react-hook-form';
import { useGetSounds } from '@src/hooks/useGetSounds';

interface FormValues {
  word: string;
}

function CreateWord() {
  console.log('render-------->');
  const { sounds, isLoading, error } = useGetSounds();
  console.log('sounds-------->', sounds);
  console.log('isLoading-------->', isLoading);
  console.log('error-------->', error);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const canRenderSounds = !error && !isLoading && sounds;
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="word" {...register('word', { required: true })} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default CreateWord;
