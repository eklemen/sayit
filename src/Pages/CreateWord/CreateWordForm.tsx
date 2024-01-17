import React from 'react';
import { useForm } from 'react-hook-form';
import { useGetSounds } from '@src/hooks/useGetSounds';

interface FormValues {
  word: string;
}

interface Props {
  onSubmit: (data: FormValues) => void;
}

function CreateWordForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="word" {...register('word', { required: true })} />
        <button
          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default CreateWordForm;
