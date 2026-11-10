import React, { useState, useMemo } from 'react';
import Dashboard from './pages/Dashboard';
import PatternPage from './pages/PatternPage';
import SubPatternPage from './pages/SubPatternPage';
import Header from './components/layout/Header';
import PageNavigation from './components/layout/PageNavigation';
import { useProgress } from './hooks/useProgress';

// Import all sub-patterns to build the sequence
import { twoPointerSubPatterns } from './data/twoPointers';
import { slidingWindowSubPatterns } from './data/slidingWindow';
import { fastSlowSubPatterns } from './data/fastSlowPointers';
import { binarySearchSubPatterns } from './data/binarySearch';
import { hashingSubPatterns } from './data/hashing';
import { prefixSumSubPatterns } from './data/prefixSum';

// The complete sequence of pages for Previous/Next navigation
const PAGE_SEQUENCE = [
  { key: 'two-pointers', type: 'pattern', label: 'Two Pointers Overview', pattern: 'two-pointers' },
  ...twoPointerSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),
  
  { key: 'sliding-window', type: 'pattern', label: 'Sliding Window Overview', pattern: 'sliding-window' },
  ...slidingWindowSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),

  { key: 'fast-slow', type: 'pattern', label: 'Fast & Slow Overview', pattern: 'fast-slow' },
  ...fastSlowSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),

  { key: 'binary-search', type: 'pattern', label: 'Binary Search Overview', pattern: 'binary-search' },
  ...binarySearchSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),

  { key: 'hashing', type: 'pattern', label: 'Hashing Overview', pattern: 'hashing' },
  ...hashingSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),

  { key: 'prefix-sum', type: 'pattern', label: 'Prefix Sum Overview', pattern: 'prefix-sum' },
  ...prefixSumSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),
];

export default function App() {
  const [currentPageKey, setCurrentPageKey] = useState('dashboard');
  const { progress, markComplete, markInProgress } = useProgress();

  const currentIndex = useMemo(() => {
    if (currentPageKey === 'dashboard') return -1;
    return PAGE_SEQUENCE.findIndex(p => p.key === currentPageKey);
  }, [currentPageKey]);

  const navigateTo = (key) => {
    setCurrentPageKey(key);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goPrev = () => {
    if (currentIndex > 0) navigateTo(PAGE_SEQUENCE[currentIndex - 1].key);
  };

  const goNext = () => {
    if (currentIndex < PAGE_SEQUENCE.length - 1) navigateTo(PAGE_SEQUENCE[currentIndex + 1].key);
  };

  const currentEntry = currentIndex >= 0 ? PAGE_SEQUENCE[currentIndex] : null;

  let content;
  if (currentPageKey === 'dashboard') {
    content = <Dashboard navigateTo={navigateTo} progress={progress} />;
  } else if (currentEntry?.type === 'pattern') {
    content = <PatternPage patternId={currentEntry.pattern} navigateTo={navigateTo} progress={progress} />;
  } else if (currentEntry?.type === 'sub-pattern') {
    content = (
      <SubPatternPage
        subPattern={currentEntry.data}
        progress={progress}
        markComplete={markComplete}
        markInProgress={markInProgress}
      />
    );
  }

  return (
    <div className="app">
      <Header onHome={() => navigateTo('dashboard')} />
      <main className="app-main">{content}</main>
      {currentIndex >= 0 && (
        <PageNavigation
          currentIndex={currentIndex}
          totalPages={PAGE_SEQUENCE.length}
          onPrev={goPrev}
          onNext={goNext}
          pageLabel={currentEntry?.label}
        />
      )}
    </div>
  );
}