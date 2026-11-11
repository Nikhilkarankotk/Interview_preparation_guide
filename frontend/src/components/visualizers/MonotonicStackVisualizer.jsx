import React from 'react';

export default function MonotonicStackVisualizer({ state }) {
  if (!state) return null;

  const { array, currentIdx, stack, result, maxArea, action, found } = state;

  // Safeguard in case a step is missing the array
  if (!array) return null;

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Array Visualization */}
      <div className="array-container" style={{ marginBottom: '30px' }}>
        {array.map((val, idx) => {
          let cellClass = 'array-cell';
          if (idx === currentIdx) cellClass += ' cell-target';
          if (stack && stack.includes(idx)) cellClass += ' cell-left'; // Highlight elements in stack

          return (
            <div key={idx} className="array-cell-wrap">
              <div className={cellClass}>{val}</div>
              {idx === currentIdx && (
                <div className="pointer-stack">
                  <div className="pointer-label" style={{ color: 'var(--accent-blue)' }}>
                    <span className="pointer-arrow" style={{ color: 'var(--accent-blue)' }}>▲</span>
                    <span className="pointer-text" style={{ color: 'var(--accent-blue)' }}>Curr</span>
                  </div>
                </div>
              )}
              <div className="array-index">{idx}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '40px', marginBottom: '20px', alignItems: 'flex-start', width: '100%', justifyContent: 'center' }}>
        
        {/* Stack Display */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Monotonic Stack</div>
          <div style={{ 
            display: 'flex', flexDirection: 'column-reverse', 
            borderBottom: '3px solid #805AD5', borderLeft: '3px solid #805AD5', borderRight: '3px solid #805AD5',
            borderRadius: '0 0 8px 8px', padding: '5px', minHeight: '50px', minWidth: '60px', gap: '4px', background: '#FAF5FF'
          }}>
            {!stack || stack.length === 0 ? (
              <div style={{ fontSize: '0.8rem', color: '#A0AEC0', padding: '10px' }}>Empty</div>
            ) : (
              stack.map((idx, i) => (
                <div key={i} style={{
                  padding: '6px 12px', background: 'white', border: '2px solid #D6BCFA', borderRadius: '4px',
                  fontWeight: 'bold', textAlign: 'center', fontFamily: 'var(--font-code)', color: '#553C9A'
                }}>
                  {array[idx]} <span style={{ fontSize: '0.7rem', color: '#A0AEC0' }}>({idx})</span>
                </div>
              ))
            )}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#718096', marginTop: '5px' }}>↑ Top</div>
        </div>

        {/* Result Display */}
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '10px', color: 'var(--accent-green)' }}>Result Array</div>
            <div style={{ display: 'flex', gap: '5px' }}>
              {result.map((val, idx) => (
                <div key={idx} style={{
                  width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#F0FFF4', border: '2px solid #9AE6B4', borderRadius: '4px',
                  fontWeight: 'bold', fontFamily: 'var(--font-code)', color: '#22543D', fontSize: '0.8rem'
                }}>
                  {val === undefined ? '?' : val === null ? '-' : val}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* State Panel */}
      {maxArea !== undefined && (
        <div className="state-panel">
          <div className="state-item state-found">
            <span>Max Area</span>
            <strong>{maxArea}</strong>
          </div>
        </div>
      )}

      {/* Action Message */}
      {action && (
        <div className={`action-pill ${found ? 'action-found' : ''}`} style={{ display: 'block', textAlign: 'center', margin: '10px auto 0' }}>
          {action}
        </div>
      )}
    </div>
  );
}