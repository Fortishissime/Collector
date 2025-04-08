import React, { useState, useEffect } from 'react';
import '../../../index.css';

const Notification = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => setVisible(false), 2500); 
    const removeTimer = setTimeout(onClose, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 px-4 py-2 rounded shadow-lg text-white transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
    >
      {message}
    </div>
  );
};

export default Notification;
