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
import { dfsOverview, dfsSubPatterns } from '../data/Dfs'; // <-- Added DFS
import { backtrackingOverview, backtrackingSubPatterns } from '../data/Backtracking'; // <-- New Import

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
    case 'monotonic-stack': // <-- New Case
      overview = monotonicStackOverview;
      subPatterns = monotonicStackSubPatterns;
      break;
    case 'bfs':
      overview = bfsOverview; subPatterns = bfsSubPatterns; break;
    case 'dfs': // <-- Added DFS Case
      overview = dfsOverview; subPatterns = dfsSubPatterns; break;
    case 'backtracking': // <-- New Case
      overview = backtrackingOverview; subPatterns = backtrackingSubPatterns; break;  
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