import { useState, useEffect, useCallback } from 'react';

const KEY = 'dsa-progress-v1';

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '{}');
    } catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(progress));
  }, [progress]);

  const markComplete = useCallback((subId) => {
    setProgress(prev => ({ ...prev, [subId]: 'complete' }));
  }, []);

  const markInProgress = useCallback((subId) => {
    setProgress(prev => (prev[subId] === 'complete' ? prev : { ...prev, [subId]: 'in-progress' }));
  }, []);

  const getStatus = useCallback((subId) => progress[subId] || 'not-started', [progress]);

  return { progress, markComplete, markInProgress, getStatus };
}