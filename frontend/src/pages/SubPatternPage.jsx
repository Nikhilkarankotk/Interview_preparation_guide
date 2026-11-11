import React, { useEffect, useState } from 'react';
import { useStepNavigation } from '../hooks/useStepNavigation';
import { CheckCircle, Copy, AlertTriangle, RotateCcw, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

import TwoPointerVisualizer from '../components/visualizers/TwoPointerVisualizer';
import SlidingWindowVisualizer from '../components/visualizers/SlidingWindowVisualizer';
import FastSlowVisualizer from '../components/visualizers/FastSlowVisualizer';
import BinarySearchVisualizer from '../components/visualizers/BinarySearchVisualizer';
import PrefixSumVisualizer from '../components/visualizers/PrefixSumVisualizer';
import HashingVisualizer from '../components/visualizers/HashingVisualizer';
import StackVisualizer from '../components/visualizers/StackVisualizer';
import MonotonicStackVisualizer from '../components/visualizers/MonotonicStackVisualizer';
import BFSVisualizer from '../components/visualizers/BFSVisualizer';

export default function SubPatternPage({ subPattern, progress, markComplete, markInProgress }) {
  const steps = subPattern.steps || [];
  const nav = useStepNavigation(steps.length);
  const currentState = steps[nav.currentStep]?.state;

  useEffect(() => {
    markInProgress(subPattern.id);
  }, [subPattern.id, markInProgress]);

  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(subPattern.javaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const isComplete = progress[subPattern.id] === 'complete';

  // Dynamically render the correct visualizer based on the patternId
  const renderVisualizer = () => {
    switch (subPattern.patternId) {
      case 'two-pointers':
        return <TwoPointerVisualizer state={currentState} type={subPattern.type} />;
      case 'sliding-window':
        return <SlidingWindowVisualizer state={currentState} type={subPattern.type} />;
      case 'fast-slow':
        return <FastSlowVisualizer state={currentState} type={subPattern.type} />;
      case 'binary-search':
        return <BinarySearchVisualizer state={currentState} type={subPattern.type} />;
      case 'hashing':
        return <HashingVisualizer state={currentState} type={subPattern.type} />;
      case 'prefix-sum':
        return <PrefixSumVisualizer state={currentState} type={subPattern.type} />;
      case 'stack':
        return <StackVisualizer state={currentState} type={subPattern.type} />;
      case 'monotonic-stack':
        return <MonotonicStackVisualizer state={currentState} type={subPattern.type} />;
      case 'bfs':
        return <BFSVisualizer state={currentState} type={subPattern.type} />;
      default:
        return <TwoPointerVisualizer state={currentState} type={subPattern.type} />;
    }
  };

  return (
    <div className="sub-pattern-page">
      <header className="page-hero">
        <h1 className="page-title">{subPattern.title}</h1>
        <p className="page-subtitle">{subPattern.subtitle}</p>
        <span className="difficulty-badge">{subPattern.difficulty}</span>
      </header>

      <section className="content-card card-yellow">
        <h2>🎯 Core Concept</h2>
        <p><strong>What:</strong> {subPattern.coreConcept.what}</p>
        <p><strong>Why:</strong> {subPattern.coreConcept.why}</p>
        <p><strong>When:</strong> {subPattern.coreConcept.when}</p>
        <p><strong>Properties:</strong></p>
        <ul>{subPattern.coreConcept.properties?.map((p, i) => <li key={i}>{p}</li>)}</ul>
      </section>

      <section className="content-card card-blue">
        <h2>🔍 Pattern Recognition</h2>
        <div className="recognition-row">
          <div>
            <strong>Clues</strong>
            <ul>{subPattern.patternRecognition.clues?.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </div>
          <div>
            <strong>Inputs</strong>
            <ul>{subPattern.patternRecognition.inputs?.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </div>
          <div>
            <strong>Constraints</strong>
            <ul>{subPattern.patternRecognition.constraints?.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="content-card card-green interactive-card">
        <h2>👣 Step-by-Step Intuition</h2>
        <div className="step-header">
          <span>Step {nav.currentStep + 1} of {nav.totalSteps}</span>
          <div className="step-progress-bar">
            <div className="step-progress-fill" style={{ width: `${((nav.currentStep + 1) / nav.totalSteps) * 100}%` }} />
          </div>
        </div>
        <div className="step-body">
          <h3 className="step-title">{steps[nav.currentStep]?.title}</h3>
          <p className="step-explanation">{steps[nav.currentStep]?.explanation}</p>
          
          {/* Render the appropriate visualizer */}
          {renderVisualizer()}
          
        </div>
        <div className="step-controls">
          <button className="btn-secondary" onClick={nav.prev} disabled={!nav.canGoPrev}>
            <ChevronLeft size={14} /> Previous Step
          </button>
          <button className="btn-secondary" onClick={nav.reset}>
            <RotateCcw size={14} /> Reset
          </button>
          <button className="btn-primary" onClick={nav.next} disabled={!nav.canGoNext}>
            Next Step <ChevronRight size={14} />
          </button>
        </div>
      </section>

      <section className="content-card">
        <h2>💻 Java Implementation</h2>
        <div className="code-block-wrapper">
          <div className="code-block-header">
            <span className="lang-tag">Java</span>
            <button className="btn-copy" onClick={handleCopy}>
              {copied ? <><CheckCircle size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
            </button>
          </div>
          <pre className="java-code"><code>{subPattern.javaCode}</code></pre>
        </div>
      </section>

      <section className="content-card card-purple">
        <h2>📖 Line-by-Line Explanation</h2>
        <div className="line-explanations">
          {subPattern.javaExplanation?.map((l, i) => (
            <div key={i} className="line-item">
              <code>{l.line}</code>
              <span>{l.note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="content-card card-teal">
        <h2>⏱️ Complexity Analysis</h2>
        <div className="complexity-grid">
          <div className="complexity-item"><label>Time</label><strong>{subPattern.complexity.time}</strong></div>
          <div className="complexity-item"><label>Space</label><strong>{subPattern.complexity.space}</strong></div>
          <div className="complexity-item"><label>Auxiliary</label><strong>{subPattern.complexity.aux}</strong></div>
        </div>
        <p className="complexity-note">{subPattern.complexity.explanation}</p>
      </section>

      <section className="content-card card-orange">
        <h2>⚖️ Brute Force vs Optimal</h2>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Approach</th>
              <th>Time</th>
              <th>Space</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Optimal</td>
              <td><code>{subPattern.complexity.time}</code></td>
              <td><code>{subPattern.complexity.space}</code></td>
              <td>Primary Pattern</td>
            </tr>
            <tr>
              <td>Brute Force</td>
              <td><code>{subPattern.bruteForce.time}</code></td>
              <td><code>{subPattern.bruteForce.space}</code></td>
              <td>{subPattern.bruteForce.note}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="content-card card-red">
        <h2>⚠️ Common Mistakes</h2>
        <div className="mistake-list">
          {subPattern.commonMistakes?.map((m, i) => (
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
          {subPattern.interviewQuestions?.map((q, i) => (
            <a key={i} href={q.url} target="_blank" rel="noopener noreferrer" className="question-row">
              <span className={`level-badge level-${q.level.toLowerCase()}`}>{q.level}</span>
              <span>{q.title}</span>
              <ArrowRight size={14} />
            </a>
          ))}
        </div>
      </section>

      <section className="content-card card-yellow quick-revision">
        <h2>⚡ 30-Second Revision</h2>
        <ul className="revision-list">
          {subPattern.quickRevision?.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </section>

      <div className="completion-row">
        <button
          className={`btn-complete ${isComplete ? 'complete' : ''}`}
          onClick={() => markComplete(subPattern.id)}
          disabled={isComplete}
        >
          <CheckCircle size={14} /> {isComplete ? 'Completed' : 'Mark as Complete'}
        </button>
      </div>
    </div>
  );
}