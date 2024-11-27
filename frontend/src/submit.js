import { useReactFlow } from 'reactflow';
import { Notification } from './components/notification'; 
import { useState } from 'react';

export const SubmitButton = () => {
  const { getNodes, getEdges } = useReactFlow();
  const [notification, setNotification] = useState(null);

  const handleSubmit = async () => {
    const nodes = getNodes();
    const edges = getEdges();

    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const { num_nodes, num_edges, is_dag } = await response.json();

      const message = (
        <>
          <strong>Pipeline Submitted Successfully!</strong>
          <ul className="mt-2">
            <li><span className="font-medium">Nodes:</span> {num_nodes}</li>
            <li><span className="font-medium">Edges:</span> {num_edges}</li>
            <li><span className="font-medium">Is DAG:</span> {is_dag ? 'Yes' : 'No'}</li>
          </ul>
        </>
      );

      setNotification(message);
    } catch (error) {
      console.error('Error submitting pipeline:', error);

      const errorMessage = (
        <>
          <strong>Error Submitting Pipeline!</strong>
          <p className="mt-2">Failed to submit pipeline. Check the console for details.</p>
        </>
      );

      setNotification(errorMessage);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-[#eafce4] border-2 border-[#478e30] rounded-lg px-6 text-[#478e30] font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-md fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      >
        Submit
      </button>
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};
