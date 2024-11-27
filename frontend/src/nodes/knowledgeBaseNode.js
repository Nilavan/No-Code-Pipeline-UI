// KnowledgeBaseNode.js
import { useState } from 'react';
import BaseNode from './baseNode';
import { Position } from 'reactflow';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

export const KnowledgeBaseNode = ({ id, data }) => {
  const [knowledgeBaseType, setknowledgeBaseType] = useState(data.knowledgeBaseType || 'Option 1');

  const fields = [
    { label: 'Knowledge Base', type: 'select', value: knowledgeBaseType, action: (e) => setknowledgeBaseType(e.target.value), options: ['Option 1', 'Option 2'] },
    { label: 'Create New Knowledge Base', newRow: true, type: 'button', url: 'https://www.example.com'}
  ];

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-query` },
    { type: 'source', position: Position.Right, id: `${id}-results` }
  ];
  
  return (
    <BaseNode
      id={id}
      label="Knowledge Base Reader"
      fields={fields}
      handles={handles}
      icon={ArrowDownTrayIcon}
    />
  );
};
