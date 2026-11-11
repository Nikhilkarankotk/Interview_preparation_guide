import React from 'react';
import { cheatSheetSections } from '../data/CheatSheet';
import { ArrowLeft } from 'lucide-react';

export default function CheatSheetPage({ navigateTo }) {
  return (
    <div className="cheat-sheet-page" style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '40px' }}>
      
      <header className="page-hero" style={{ marginBottom: '30px' }}>
        <h1 className="page-title">DSA Master Cheat Sheet</h1>
        <p className="page-subtitle">The ultimate quick-reference guide for interviews</p>
        
        <button 
          onClick={() => navigateTo('dashboard')} 
          className="btn-secondary" 
          style={{ marginTop: '15px' }}
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </button>
      </header>

      <div 
        className="cheat-sheet-grid" 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '20px' 
        }}
      >
        {cheatSheetSections.map((section, idx) => (
          <div key={idx} className={`content-card ${section.color}`} style={{ marginBottom: 0 }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', marginBottom: '15px' }}>
              <span style={{ fontSize: '1.3rem' }}>{section.icon}</span> {section.category}
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {section.items.map((item, i) => (
                <div 
                  key={i} 
                  style={{ 
                    background: 'white', 
                    padding: '12px', 
                    borderRadius: '8px', 
                    border: '1px solid var(--border-soft)' 
                  }}
                >
                  <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--main-text)', marginBottom: '4px' }}>
                    {item.title}
                  </strong>
                  <p style={{ fontSize: '0.75rem', color: '#4A5568', margin: 0, lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}