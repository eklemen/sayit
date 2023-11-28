import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select, { GroupBase } from 'react-select';
import { FormValues } from '@src/components/WordGroupForm';
import { useGetUser } from '@src/hooks/useGetUser';
import { useGetWords } from '@src/hooks/useGetWords';
import WordListBox from '@src/components/WordListBox';

type OptionType = {
  value: string;
  label: string;
};
function AddWordForm() {
  const { user, userLoading } = useGetUser();
  const { words, isLoading: isWordsLoading } = useGetWords();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => console.log(data);
  if (userLoading || !user || isWordsLoading) return null;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-4">
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        <div className="px-6 py-6">
          <div className="space-y-4">
            {!isWordsLoading && !words.length ? (
              <p>
                Let's add some words to your word group! Start searching below, or create
                your own.
              </p>
            ) : null}
            <WordListBox />
            <button
              className="text-red-600 accent-red-800 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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

// Dropdown for word group
// <label
//   htmlFor="groupName"
//   className="block text-sm font-medium leading-6 text-gray-900"
// >
//   Group name
// </label>
// <div className="mt-2">
//   <Controller
//     name="groupName"
//     control={control}
//     render={({ field }) => (
//       <Select
//         {...field}
//         classNamePrefix="select"
//         isLoading={userLoading}
//         defaultValue={{
//           label: user.wordGroups[0],
//           value: user.wordGroups[0],
//         }}
//         isSearchable
//         options={
//           user?.wordGroups?.map(
//             (w) => ({ label: w, value: w } as OptionType),
//           ) || []
//         }
//       />
//     )}
//   />
// </div>
