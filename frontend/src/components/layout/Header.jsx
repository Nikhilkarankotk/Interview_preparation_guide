import React from 'react';
import { Home, BookOpen } from 'lucide-react';

export default function Header({ onHome, navigateTo }) {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button className="header-home" onClick={onHome}>
            <Home size={16} /> DSA Masterclass
          </button>
          
          <button 
            className="header-home" 
            onClick={() => navigateTo('cheat-sheet')}
            style={{ color: 'var(--accent-pink)' }}
          >
            <BookOpen size={16} /> Cheat Sheet
          </button>
        </div>
        
        <span className="header-badge">Interview Prep</span>
      </div>
    </header>
  );
}