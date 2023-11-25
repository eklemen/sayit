import { useEffect, useState } from 'react';

interface Props {
  word: string;
  _id: string;
}
function WordCard({ word, _id }: Props) {
  const [deleteClicked, setDeleteClicked] = useState(false);
  useEffect(() => {
    if (deleteClicked) {
      setTimeout(() => {
        setDeleteClicked(false);
      }, 3000);
    }
  }, [deleteClicked]);
  return (
    <div
      key={_id}
      className="bg-white border border-gray-200 rounded-lg shadow h-fit flex items-start min-h-[48px] min-w-[200px] justify-between mb-2 pt-4 pr-4 pb-4 pl-5 max-w-fit"
    >
      <span className="text-xl font-bold">{word}</span>
      <div className="space-x-2">
        <button>edit</button>
        {deleteClicked ? (
          <button onClick={() => console.log('delete id: ', _id)}>?</button>
        ) : (
          <button onClick={() => setDeleteClicked(true)}>X</button>
        )}
      </div>
    </div>
  );
}

export default WordCard;
