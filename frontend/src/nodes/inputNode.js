// InputNode.js
import { useState } from 'react';
import BaseNode from './baseNode';
import { Position } from 'reactflow';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid'

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const fields = [
    { label: 'Name', type: 'text', value: currName, action: (e) => setCurrName(e.target.value) },
    { label: 'Type', type: 'select', value: inputType, action: (e) => setInputType(e.target.value), options: ['Text', 'File'] },
  ];

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-value` },
  ];
  
  return (
    <BaseNode
      id={id}
      label="Input"
      fields={fields}
      handles={handles}
      icon={ArrowRightEndOnRectangleIcon}
    />
  );
};
