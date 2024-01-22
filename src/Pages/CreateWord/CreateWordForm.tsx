import React, { useState } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import Select from 'react-select';
import { useGetSounds } from '@src/hooks/useGetSounds';
import { SoundKeys } from '@src/fetch/responseTypes/sound';
import { useTextToSpeech } from '@src/hooks/useTextToSpeech';
import SpeakerIcon from '@src/components/icons/SpeakerIcon';
import { PlusCircleIcon, SpeakerWaveIcon, TrashIcon } from '@heroicons/react/24/outline';

export interface CreateWordFormValues {
  word: {
    sound: {
      label: string;
      value: SoundKeys | '';
    };
    letters: string;
  }[];
}

interface Props {
  onSubmit: (data: CreateWordFormValues) => void;
}

function CreateWordForm({ onSubmit }: Props) {
  const [soundPath, setSoundPath] = useState<Record<string, string>>({});
  const { sounds, soundMap } = useGetSounds();
  const { speak } = useTextToSpeech();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWordFormValues>({
    defaultValues: {
      word: [
        {
          sound: {
            label: '',
            value: '',
          },
          letters: '',
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'word',
  });
  const value = useWatch({
    name: 'word',
    control,
  });

  const wholeWord = value.map(({ letters }) => letters).join('');
  const playAudio = (source: string) => {
    if (!source) return;
    const audio = new Audio(source);
    audio.play().catch((error) => console.error('Error playing audio:', error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10 grid gap-6 grid-cols-6">
          <div className="shadow-md p-4 rounded col-span-5">
            <span className="text-gray-600">Word: </span>
            <span className="text-xl">{wholeWord}</span>
          </div>
          <button
            className="col-span-1 flex items-center justify-center"
            type="button"
            onClick={() => speak(wholeWord)}
          >
            <SpeakerWaveIcon className="w-8" />
          </button>
        </div>
        {/*<input type="text" placeholder="word" {...register('word', { required: true })} />*/}
        {fields.map((field, index) => {
          return (
            <section key={field.id} className="grid gap-6 mb-6 grid-cols-5">
              <input
                placeholder="letters"
                {...register(`word.${index}.letters` as const, {
                  required: true,
                })}
                // className={errors?.word?.[index]?.letters ? 'error' : ''}
                className="pl-2 col-span-2"
              />
              <Controller
                name={`word.${index}.sound` as const}
                control={control}
                rules={{ required: true }}
                render={({ field, ...rest }) => (
                  <Select
                    {...field}
                    filterOption={(option, rawInput) => {
                      return option.label.toLowerCase().includes(rawInput.toLowerCase());
                    }}
                    className="col-span-2"
                    placeholder="Sound"
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
              <div className="col-span-1 flex flex-row items-center justify-around">
                <button
                  type="button"
                  onClick={() => {
                    const key = value[index].sound.value as SoundKeys;
                    playAudio(soundMap?.[key] || '');
                  }}
                >
                  <SpeakerWaveIcon className="w-6" />
                </button>
                <button
                  type="button"
                  className="text-red-600"
                  onClick={() => remove(index)}
                >
                  <TrashIcon className="w-6" />
                </button>
              </div>
            </section>
          );
        })}
        <div className="flex-col">
          <div className="w-full flex justify-center">
            <button
              type="button"
              className="flex space-x-2 items-center"
              onClick={() =>
                append({
                  sound: {
                    label: '',
                    value: '',
                  },
                  letters: '',
                })
              }
            >
              <PlusCircleIcon className="w-8 text-green-600" />
              <span>Add row</span>
            </button>
          </div>
          <div className="flex justify-end mt-10">
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateWordForm;
