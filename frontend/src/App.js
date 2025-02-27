import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { ReactFlowProvider } from 'reactflow';

function App() {
  return (
    <div>
      <ReactFlowProvider>
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
