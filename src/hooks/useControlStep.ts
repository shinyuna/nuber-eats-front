import { useState } from 'react';

export default function useControlStep() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [error, setError] = useState<string>('');

  return {
    currentStep,
    error,
    setCurrentStep,
    setError,
  };
}
