import React, { useState } from 'react';
import DualListBox from 'react-dual-listbox';

const options = [
  { value: 'one', label: 'Option One' },
  { value: 'two', label: 'Option Two' },
];
function WordListBox({ ...rest }) {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <DualListBox
      {...rest}
      canFilter
      options={options}
      selected={selected}
      onChange={(value: string[]) => setSelected(value)}
    />
  );
}

export default WordListBox;
