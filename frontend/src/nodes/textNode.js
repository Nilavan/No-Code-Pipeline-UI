// TextNode.js

import { useState } from 'react';
import BaseNode from './baseNode';
import { Position } from 'reactflow';
import { DocumentTextIcon } from "@heroicons/react/24/solid";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || 'text');

  const fields = [
    { label: 'Text', type: 'textarea', value: currText, action: (e) => setCurrText(e.target.value), enableVariables: true },
  ];

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-value` },
  ];

  return (
    <BaseNode
      id={id}
      label="Text"
      fields={fields}
      handles={handles}
      icon={DocumentTextIcon}
    />
  );
}
