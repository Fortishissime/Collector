import React from 'react';

const SuccessMessage = ({ message }) => {
  if (!message) return null;

  return <p className="text-green-500 text-sm">{message}</p>;
};

export default SuccessMessage;
