import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useGetUser } from '@src/hooks/useGetUser';
import { useGetWords } from '@src/hooks/useGetWords';
import Select from 'react-select';
import WordCard from '@pages/ManageGroup/WordCard';

type FormValues = {
  words: OptionType;
};

interface OptionType {
  label: string;
  value: string;
}

function AddWordForm() {
  const { user, userLoading } = useGetUser();
  const { allWords, isLoading: isWordsLoading, words } = useGetWords();
  const [wordsToDelete, setWordsToDelete] = useState<string[]>([]);
  const [wordsToAdd, setWordsToAdd] = useState<OptionType[]>([]);
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    console.log('data to delete-------->', wordsToDelete);
  };
  const handleDelete = (id: string) => {
    setWordsToDelete((prev) => [...prev, id]);
  };
  if (userLoading || !user || isWordsLoading) return null;
  const filteredWords = words?.filter((w) => !wordsToDelete.includes(w._id));
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col my-4 w-[600px]">
      <div className="relative flex flex-col w-full">
        <div className="px-6 py-6">
          <div className="flex flex-col items-center">
            {!isWordsLoading && !allWords?.length ? (
              <p>
                Let's add some words to your word group! Start searching below, or create
                your own.
              </p>
            ) : null}
            <div className="mb-[100px] max-w-fit">
              <label
                htmlFor="words"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Select all the words you want to add to this list.
                <br />
                You can always edit these later.
              </label>
              <Controller
                name="words"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    classNamePrefix="select"
                    isLoading={userLoading}
                    isSearchable
                    onChange={(value) => {
                      setValue('words', { label: '', value: '' });
                      if (value) {
                        setWordsToAdd([...wordsToAdd, value]);
                      }
                    }}
                    options={
                      allWords?.map(({ word, _id }) => ({ label: word, value: _id })) ||
                      []
                    }
                  />
                )}
              />
            </div>
            <div className="flex justify-around flex-col">
              <div className="flex flex-col min-w-[240px] flex-1">
                <p>Words for this group:</p>
                {wordsToAdd?.map((w) => (
                  <WordCard
                    key={w.value}
                    word={w.label}
                    _id={w.value}
                    onDelete={() => {
                      setWordsToAdd((prev) => prev.filter((p) => p.value !== w.value));
                    }}
                  />
                ))}
              </div>
              <hr className="h-px my-6 bg-gray-200 border-0" />
              <div className="flex flex-col min-w-[240px] flex-1">
                {filteredWords?.map((w) => (
                  <WordCard
                    key={w._id}
                    word={w.wordId.word}
                    _id={w._id}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
            <button
              className="text-red-600 accent-red-800 background-transparent uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => {}}
            >
              Cancel
            </button>
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddWordForm;
