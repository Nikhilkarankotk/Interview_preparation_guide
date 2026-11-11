import React from 'react';

export default function StringsVisualizer({ state }) {
  if (!state) return null;

  const { str, left, right, read, write, counts, str1, str2, action, found } = state;

  // Helper to render string as an array of characters
  const renderStringArray = (text, l = null, r = null, rd = null, wr = null) => {
    const chars = text.split('');
    return (
      <div className="array-container" style={{ marginBottom: '30px' }}>
        {chars.map((char, idx) => {
          let cellClass = 'array-cell';
          if (idx === l) cellClass += ' cell-left';
          if (idx === r) cellClass += ' cell-right';
          if (idx === rd) cellClass += ' cell-target';
          if (idx === wr) cellClass += ' cell-window';
          if (char === ' ') cellClass += ' cell-discarded';

          return (
            <div key={idx} className="array-cell-wrap">
              <div className={cellClass} style={{ padding: '0 8px', minWidth: '30px' }}>
                {char === ' ' ? '␣' : char}
              </div>
              
              <div className="pointer-stack">
                {idx === l && <div className="pointer-label ptr-left"><span className="pointer-arrow">▲</span><span className="pointer-text">L</span></div>}
                {idx === r && <div className="pointer-label ptr-right"><span className="pointer-arrow">▲</span><span className="pointer-text">R</span></div>}
                {idx === rd && <div className="pointer-label" style={{ color: 'var(--accent-blue)' }}><span className="pointer-arrow" style={{ color: 'var(--accent-blue)' }}>▲</span><span className="pointer-text" style={{ color: 'var(--accent-blue)' }}>Read</span></div>}
                {idx === wr && <div className="pointer-label" style={{ color: 'var(--accent-green)' }}><span className="pointer-arrow" style={{ color: 'var(--accent-green)' }}>▲</span><span className="pointer-text" style={{ color: 'var(--accent-green)' }}>Write</span></div>}
              </div>
              <div className="array-index">{idx}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Palindrome Display */}
      {str && !read && (
        <>
          <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>String</div>
          {renderStringArray(str, left, right)}
        </>
      )}

      {/* Compression Display */}
      {str && read !== undefined && (
        <>
          <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>In-Place Modification</div>
          {renderStringArray(str, null, null, read, write)}
        </>
      )}

      {/* Anagram Display */}
      {str1 && str2 && counts && (
        <div style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
             <div>String 1: <strong>{str1}</strong></div>
             <div>String 2: <strong>{str2}</strong></div>
          </div>
          
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Frequency Map</div>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {counts.map((count, idx) => {
              const char = String.fromCharCode(97 + idx);
              return (
                <div key={idx} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  padding: '8px', background: count !== 0 ? '#EBF8FF' : 'white', 
                  border: count !== 0 ? '2px solid #4299E1' : '1px solid #CBD5E0', borderRadius: '4px'
                }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{char}</span>
                  <span style={{ fontSize: '1rem', color: count !== 0 ? 'var(--accent-blue)' : '#A0AEC0' }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Message */}
      {action && (
        <div className={`action-pill ${found ? 'action-found' : ''}`} style={{ display: 'block', textAlign: 'center', margin: '0 auto' }}>
          {action}
        </div>
      )}
    </div>
  );
}