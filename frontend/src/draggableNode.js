// draggableNode.js

export const DraggableNode = ({ type, label, icon: Icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`${type} bg-white py-1 border-2 border-[#6466f1] rounded-lg px-4 space-x-2 flex items-center justify-center cursor-grab transition-all duration-200 hover:scale-105 hover:shadow-md`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      {Icon && <Icon className="h-4 w-4 text-[#6466f1]" aria-hidden="true" />}
      <span className="text-[#6466f1] font-semibold text-xs">{label}</span>
    </div>
  );
};
