import React from 'react';

export default function DPVisualizer({ state }) {
  if (!state) return null;

  const { dp, currentIdx, prev1, prev2, row, col, str1, str2, action, found } = state;

  // Check if it's a 1D DP or 2D DP
  const is2D = Array.isArray(dp) && Array.isArray(dp[0]);

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* 1D DP DISPLAY (Climbing Stairs) */}
      {!is2D && dp && (
        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>1D DP Array</div>
          <div className="array-container">
            {dp.map((val, idx) => (
              <div key={idx} className="array-cell-wrap">
                <div className={`array-cell ${idx === currentIdx ? 'cell-target' : ''}`}>
                  {val}
                </div>
                
                {/* Show pointers for prev1 and prev2 */}
                <div className="pointer-stack">
                  {idx === prev1 && (
                    <div className="pointer-label ptr-left">
                      <span className="pointer-arrow">▲</span>
                      <span className="pointer-text">prev1</span>
                    </div>
                  )}
                  {idx === prev2 && (
                    <div className="pointer-label ptr-right">
                      <span className="pointer-arrow">▲</span>
                      <span className="pointer-text">prev2</span>
                    </div>
                  )}
                </div>
                <div className="array-index">{idx}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2D DP DISPLAY (Knapsack, LCS) */}
      {is2D && dp && (
        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', overflowX: 'auto' }}>
          
          {/* String labels for LCS */}
          {str1 && str2 && (
            <div style={{ marginBottom: '15px', fontSize: '1.1rem', fontWeight: 'bold', fontFamily: 'var(--font-code)' }}>
              <span style={{ color: 'var(--accent-blue)' }}>{str1}</span> vs <span style={{ color: 'var(--accent-pink)' }}>{str2}</span>
            </div>
          )}

          <div style={{ display: 'inline-grid', gap: '2px', background: '#CBD5E0', padding: '4px', borderRadius: '8px' }}>
            {dp.map((rowArr, rIdx) => (
              <div key={rIdx} style={{ display: 'flex', gap: '2px' }}>
                {rowArr.map((val, cIdx) => {
                  const isCurrent = rIdx === row && cIdx === col;
                  
                  return (
                    <div key={cIdx} style={{
                      width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isCurrent ? '#4299E1' : 'white', 
                      color: isCurrent ? 'white' : '#2D3748',
                      fontWeight: 'bold', fontSize: '0.75rem',
                      border: '1px solid #CBD5E0', borderRadius: '2px',
                      transition: 'all 0.3s'
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

      {/* State Panel */}
      <div className="state-panel" style={{ marginBottom: '20px' }}>
        {found && <div className="state-item state-found"><span>🎯</span><strong>DONE</strong></div>}
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