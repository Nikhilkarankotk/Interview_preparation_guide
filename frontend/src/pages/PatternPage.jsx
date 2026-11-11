import React from 'react';
import { ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

import { twoPointerOverview, twoPointerSubPatterns } from '../data/TwoPointers';
import { slidingWindowOverview, slidingWindowSubPatterns } from '../data/SlidingWindow';
import { fastSlowOverview, fastSlowSubPatterns } from '../data/FastSlowPointers';
import { binarySearchOverview, binarySearchSubPatterns } from '../data/BinarySearch';
import { hashingOverview, hashingSubPatterns } from '../data/Hashing';
import { prefixSumOverview, prefixSumSubPatterns } from '../data/PrefixSum';
import { stackOverview, stackSubPatterns } from '../data/Stack';
import { monotonicStackOverview, monotonicStackSubPatterns } from '../data/MonotonicStack';
import { bfsOverview, bfsSubPatterns } from '../data/Bfs';
import { dfsOverview, dfsSubPatterns } from '../data/Dfs';
import { backtrackingOverview, backtrackingSubPatterns } from '../data/Backtracking'; 
import { heapOverview, heapSubPatterns } from '../data/Heap'; 
import { greedyOverview, greedySubPatterns } from '../data/Greedy';
import { intervalsOverview, intervalsSubPatterns } from '../data/Intervals';
import { linkedListsOverview, linkedListsSubPatterns } from '../data/LinkedLists'; 
import { dpOverview, dpSubPatterns } from '../data/DynamicProgramming'; 
import { graphOverview, graphSubPatterns } from '../data/Graphs';
import { topologicalSortOverview, topologicalSortSubPatterns } from '../data/TopologicalSort';
import { unionFindOverview, unionFindSubPatterns } from '../data/UnionFind';
import { trieOverview, trieSubPatterns } from '../data/Trie';
import { sortingOverview, sortingSubPatterns } from '../data/Sorting';
import { recursionOverview, recursionSubPatterns } from '../data/Recursion';
import { bitManipulationOverview, bitManipulationSubPatterns } from '../data/BitManipulation';
import { queueDequeOverview, queueDequeSubPatterns } from '../data/QueueDeque';
import { arraysOverview, arraysSubPatterns } from '../data/Arrays'; // <-- New Import
import { stringsOverview, stringsSubPatterns } from '../data/Strings';
import { advancedDSOverview, advancedDSSubPatterns } from '../data/AdvancedDS'; // <-- New Import

export default function PatternPage({ patternId, navigateTo, progress }) {
  let overview, subPatterns;

  switch (patternId) {
    case 'two-pointers':
      overview = twoPointerOverview;
      subPatterns = twoPointerSubPatterns;
      break;
    case 'sliding-window':
      overview = slidingWindowOverview;
      subPatterns = slidingWindowSubPatterns;
      break;
    case 'fast-slow':
      overview = fastSlowOverview;
      subPatterns = fastSlowSubPatterns;
      break;
    case 'binary-search':
      overview = binarySearchOverview;
      subPatterns = binarySearchSubPatterns;
      break;
    case 'hashing':
      overview = hashingOverview;
      subPatterns = hashingSubPatterns;
      break;
    case 'prefix-sum':
      overview = prefixSumOverview;
      subPatterns = prefixSumSubPatterns;
      break;
    case 'stack':
      overview = stackOverview;
      subPatterns = stackSubPatterns;
      break;
    case 'monotonic-stack': 
      overview = monotonicStackOverview;
      subPatterns = monotonicStackSubPatterns;
      break;
    case 'bfs':
      overview = bfsOverview; subPatterns = bfsSubPatterns; break;
    case 'dfs': 
      overview = dfsOverview; subPatterns = dfsSubPatterns; break;
    case 'backtracking': 
      overview = backtrackingOverview; subPatterns = backtrackingSubPatterns; break;  
    case 'heap': overview = heapOverview; subPatterns = heapSubPatterns; break;
    case 'greedy': overview = greedyOverview;subPatterns = greedySubPatterns; break;
    case 'intervals': overview = intervalsOverview; subPatterns = intervalsSubPatterns; break;
    case 'linked-lists': overview = linkedListsOverview; subPatterns = linkedListsSubPatterns; break;
    case 'dynamic-programming': overview = dpOverview; subPatterns = dpSubPatterns; break;
    case 'graphs': overview = graphOverview; subPatterns = graphSubPatterns; break;
    case 'topological-sort': overview = topologicalSortOverview; subPatterns = topologicalSortSubPatterns; break;
    case 'union-find': overview = unionFindOverview; subPatterns = unionFindSubPatterns; break;
    case 'trie': overview = trieOverview; subPatterns = trieSubPatterns; break;
    case 'sorting': overview = sortingOverview; subPatterns = sortingSubPatterns; break;
    case 'recursion': overview = recursionOverview; subPatterns = recursionSubPatterns; break;
    case 'bit-manipulation': overview = bitManipulationOverview; subPatterns = bitManipulationSubPatterns; break;
    case 'queue-deque': overview = queueDequeOverview; subPatterns = queueDequeSubPatterns; break;
    case 'arrays': overview = arraysOverview; subPatterns = arraysSubPatterns; break;
    case 'strings': overview = stringsOverview; subPatterns = stringsSubPatterns; break;
    case 'advanced-ds': overview = advancedDSOverview; subPatterns = advancedDSSubPatterns; break;
    default:
      return <div style={{ padding: '20px', textAlign: 'center' }}>Pattern not found.</div>;
  }

  return (
    <div className="pattern-page">
      <header className="page-hero">
        <h1 className="page-title">{overview.title}</h1>
        <p className="page-subtitle">{overview.subtitle}</p>
      </header>

      <section className="content-card card-yellow">
        <h2>🎯 Introduction</h2>
        <p>{overview.introduction}</p>
      </section>

      <div className="two-col">
        <section className="content-card card-blue">
          <h2>💡 Core Concept</h2>
          <p><strong>What:</strong> {overview.coreConcept.what}</p>
          <p><strong>Why:</strong> {overview.coreConcept.why}</p>
          <p><strong>When:</strong> {overview.coreConcept.when}</p>
        </section>

        <section className="content-card card-green">
          <h2>✅ When to Use</h2>
          <ul>{overview.whenToUse?.map((w, i) => <li key={i}>{w}</li>)}</ul>
        </section>
      </div>

      <section className="content-card card-purple">
        <h2>🔍 Recognition Clues</h2>
        <div className="clue-chips">
          {overview.recognitionClues?.map((c, i) => <span key={i} className="chip">{c}</span>)}
        </div>
      </section>

      <section className="content-card card-teal">
        <h2>📌 Important Properties</h2>
        <ul>{overview.importantProperties?.map((p, i) => <li key={i}>{p}</li>)}</ul>
      </section>

      <section className="content-card">
        <h2>🧩 Sub-patterns</h2>
        <div className="sub-pattern-grid">
          {subPatterns?.map(sp => {
            const status = progress[sp.id] || 'not-started';
            return (
              <div key={sp.id} className="sub-pattern-card" onClick={() => navigateTo(sp.id)}>
                <div className="sub-pattern-header">
                  <h3>{sp.title}</h3>
                  {status === 'complete' && <CheckCircle size={16} className="check-icon" />}
                </div>
                <p className="sub-pattern-subtitle">{sp.subtitle}</p>
                <div className="sub-pattern-footer">
                  <span className={`status-pill status-${status}`}>{status}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="content-card card-pink">
        <h2>⚖️ Pattern Comparison</h2>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Sub-pattern</th>
              <th>When</th>
              <th>Time</th>
              <th>Space</th>
            </tr>
          </thead>
          <tbody>
            {overview.comparison?.map((row, i) => (
              <tr key={i}>
                <td><strong>{row.aspect}</strong></td>
                <td>{row.when}</td>
                <td><code>{row.time}</code></td>
                <td><code>{row.space}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="content-card card-red">
        <h2>⚠️ Common Mistakes</h2>
        <div className="mistake-list">
          {overview.commonMistakes?.map((m, i) => (
            <div key={i} className="mistake-item">
              <AlertTriangle size={14} />
              <div><strong>{m.title}</strong> — {m.detail}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="content-card">
        <h2>🎤 Interview Questions</h2>
        <div className="question-list">
          {overview.interviewQuestions?.map((q, i) => (
            <a key={i} href={q.url} target="_blank" rel="noopener noreferrer" className="question-row">
              <span className={`level-badge level-${q.level.toLowerCase()}`}>{q.level}</span>
              <span>{q.title}</span>
              <ArrowRight size={14} />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}