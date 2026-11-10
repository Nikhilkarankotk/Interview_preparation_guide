import React from 'react';
import { patterns } from '../data/patterns';
import { CheckCircle, Lock, ArrowRight } from 'lucide-react';

export default function Dashboard({ navigateTo, progress }) {
  return (
    <div className="dashboard">
      <header className="hero">
        <h1 className="hero-title">DSA Masterclass</h1>
        <p className="hero-subtitle">Step through every algorithm. Watch every pointer. Understand every WHY.</p>
      </header>

      <div className="pattern-grid">
        {patterns.map(p => {
          const subCompleted = p.subPatterns?.filter(id => progress[id] === 'complete').length || 0;
          const subTotal = p.subPatterns?.length || p.subPatternCount || 1;
          const pct = Math.round((subCompleted / subTotal) * 100);

          return (
            <div key={p.id} className={`pattern-card ${p.available ? '' : 'pattern-card-locked'}`}>
              <div className="pattern-card-header">
                <h3>{p.name}</h3>
                {!p.available && <Lock size={16} className="lock-icon" />}
                {p.available && pct === 100 && <CheckCircle size={16} className="check-icon" />}
              </div>
              <p className="pattern-desc">{p.description}</p>
              <div className="pattern-stats">
                <span className="stat">{p.subPatternCount} sub-patterns</span>
                <span className="stat">{p.problemCount} problems</span>
                <span className="stat difficulty">{p.difficulty}</span>
              </div>
              <div className="progress-bar-mini">
                <div className="progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <button
                className={`btn-primary ${!p.available ? 'btn-disabled' : ''}`}
                onClick={() => p.available && navigateTo(p.id)}
                disabled={!p.available}
              >
                {p.available ? 'Start Learning' : 'Coming Soon'}
                {p.available && <ArrowRight size={14} />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}