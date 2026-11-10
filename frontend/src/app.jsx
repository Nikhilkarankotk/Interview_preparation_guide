import React, { useState, useMemo } from 'react';
import Dashboard from './pages/Dashboard';
import PatternPage from './pages/PatternPage';
import SubPatternPage from './pages/SubPatternPage';
import Header from './components/layout/Header';
import PageNavigation from './components/layout/PageNavigation';
import { useProgress } from './hooks/useProgress';
import { twoPointerSubPatterns } from './data/twoPointers';

// Full page sequence for the Two Pointers module
const PAGE_SEQUENCE = [
  { key: 'two-pointers', type: 'pattern', label: 'Two Pointers Overview' },
  ...twoPointerSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),
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
    content = <PatternPage navigateTo={navigateTo} progress={progress} />;
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