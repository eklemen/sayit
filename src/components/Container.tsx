import React from 'react';

interface Props {
  children: React.ReactNode;
}
function Container({ children }: Props) {
  return (
    <div className="flex-col-full">
      <div className="container">{children}</div>
    </div>
  );
}

export default Container;
