import React from 'react';

interface IFormErrorProps {
  errMsg: string;
  location?: string;
  margin?: string;
}

export const FormError: React.FC<IFormErrorProps> = ({ errMsg, location = 'left', margin }) => (
  <p className={`text-${location} text-red-500 text-sm ${margin}`}>{errMsg}</p>
);
