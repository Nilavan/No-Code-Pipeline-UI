// ConditionNode.js
import { useState } from 'react';
import BaseNode from './baseNode';
import { Position } from 'reactflow';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/solid';

export const ConditionNode = ({ id, data }) => {
    const [currIfCondition, setCurrIfCondition] = useState(data.ifCondition || 'condition');
    const [currThen, setThen] = useState(data.then || 'statement');
    const [currElseCondition, setCurrElseCondition] = useState(data.elseCondition || 'condition');
  
    const fields = [
        { label: 'if', type: 'text', value: currIfCondition, action: (e) => setCurrIfCondition(e.target.value) },
        { label: 'then', type: 'text', value: currThen, action: (e) => setThen(e.target.value) },
        { label: 'else', newRow: true, type: 'text', value: currElseCondition, action: (e) => setCurrElseCondition(e.target.value) },
        { 
            label: 'Add',
            newRow: true, 
            type: 'button', 
            url: 'https://www.example.com',
            controlStyle: { backgroundColor: '#6466f1', color: '#fff', fontWeight: 'bold' },
        },
        { 
            label: 'Remove', 
            type: 'button',
            url: 'https://www.example.com',
            controlStyle: { backgroundColor: '#e0e0e0', color: '#000' }
        }
    ];

    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-query` },
        { type: 'source', position: Position.Right, id: `${id}-results` }
    ];
    
    return (
        <BaseNode
        id={id}
        label="Condition"
        fields={fields}
        handles={handles}
        icon={ArrowsRightLeftIcon}
        />
    );
};
