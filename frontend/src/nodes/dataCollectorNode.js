// DataCollectorNode.js
import { useState } from 'react';
import BaseNode from './baseNode';
import { Position } from 'reactflow';
import { TableCellsIcon, TrashIcon } from '@heroicons/react/24/solid'

export const DataCollectorNode = ({ id, data }) => {
  const [prompt, setPrompt] = useState(data?.prompt || 'prompt');
  const [tableRows, setTableRows] = useState([
    { field: '', description: '', example: '' },
  ]);

  const addRow = () => {
    setTableRows([...tableRows, { field: '', description: '', example: '' }]);
  };

  const updateRow = (index, key, value) => {
    const updatedRows = [...tableRows];
    updatedRows[index][key] = value;
    setTableRows(updatedRows);
  };

  const removeRow = (index) => {
    setTableRows(tableRows.filter((_, rowIndex) => rowIndex !== index));
  };

  const fields = [
    { label: 'Prompt', newRow: true, type: 'textarea', value: prompt, action: (e) => setPrompt(e.target.value), enableVariables: true},
    {
        type: 'custom',
        newRow: true,
        children: (
          <div className="space-y-4">
            <table className="w-full rounded-md text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-1 text-gray-700">Field</th>
                  <th className="px-2 py-1 text-gray-700">Description</th>
                  <th className="px-2 py-1 text-gray-700">Example</th>
                  <th className="px-2 py-1 text-gray-700">Remove</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, index) => (
                  <tr key={index}>
                    <td className="px-2 py-1">
                      <input
                        type="text"
                        value={row.field}
                        onChange={(e) => updateRow(index, 'field', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:border-[#6466f1] focus:outline-none"
                      />
                    </td>
                    <td className="px-2 py-1">
                      <input
                        type="text"
                        value={row.description}
                        onChange={(e) => updateRow(index, 'description', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:border-[#6466f1] focus:outline-none"
                      />
                    </td>
                    <td className="px-2 py-1">
                      <input
                        type="text"
                        value={row.example}
                        onChange={(e) => updateRow(index, 'example', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:border-[#6466f1] focus:outline-none"
                      />
                    </td>
                    <td className="px-2 py-1 text-center flex justify-center items-center">
                      <TrashIcon
                        className="h-5 w-5 text-[#6466f1]"
                        onClick={() => removeRow(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={addRow}
              className="w-full px-3 py-2 bg-[#6466f1] text-white rounded-md text-sm font-medium transition-colors duration-200 hover:bg-[#4c4eaf]"
            >
              Add Field
            </button>
          </div>
        ),
      },
  ];

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-inputdata` },
    { type: 'source', position: Position.Right, id: `${id}-info` },
  ];

  return (
    <BaseNode
      id={id}
      label="Data Collector"
      fields={fields}
      handles={handles}
      icon={TableCellsIcon}
      width={400}
    />
  );
};
