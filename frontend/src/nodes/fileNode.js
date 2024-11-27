// FileNode.js
import { useState } from 'react';
import BaseNode from './baseNode';
import { Position } from 'reactflow';
import { DocumentArrowDownIcon } from '@heroicons/react/24/solid'

export const FileNode = ({ id, data }) => {
  const [file, setFile] = useState(data.file || 'File');
  const [processFiles, setProcessFiles] = useState(false);

  const fields = [
    { label: 'Files', newRow: true, type: 'select', value: file, action: (e) => setFile(e.target.value), options: ['File 1', 'File 2'] },
    {
        type: 'custom',
        newRow: true,
        children: (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`${id}-process-files`}
              checked={processFiles}
              onChange={(e) => setProcessFiles(e.target.checked)}
              className="w-4 h-4 text-[#6466f1] border-gray-300 rounded focus:ring-[#6466f1]"
            />
            <label
              htmlFor={`${id}-process-files`}
              className="text-sm font-medium text-gray-700"
            >
              Process files into text
            </label>
          </div>
        ),
      },
  ];

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-files` }
  ];
  
  return (
    <BaseNode
      id={id}
      label="File"
      fields={fields}
      handles={handles}
      icon={DocumentArrowDownIcon}
    />
  );
};
