// SampleNode.js
import { useState } from 'react';
import BaseNode from './baseNode';
import { Position } from 'reactflow';
import { InformationCircleIcon } from '@heroicons/react/24/solid'

export const SampleNode = ({ id, data }) => {
  const [sampleText1, setSampleText1] = useState(data?.sampleText1 || 'default');
  const [sampleText2, setSampleText2] = useState(data?.sampleText2 || '');
  const [sampleText3, setSampleText3] = useState(data?.sampleText3 || '');
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const fields = [
    { label: 'Sample node to show every feature of base node', type: 'info' },
    {
      type: 'custom',
      newRow: true,
      children: (
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Custom element:</span>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div className="h-full bg-[#6466f1] rounded" style={{ width: '80%' }}></div>
          </div>
        </div>
      ),
    },
    { label: 'Text', newRow: true, type: 'text', value: sampleText1, action: (e) => setSampleText1(e.target.value) },
    { label: 'Selection', type: 'select', value: inputType, action: (e) => setInputType(e.target.value), options: ['Text', 'File'] },
    { label: 'Textarea', newRow: true, type: 'textarea', value: sampleText2, action: (e) => setSampleText2(e.target.value) },
    { label: 'Textarea with variable input', newRow: true, type: 'textarea', value: sampleText3, action: (e) => setSampleText3(e.target.value), enableVariables: true },
    { 
        label: 'Button 1',
        newRow: true, 
        type: 'button', 
        url: 'https://www.example.com',
        controlStyle: { backgroundColor: '#6466f1', color: '#fff', fontWeight: 'bold' },
    },
    { 
        label: 'Button 2', 
        type: 'button',
        url: 'https://www.example.com',
        controlStyle: { backgroundColor: '#e0e0e0', color: '#000' }
    },
    { 
        label: 'Button 3', 
        newRow: true,
        type: 'button',
        url: 'https://www.example.com',
        controlStyle: { backgroundColor: '#eafce4', color: '#478e30' }
    }
  ];

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-sampleInput` },
    { type: 'source', position: Position.Right, id: `${id}-sampleOutput` },
  ];

  return (
    <BaseNode
      id={id}
      label="Sample Node"
      fields={fields}
      handles={handles}
      icon={InformationCircleIcon}
      width={400}
    />
  );
};
