import React from 'react';

export default function TrieVisualizer({ state }) {
  if (!state) return null;

  const { word, path, isEnd, action, found } = state;

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Word Display */}
      {word && (
        <div style={{ marginBottom: '20px', fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'var(--font-code)' }}>
          Target: <span style={{ color: 'var(--accent-blue)' }}>"{word}"</span>
        </div>
      )}

      {/* Path Display */}
      {path && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', color: 'var(--accent-purple)', marginBottom: '15px' }}>Trie Path</div>
          <div style={{ 
            display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center',
            padding: '15px', background: '#FAF5FF', border: '2px dashed #D6BCFA', borderRadius: '8px'
          }}>
            {path.map((char, idx) => (
              <React.Fragment key={idx}>
                <div style={{
                  padding: '8px 16px', background: 'white', border: '2px solid #805AD5',
                  borderRadius: '8px', fontWeight: 'bold', fontFamily: 'var(--font-code)',
                  color: '#553C9A', fontSize: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  {char}
                </div>
                {idx < path.length - 1 && <span style={{ color: '#A0AEC0', fontWeight: 'bold', fontSize: '1.2rem' }}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* State Panel */}
      <div className="state-panel" style={{ marginBottom: '20px' }}>
        {isEnd !== undefined && (
          <div className={`state-item ${isEnd ? 'state-found' : ''}`}>
            <span>Is End of Word?</span>
            <strong>{isEnd ? 'TRUE' : 'FALSE'}</strong>
          </div>
        )}
        {found !== undefined && (
          <div className={`state-item ${found ? 'state-found' : ''}`}>
            <span>Result</span>
            <strong>{found ? 'FOUND' : 'NOT FOUND'}</strong>
          </div>
        )}
      </div>

      {/* Action Message */}
      {action && (
        <div className={`action-pill ${found ? 'action-found' : ''}`} style={{ display: 'block', textAlign: 'center', margin: '0 auto' }}>
          {action}
        </div>
      )}
    </div>
  );
}