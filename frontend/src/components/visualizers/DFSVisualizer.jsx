import React from 'react';

export default function DFSVisualizer({ state }) {
  if (!state) return null;

  const { tree, grid, currentVal, row, col, remaining, path, islands, action, found } = state;

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* 1. TREE ARRAY DISPLAY */}
      {tree && (
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>Tree Array</div>
          <div className="array-container">
            {tree.map((val, idx) => (
              <div key={idx} className="array-cell-wrap">
                <div className={`array-cell ${val === currentVal ? 'cell-target' : ''}`}>
                  {val === null ? 'null' : val}
                </div>
                <div className="array-index">{idx}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. GRID DISPLAY */}
      {grid && (
        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Grid Matrix</div>
          <div style={{ display: 'inline-grid', gap: '4px', background: '#CBD5E0', padding: '4px', borderRadius: '8px' }}>
            {grid.map((rowArr, rIdx) => (
              <div key={rIdx} style={{ display: 'flex', gap: '4px' }}>
                {rowArr.map((val, cIdx) => {
                  const isCurrent = rIdx === row && cIdx === col;
                  
                  let bg = val === 1 ? '#FEEBC8' : '#EDF2F7'; 
                  let color = val === 1 ? '#C05621' : '#A0AEC0';

                  if (isCurrent) { 
                    bg = '#4299E1'; color = 'white'; 
                  }

                  return (
                    <div key={cIdx} style={{
                      width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: bg, color: color, fontWeight: 'bold', borderRadius: '4px',
                      border: isCurrent ? '2px solid #2B6CB0' : '1px solid #CBD5E0',
                      fontSize: '0.9rem', transition: 'all 0.3s'
                    }}>
                      {val}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. STATE PANEL */}
      <div className="state-panel" style={{ marginBottom: '20px' }}>
        {remaining !== undefined && <div className="state-item"><span>Remaining Sum</span><strong>{remaining}</strong></div>}
        {islands !== undefined && <div className="state-item"><span>Islands Found</span><strong>{islands}</strong></div>}
        {found && <div className="state-item state-found"><span>🎯</span><strong>FOUND</strong></div>}
      </div>

      {/* 4. PATH DISPLAY */}
      {path && path.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', color: 'var(--accent-purple)', marginBottom: '10px' }}>Current Path</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {path.map((val, idx) => (
              <div key={idx} style={{
                padding: '6px 12px', background: '#FAF5FF', border: '2px solid #D6BCFA', 
                borderRadius: '4px', fontWeight: 'bold', fontFamily: 'var(--font-code)',
                color: '#553C9A', fontSize: '0.85rem'
              }}>
                {val}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACTION MESSAGE */}
      {action && (
        <div className={`action-pill ${found ? 'action-found' : ''}`} style={{ display: 'block', textAlign: 'center', margin: '0 auto' }}>
          {action}
        </div>
      )}
    </div>
  );
}