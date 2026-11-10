import React from 'react';
import { Home } from 'lucide-react';

export default function Header({ onHome }) {
  return (
    <header className="app-header">
      <div className="header-inner">
        <button className="header-home" onClick={onHome}>
          <Home size={16} /> DSA Masterclass
        </button>
        <span className="header-badge">Two Pointers Module</span>
      </div>
    </header>
  );
}