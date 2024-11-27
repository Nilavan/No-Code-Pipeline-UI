import { Handle, useUpdateNodeInternals } from 'reactflow';
import { useState, useEffect } from 'react';

const BaseNode = ({ id, label, icon: Icon, fields, handles, width = 200, style }) => {
  const [nodeWidth, setNodeWidth] = useState(width); 
  const [fieldTexts, setFieldTexts] = useState({}); 
  const [fieldVariables, setFieldVariables] = useState({}); 
  const updateNodeInternals = useUpdateNodeInternals();
  const nodeMaxHeight = 300;
  const nodeMaxWidth = 500;

  const groupFieldsByRow = (fields) => {
    const groupedFields = [];
    let currentRow = [];

    fields.forEach((field) => {
      if (field.newRow && currentRow.length > 0) {
        groupedFields.push(currentRow);
        currentRow = [];
      }
      currentRow.push(field);
    });

    if (currentRow.length > 0) {
      groupedFields.push(currentRow);
    }

    return groupedFields;
  };

  const calculateNodeWidth = (value, width) => {
    const lines = value.split('\n');
    const maxLineLength = Math.max(...lines.map((line) => line.length));
    const newWidth = Math.min(Math.max(width, maxLineLength * 8), nodeMaxWidth);
    return newWidth;
  };

  const extractVariables = (inputText) => {
    const variableRegex = /{{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*}}/g;
    const foundVariables = new Set();
    let match;

    while ((match = variableRegex.exec(inputText)) !== null) {
      foundVariables.add(match[1]);
    }

    return Array.from(foundVariables);
  };

  const handleTextareaChange = (fieldId, value, enableVariables) => {
    setFieldTexts((prev) => ({ ...prev, [fieldId]: value })); 
    if (enableVariables) {
      const variables = extractVariables(value); 
      setFieldVariables((prev) => ({ ...prev, [fieldId]: variables }));
    }
  };

  useEffect(() => {
    const newWidths = Object.values(fieldTexts).map((text) =>
      calculateNodeWidth(text, width)
    );
    setNodeWidth(Math.max(...newWidths, width)); 
  }, [fieldTexts, width]);

  useEffect(() => {
    updateNodeInternals(id); 
  }, [fieldVariables]);

  const dynamicHandles = Object.entries(fieldVariables).flatMap(
    ([fieldId, variables]) =>
      variables.map((variable, index) => ({
        key: `${id}-${fieldId}-${variable}-${index}`,
        type: 'target',
        position: 'left',
        id: `${id}-${fieldId}-${variable}-${index}`,
      }))
  );

  updateNodeInternals(id); 

  const leftHandles = [
    ...handles.filter((handle) => handle.position === 'left'),
    ...dynamicHandles,
  ];

  const rightHandles = handles.filter((handle) => handle.position === 'right');
  const totalLeftHandles = leftHandles.length;
  const totalRightHandles = rightHandles.length;
  const groupedFields = groupFieldsByRow(fields);

  return (
    <div
      className="bg-white border border-[#6466f1] hover:outline hover:outline-[#a9aaf2] hover:outline-4 focus-within:outline focus-within:outline-[#a9aaf2] focus-within:outline-4 rounded-lg shadow-md p-4"
      style={{ width: `${nodeWidth}px`, ...style }}
    >
      <div className="flex items-center space-x-2 mb-4">
        {Icon && <Icon className="h-5 w-5 text-[#6466f1]" aria-hidden="true" />}
        <span className="text-gray-800 font-semibold text-sm">{label}</span>
      </div>
      <div>
        {groupedFields.map((rowFields, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 mb-3">
            {rowFields.map(
              (
                { 
                  label: fieldLabel, 
                  type, 
                  value, 
                  action, 
                  enableVariables = false,
                  options = [], 
                  url, 
                  style: fieldStyle, 
                  controlStyle, 
                  children 
                },
                fieldIndex
              ) => (
                <div
                  key={fieldIndex}
                  className={`flex-1 ${fieldStyle?.className || ''}`}
                  style={fieldStyle}
                >
                  {type === 'textarea' && (
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {fieldLabel}
                      <textarea
                        value={value}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          action(e); 
                          handleTextareaChange(`${id}-${fieldIndex}`, newValue, enableVariables); 
                          e.target.style.height = 'auto';
                          e.target.style.height = `${Math.min(nodeMaxHeight, e.target.scrollHeight)}px`;
                        }}
                        className="resize-none w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:border-[#6466f1] focus:outline-none transition-colors duration-200"
                        style={controlStyle}
                      />
                    </label>
                  )}
                  {type === 'text' && (
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {fieldLabel}
                      <input
                        type="text"
                        value={value}
                        onChange={action}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:border-[#6466f1] focus:outline-none transition-colors duration-200"
                        style={controlStyle}
                      />
                    </label>
                  )}
                  {type === 'select' && (
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {fieldLabel}
                      <select
                        value={value}
                        onChange={action}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:border-[#6466f1] focus:outline-none transition-colors duration-200"
                        style={controlStyle} 
                      >
                        {options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                  {type === 'info' && (
                    <p className="text-xs text-gray-500" style={controlStyle}>
                      {fieldLabel}
                    </p>
                  )}
                  {type === 'button' && (
                    <button
                      onClick={() => window.open(url, '_blank')}
                      className="w-full px-3 py-2 bg-[#6466f1] text-white rounded-md text-sm font-medium transition-colors duration-200 hover:bg-[#4c4eaf]"
                      style={controlStyle}
                    >
                      {fieldLabel}
                    </button>
                  )}
                  {type === 'custom' && children}
                </div>
              )
            )}
          </div>
        ))}
      </div>
      
      {leftHandles.map((handle, index) => (
        <Handle
          // key={`left-${index}`}
          {...handle}
          className="!w-2 !h-2 !bg-[#6466f1]"
          style={{
            top: `${((index + 1) * (100 / (totalLeftHandles + 1)))}%`,
            transform: 'translateY(-50%)',
          }}
        />
      ))}

      {rightHandles.map((handle, index) => (
        <Handle
          // key={`right-${index}`}
          {...handle}
          className="!w-2 !h-2 !bg-[#6466f1]"
          style={{
            top: `${((index + 1) * (100 / (totalRightHandles + 1)))}%`,
            transform: 'translateY(-50%)',
          }}
        />
      ))}
    </div>
  );
};

export default BaseNode;
