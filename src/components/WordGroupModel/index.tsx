import React, { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '@src/fetch';
import WordGroupModalHeader from '@src/components/WordGroupModel/WordGroupModalHeader';
import WordGroupModalFooter from '@src/components/WordGroupModel/WordGroupModalFooter';
import { useForm } from 'react-hook-form';

interface Props {
  showModal: boolean;
  onClose: () => void;
  onSave: () => void;
}

export interface FormValues {
  groupName: string;
}

function WordGroupModal({ showModal, onClose, onSave }: Props) {
  // useEffect(() => {
  //   function handleKeyDown(event: KeyboardEvent) {
  //     if (event.key === 'Escape') {
  //       console.log('event.key-------->', event.key);
  //       onClose();
  //     }
  //   }
  //
  //   window.addEventListener('keydown', handleKeyDown);
  //
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);
  const {
    mutate: saveWordGroup,
    error,
    data,
  } = useMutation({
    mutationFn: (data: FormValues) => api.get('/wordGroups', data),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  useEffect(() => {
    if (!error && data) {
      console.log('data-------->', data);
    } else {
      console.log('error-------->', error);
    }
  }, [error, data]);
  if (!showModal) return null;

  const onSub = ({ groupName }: FormValues, e) => {
    e.preventDefault();
    console.log('groupName-------->', groupName);
    // saveWordGroup({
    //   groupName,
    // });
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <form onSubmit={handleSubmit(onSub)}>
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <WordGroupModalHeader onClose={onClose} />
              {/*body*/}
              <div className="px-6 py-6">
                <div>
                  <label
                    htmlFor="groupName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Group name
                  </label>
                  <div className="mt-2">
                    <input
                      id="groupName"
                      {...register('groupName', {
                        required: true,
                      })}
                      aria-invalid={errors.groupName ? 'true' : 'false'}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                    />
                    {errors.groupName?.type === 'required' && (
                      <p role="alert" className="text-red-700 text-sm">
                        Group Name is required
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/*footer*/}
              <WordGroupModalFooter onClose={onClose} />
            </div>
          </form>
        </div>
      </div>
      <div role="presentation" className="opacity-50 fixed inset-0 z-40 bg-black" />
    </>
  );
}

export default WordGroupModal;
