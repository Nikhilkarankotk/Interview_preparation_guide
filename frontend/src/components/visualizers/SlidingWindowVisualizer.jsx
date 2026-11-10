import React from 'react';

export default function SlidingWindowVisualizer({ state, type }) {
  if (!state) return null;

  const { 
    array, string, left, right, k, highlighted = {}, 
    windowSum, maxSum, minLen, sum, target, 
    windowStr, windowMap, deque, windowMax, action, found 
  } = state;

  // Handle both arrays and strings safely
  const displayArray = array || (string ? string.split('') : []);

  return (
    <div className="two-ptr-visualizer">
      {/* Top Panel for String / Extra State */}
      <div style={{ textAlign: 'center', marginBottom: '15px', minHeight: '30px' }}>
        {windowStr && <strong style={{ fontSize: '1.2rem', color: 'var(--accent-blue)' }}>Current Window: "{windowStr}"</strong>}
        {deque && <strong style={{ fontSize: '1.2rem', color: 'var(--accent-pink)' }}>Deque (Indices): [{deque.join(', ')}]</strong>}
      </div>

      {/* Array Visualization */}
      <div className="array-container">
        {displayArray.map((val, idx) => {
          // Determine if this index is inside the active window
          const inWindow = left !== undefined && right !== undefined && idx >= left && idx <= right;
          
          let cellClass = 'array-cell';
          if (inWindow) cellClass += ' cell-window'; // Green highlight for active window
          if (highlighted[idx]) cellClass += ` cell-${highlighted[idx]}`;

          return (
            <div key={idx} className="array-cell-wrap">
              <div className={cellClass}>
                {val}
              </div>
              
              {/* Pointer Labels */}
              <div className="pointer-stack">
                {idx === left && (
                  <div className="pointer-label ptr-left">
                    <span className="pointer-arrow">▲</span>
                    <span className="pointer-text">L</span>
                  </div>
                )}
                {idx === right && (
                  <div className="pointer-label ptr-right">
                    <span className="pointer-arrow">▲</span>
                    <span className="pointer-text">R</span>
                  </div>
                )}
              </div>
              <div className="array-index">{idx}</div>
            </div>
          );
        })}
      </div>

      {/* State Panel */}
      <div className="state-panel">
        {k && <div className="state-item"><span>Window Size</span><strong>{k}</strong></div>}
        
        {windowSum !== undefined && (
          <div className="state-item">
            <span>Window Sum</span>
            <strong>{windowSum}</strong>
          </div>
        )}
        
        {maxSum !== undefined && (
          <div className="state-item">
            <span>Max Sum</span>
            <strong>{maxSum}</strong>
          </div>
        )}

        {sum !== undefined && (
          <div className="state-item">
            <span>Current Sum</span>
            <strong>{sum}</strong>
          </div>
        )}

        {target !== undefined && (
          <div className="state-item">
            <span>Target</span>
            <strong>{target}</strong>
          </div>
        )}

        {minLen !== undefined && (
          <div className="state-item">
            <span>Min Length</span>
            <strong>{minLen === Infinity ? '∞' : minLen}</strong>
          </div>
        )}

        {windowMax !== undefined && (
          <div className="state-item">
            <span>Window Max</span>
            <strong>{windowMax}</strong>
          </div>
        )}

        {found && (
          <div className="state-item state-found">
            <span>🎯</span>
            <strong>DONE</strong>
          </div>
        )}
      </div>

      {/* Action Message */}
      {action && (
        <div className={`action-pill ${found ? 'action-found' : ''}`} style={{ display: 'block', textAlign: 'center', margin: '15px auto 0' }}>
          {action}
        </div>
      )}
    </div>
  );
}