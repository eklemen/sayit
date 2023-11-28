import React from 'react';

interface Props {
  onClose: () => void;
}
function WordGroupModalHeader({ onClose }: Props) {
  return (
    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
      <h3 className="text-2xl font-semibold text-gray-800">Add a Word Group</h3>
      <button
        className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
        onClick={onClose}
        aria-label="close"
      >
        <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
          ×
        </span>
      </button>
    </div>
  );
}

export default WordGroupModalHeader;
