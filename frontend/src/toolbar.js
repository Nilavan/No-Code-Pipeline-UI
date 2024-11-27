import { DraggableNode } from './draggableNode';
import {
  ArrowRightEndOnRectangleIcon,
  SparklesIcon,
  DocumentArrowDownIcon,
  DocumentTextIcon,
  TableCellsIcon,
  ArrowsRightLeftIcon,
  MicrophoneIcon,
  ArrowDownTrayIcon,
  ArrowRightStartOnRectangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/solid';

export const PipelineToolbar = () => {
  return (
    <div
      className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-2xl rounded-2xl p-2 border border-gray-300 z-50 flex gap-4 overflow-x-auto no-scrollbar"
      style={{
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0,0,0,0.1)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        padding: '12px 12px',
      }}
    >
      <DraggableNode type="customInput" label="Input" icon={ArrowRightEndOnRectangleIcon} />
      <DraggableNode type="llm" label="LLM" icon={SparklesIcon} />
      <DraggableNode type="customOutput" label="Output" icon={ArrowRightStartOnRectangleIcon} />
      <DraggableNode type="text" label="Text" icon={DocumentTextIcon} />
      <DraggableNode type="knowledgeBase" label="Knowledge" icon={ArrowDownTrayIcon} />
      <DraggableNode type="stt" label="Speech to Text" icon={MicrophoneIcon} />
      <DraggableNode type="condition" label="Condition" icon={ArrowsRightLeftIcon} />
      <DraggableNode type="file" label="File" icon={DocumentArrowDownIcon} />
      <DraggableNode type="dataCollector" label="Data Collector" icon={TableCellsIcon} />
      <DraggableNode type="sampleNode" label="Sample Node" icon={InformationCircleIcon} />
    </div>
  );
};
