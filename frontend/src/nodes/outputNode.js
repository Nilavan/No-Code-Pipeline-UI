// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './baseNode'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const fields = [
    { label: 'Name', type: 'text', value: currName, action: (e) => setCurrName(e.target.value) },
    { label: 'Type', type: 'select', value: outputType, action: (e) => setOutputType(e.target.value), options: ['Text', 'File'] },
  ];

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-value` },
  ];

  return (
    <BaseNode
      id={id}
      label="Output"
      fields={fields}
      handles={handles}
      icon={ArrowRightStartOnRectangleIcon}
    />
  );
}
