import { useState, useCallback } from 'react';

export function useStepNavigation(totalSteps) {
  const [currentStep, setCurrentStep] = useState(0);

  const next = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const prev = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const reset = useCallback(() => setCurrentStep(0), []);

  return {
    currentStep,
    totalSteps,
    canGoNext: currentStep < totalSteps - 1,
    canGoPrev: currentStep > 0,
    next,
    prev,
    reset,
    goTo: setCurrentStep,
  };
}