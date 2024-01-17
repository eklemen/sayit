import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useGetSounds } from '@src/hooks/useGetSounds';
import Select from 'react-select';

export interface CreateWordFormValues {
  word: {
    sound: string;
    letters: string;
  }[];
}

interface Props {
  onSubmit: (data: CreateWordFormValues) => void;
}

function CreateWordForm({ onSubmit }: Props) {
  const { sounds } = useGetSounds();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWordFormValues>({
    defaultValues: {
      word: [
        {
          sound: '',
          letters: '',
        },
      ],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: 'word',
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*<input type="text" placeholder="word" {...register('word', { required: true })} />*/}
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className={'section'} key={field.id}>
                <input
                  placeholder="letters"
                  {...register(`word.${index}.letters` as const, {
                    required: true,
                  })}
                  className={errors?.word?.[index]?.letters ? 'error' : ''}
                />
                <Controller
                  name={`word.${index}.sound` as const}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      filterOption={(option, rawInput) => {
                        return option.label
                          .toLowerCase()
                          .includes(rawInput.toLowerCase());
                      }}
                      isSearchable
                      options={sounds?.map((sound) => {
                        return {
                          label: sound.sound,
                          value: sound.key,
                        };
                      })}
                    />
                  )}
                />
                <button type="button" onClick={() => remove(index)}>
                  DELETE
                </button>
              </section>
            </div>
          );
        })}
        <button
          type="button"
          onClick={() =>
            append({
              sound: '',
              letters: '',
            })
          }
        >
          ADD
        </button>
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
