import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@src/fetch';
import { useForm } from 'react-hook-form';
import { useGetUser } from '@src/hooks/useGetUser';
import { toast } from 'react-toastify';

interface Props {
  onClose: () => void;
}

export interface FormValues {
  groupName: string;
}

function WordGroupForm({ onClose }: Props) {
  const queryClient = useQueryClient();
  const { user } = useGetUser();
  const {
    mutate: saveWordGroup,
    error,
    data,
  } = useMutation({
    mutationFn: (data: FormValues) =>
      api.post('/wordGroups', data, {
        apitoken: user?._id || '',
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  // const { refetchUser } = useGetUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  useEffect(() => {
    if (!error && data) {
      toast('Group created!', {
        type: 'success',
      });
      onClose();
    } else if (error) {
      toast('Something went wrong creating this group.', {
        type: 'error',
      });
    }
  }, [error, data]);
  // if (!showWordGroupForm) return null;

  const onSub = ({ groupName }: FormValues, e: any) => {
    e.preventDefault();
    saveWordGroup({
      groupName,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSub)} className="my-4">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="px-6 py-6">
            <div className="space-y-4">
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
              <button
                className="text-red-600 accent-red-800 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onClose}
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
    </>
  );
}

export default WordGroupForm;
