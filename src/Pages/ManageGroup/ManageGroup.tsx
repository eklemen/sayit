import React from 'react';
import { useParams } from 'react-router-dom';

function ManageGroup() {
  const params = useParams();
  console.log('params-------->', params);
  return <div>ManageGroup component</div>;
}

export default ManageGroup;
