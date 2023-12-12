import { useEffect, useState } from 'react';

interface Props {
  word: string;
  _id: string;
  onDelete: (id: string) => void;
}
function WordCard({ word, _id, onDelete }: Props) {
  // const [deleteClicked, setDeleteClicked] = useState(false);
  // useEffect(() => {
  //   if (deleteClicked) {
  //     setTimeout(() => {
  //       setDeleteClicked(false);
  //     }, 3000);
  //   }
  // }, [deleteClicked]);
  return (
    <div
      key={_id}
      className="bg-white border border-gray-200 rounded-lg shadow h-fit flex items-start min-h-[48px] min-w-[200px] justify-between mb-2 py-4 px-7 max-w-fit"
    >
      <span className="text-xl font-bold">{word}</span>
      <div className="space-x-2">
        <button onClick={() => onDelete(_id)}>X</button>
      </div>
    </div>
  );
}

export default WordCard;
