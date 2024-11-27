// sttNode.js
import { useState } from 'react';
import BaseNode from './baseNode';
import { Position } from 'reactflow';
import { MicrophoneIcon } from '@heroicons/react/24/solid';

export const SttNode = ({ id, data }) => {
  const [modelType, setModelType] = useState(data.knowledgeBaseType || 'Option 1');

  const fields = [
    { label: 'Model', type: 'select', value: modelType, action: (e) => setModelType(e.target.value), options: ['Option 1', 'Option 2'] },
  ];

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-audio` },
    { type: 'source', position: Position.Right, id: `${id}-text` }
  ];
  
  return (
    <BaseNode
      id={id}
      label="Speech to Text"
      fields={fields}
      handles={handles}
      icon={MicrophoneIcon}
    />
  );
};
