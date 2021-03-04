import React from 'react';

interface IFormErrorProps {
  errMsg: string;
  location?: string;
}

export const FormError: React.FC<IFormErrorProps> = ({ errMsg, location = 'left' }) => (
  <p className={`text-${location} text-red-500`}>{errMsg}</p>
);
