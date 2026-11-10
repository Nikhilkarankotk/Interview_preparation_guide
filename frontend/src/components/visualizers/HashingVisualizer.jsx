import React from 'react';

export default function HashingVisualizer({ state }) {
  if (!state) return null;

  const { array, target, map, currentIdx, string1, string2, phase, action, found } = state;

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px' }}>
      
      {/* Array or String Display */}
      {array && (
        <div className="array-container">
          {array.map((val, idx) => {
            let cellClass = 'array-cell';
            if (idx === currentIdx) cellClass += ' cell-target';

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
      )}

      {/* String Display */}
      {string1 && string2 && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
            String 1: <strong>{string1}</strong>
          </div>
          <div style={{ fontSize: '1.2rem' }}>
            String 2: <strong>{string2}</strong>
          </div>
        </div>
      )}

      {/* State Panel */}
      <div className="state-panel">
        {target !== undefined && (
          <div className="state-item">
            <span>Target</span>
            <strong>{target}</strong>
          </div>
        )}
        {found && (
          <div className="state-item state-found">
            <span>🎯</span>
            <strong>FOUND</strong>
          </div>
        )}
      </div>

      {/* Map Visualizer */}
      {map && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--accent-purple)', width: '100%', textAlign: 'center' }}>
            Hash Map
          </div>
          {Object.entries(map).length === 0 ? (
            <div style={{ fontStyle: 'italic', color: '#718096' }}>Empty</div>
          ) : (
            Object.entries(map).map(([key, val]) => (
              <div key={key} className="state-item" style={{ padding: '5px 15px', background: '#F0FFF4', borderColor: 'var(--accent-green)' }}>
                <span style={{ color: '#718096' }}>Key: {key}</span>
                <strong style={{ color: 'var(--accent-green)' }}>Val: {val}</strong>
              </div>
            ))
          )}
        </div>
      )}

      {/* Action Message */}
      {action && (
        <div className={`action-pill ${found ? 'action-found' : ''}`} style={{ display: 'block', textAlign: 'center', margin: '20px auto 0' }}>
          {action}
        </div>
      )}
    </div>
  );
}