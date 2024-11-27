// LLMNode.js
import { useState } from 'react';
import BaseNode from './baseNode';
import { Position } from 'reactflow';
import { SparklesIcon } from '@heroicons/react/24/solid'

export const LLMNode = ({ id, data }) => {
  const [systemSetting, setSystemSetting] = useState(data?.systemSetting || 'default');
  const [prompt, setPrompt] = useState(data?.prompt || 'prompt');

  const fields = [
    { label: 'LLM information', type: 'info' },
    {
      type: 'custom',
      newRow: true,
      children: (
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Progress:</span>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div className="h-full bg-[#6466f1] rounded" style={{ width: '50%' }}></div>
          </div>
        </div>
      ),
    },
    { label: 'System', newRow: true, type: 'text', value: systemSetting, action: (e) => setSystemSetting(e.target.value) },
    { label: 'Prompt', newRow: true, type: 'textarea', value: prompt, action: (e) => setPrompt(e.target.value) },
  ];

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`},
    { type: 'target', position: Position.Left, id: `${id}-prompt`},
    { type: 'source', position: Position.Right, id: `${id}-response` },
  ];

  return (
    <BaseNode
      id={id}
      label="LLM"
      fields={fields}
      handles={handles}
      icon={SparklesIcon}
      width={300}
    />
  );
};
