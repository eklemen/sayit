import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetUser } from '@src/hooks/useGetUser';
import { useGetWords } from '@src/hooks/useGetWords';
import Select from 'react-select';
import WordCard from '@pages/ManageGroup/WordCard';
import { useUserWords } from '@src/hooks/useUserWords';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { saveWordsState } from '@src/recoilAtoms';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

type FormValues = {
  words: OptionType;
};

interface OptionType {
  label: string;
  value: string;
}

// TODO: Change name of this component
function AddWordForm() {
  const { user, userLoading } = useGetUser();
  const { groupName } = useParams();
  const navigate = useNavigate();
  const [, setSaveState] = useRecoilState(saveWordsState);
  const queryClient = useQueryClient();
  const { mutate: updateWords } = useUserWords({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['words', groupName] });
      setSaveState(() => {
        return {
          toaster: {
            message: 'Successfully updated words!',
            type: 'success',
            toastId: 'updateWords',
          },
        };
      });
      navigate('/manage');
    },
    onError: () => {
      toast("Something went wrong, but we're looking into the issue.", {
        type: 'error',
      });
    },
  });
  const { allWords, isLoading: isWordsLoading, words } = useGetWords();
  const [wordsToDelete, setWordsToDelete] = useState<string[]>([]);
  const [wordsToAdd, setWordsToAdd] = useState<OptionType[]>([]);
  const { handleSubmit, control, setValue } = useForm<FormValues>();
  const onSubmit = () => {
    const wordsToAddIds = wordsToAdd.map((w) => w.value);
    updateWords({
      groupName: groupName || '',
      wordsToAdd: wordsToAddIds,
      wordsToDelete,
    });
  };
  const handleDelete = (id: string) => {
    setWordsToDelete((prev) => [...prev, id]);
  };
  if (userLoading || !user || isWordsLoading) return null;
  const filteredWords = words?.filter((w) => !wordsToDelete.includes(w._id));
  const excludedWordList = new Set([
    ...(words?.map((word) => word.wordId.word) || []),
    ...wordsToAdd.map((word) => word.label),
  ]);
  const listOfAvailableWords =
    allWords?.filter((word) => !excludedWordList.has(word.word)) || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col my-4">
      <div className="relative flex flex-col w-full">
        <div className="px-6 py-6">
          <div className="flex flex-col items-center">
            {!isWordsLoading && !allWords?.length ? (
              <p>
                Let's add some words to your word group! Start searching below, or create
                your own.
              </p>
            ) : null}
            <div className="mb-[100px] max-w-fit flex justify-around">
              <div className="flex-center flex-col p-6">
                <label
                  htmlFor="words"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Select all the words you want to add to this list.
                  <br />
                  You can always edit these later.
                </label>
                <Select
                  className="w-full"
                  classNamePrefix="select"
                  isLoading={userLoading}
                  isSearchable
                  onChange={(value) => {
                    if (value) {
                      if (!wordsToAdd.find((w) => w.value === value.value)) {
                        setWordsToAdd([...wordsToAdd, value]);
                      }
                    }
                    setValue('words', { label: '', value: '' });
                  }}
                  options={
                    listOfAvailableWords?.map(({ word, _id }) => ({
                      label: word,
                      value: _id,
                    })) || []
                  }
                />
              </div>
              <div className="flex-center flex-col p-6">
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Save Changes
                </button>
                <button
                  className="text-red-600 accent-red-800 background-transparent uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {}}
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className="flex justify-around flex-col">
              <p>Words for this group:</p>
              <div className="grid grid-cols-2 gap-4">
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
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddWordForm;
