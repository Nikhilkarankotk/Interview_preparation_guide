import React, { useState, useMemo } from 'react';
import Dashboard from './pages/Dashboard';
import PatternPage from './pages/PatternPage';
import SubPatternPage from './pages/SubPatternPage';
import CheatSheetPage from './pages/CheatSheetPage'; // <-- New Import
import Header from './components/layout/Header';
import PageNavigation from './components/layout/PageNavigation';
import { useProgress } from './hooks/useProgress';

import { twoPointerSubPatterns } from './data/TwoPointers';
import { slidingWindowSubPatterns } from './data/SlidingWindow';
import { fastSlowSubPatterns } from './data/FastSlowPointers';
import { binarySearchSubPatterns } from './data/BinarySearch';
import { hashingSubPatterns } from './data/Hashing';
import { prefixSumSubPatterns } from './data/PrefixSum';
import { stackSubPatterns } from './data/Stack';
import { monotonicStackSubPatterns } from './data/MonotonicStack';
import { bfsSubPatterns } from './data/Bfs';
import { dfsSubPatterns } from './data/Dfs';
import { backtrackingSubPatterns } from './data/Backtracking';
import { heapSubPatterns } from './data/Heap';
import { greedySubPatterns } from './data/Greedy';
import { intervalsSubPatterns } from './data/Intervals';
import { linkedListsSubPatterns } from './data/LinkedLists';
import { dpSubPatterns } from './data/DynamicProgramming';
import { graphSubPatterns } from './data/Graphs';
import { topologicalSortSubPatterns } from './data/TopologicalSort';
import { unionFindSubPatterns } from './data/UnionFind';
import { trieSubPatterns } from './data/Trie';
import { sortingSubPatterns } from './data/Sorting';
import { recursionSubPatterns } from './data/Recursion';
import { bitManipulationSubPatterns } from './data/BitManipulation';
import { queueDequeSubPatterns } from './data/QueueDeque';
import { arraysSubPatterns } from './data/Arrays';
import { stringsSubPatterns } from './data/Strings';
import { advancedDSSubPatterns } from './data/AdvancedDS'; // <-- New Import

const PAGE_SEQUENCE = [
  { key: 'cheat-sheet', type: 'custom', label: 'Cheat Sheet' }, // <-- New Route
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

  { key: 'stack', type: 'pattern', label: 'Stack Overview', pattern: 'stack' },
  ...stackSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),

  { key: 'monotonic-stack', type: 'pattern', label: 'Monotonic Stack Overview', pattern: 'monotonic-stack' },
  ...monotonicStackSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),

  { key: 'bfs', type: 'pattern', label: 'BFS Overview', pattern: 'bfs' },
  ...bfsSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),

  { key: 'dfs', type: 'pattern', label: 'DFS Overview', pattern: 'dfs' },
  ...dfsSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),

  { key: 'backtracking', type: 'pattern', label: 'Backtracking Overview', pattern: 'backtracking' },
  ...backtrackingSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),

  { key: 'heap', type: 'pattern', label: 'Heap Overview', pattern: 'heap' },
  ...heapSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),

  { key: 'greedy', type: 'pattern', label: 'Greedy Overview', pattern: 'greedy' },
  ...greedySubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),

  { key: 'intervals', type: 'pattern', label: 'Intervals Overview', pattern: 'intervals' },
  ...intervalsSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),

  { key: 'linked-lists', type: 'pattern', label: 'Linked Lists Overview', pattern: 'linked-lists' },
  ...linkedListsSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),

  { key: 'dynamic-programming', type: 'pattern', label: 'DP Overview', pattern: 'dynamic-programming' },
  ...dpSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),

  { key: 'graphs', type: 'pattern', label: 'Graphs Overview', pattern: 'graphs' },
  ...graphSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),

  { key: 'topological-sort', type: 'pattern', label: 'Topological Sort Overview', pattern: 'topological-sort' },
  ...topologicalSortSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),

  { key: 'union-find', type: 'pattern', label: 'Union Find Overview', pattern: 'union-find' },
  ...unionFindSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),

  { key: 'trie', type: 'pattern', label: 'Trie Overview', pattern: 'trie' },
  ...trieSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),
  
  { key: 'sorting', type: 'pattern', label: 'Sorting Overview', pattern: 'sorting' },
  ...sortingSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),
  
  { key: 'recursion', type: 'pattern', label: 'Recursion Overview', pattern: 'recursion' },
  ...recursionSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),
  
  { key: 'bit-manipulation', type: 'pattern', label: 'Bit Manipulation Overview', pattern: 'bit-manipulation' },
  ...bitManipulationSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),
  
  { key: 'queue-deque', type: 'pattern', label: 'Queue & Deque Overview', pattern: 'queue-deque' },
  ...queueDequeSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),
  
  { key: 'arrays', type: 'pattern', label: 'Arrays Overview', pattern: 'arrays' },
  ...arraysSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),
  
  { key: 'strings', type: 'pattern', label: 'Strings Overview', pattern: 'strings' },
  ...stringsSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp })),

  { key: 'advanced-ds', type: 'pattern', label: 'Advanced Data Structures Overview', pattern: 'advanced-ds' },
  ...advancedDSSubPatterns.map(sp => ({ key: sp.id, type: 'sub-pattern', label: sp.title, data: sp }))
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
  } else if (currentPageKey === 'cheat-sheet') {
    content = <CheatSheetPage navigateTo={navigateTo} />; // <-- Handle the new route
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
      <Header onHome={() => navigateTo('dashboard')} navigateTo={navigateTo} />
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