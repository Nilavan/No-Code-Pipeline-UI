import { useEffect, useState } from 'react';
import { InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export const Notification = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false); 
        if (onClose) {
          setTimeout(onClose, 300);
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div
      className={`fixed top-5 right-5 p-4 bg-[#6466f1] text-white rounded-lg shadow-lg w-80 z-50 transition-all duration-300 ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
      style={{
        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
      }}
    >
      <div className="flex items-start">
        <InformationCircleIcon className="h-6 w-6 text-white mr-3" aria-hidden="true" />
        <div className="flex-1 text-sm">{message}</div>
        <button
          onClick={() => {
            setVisible(false); 
            if (onClose) {
              setTimeout(onClose, 300); 
            }
          }}
          className="w-6 h-6 bg-white text-[#6466f1] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 ml-2"
          aria-label="Close notification"
        >
          <XCircleIcon />
        </button>
      </div>
    </div>
  );
};
