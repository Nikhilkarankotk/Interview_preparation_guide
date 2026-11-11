import React from 'react';

export default function ArrayVisualizer({ state }) {
  if (!state) return null;

  const { array, currentIdx, maxIdx, currSum, maxSum, left, right, k, action, found } = state;

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Array Visualization */}
      <div className="array-container" style={{ marginBottom: '30px' }}>
        {array && array.map((val, idx) => {
          let cellClass = 'array-cell';
          if (idx === currentIdx) cellClass += ' cell-target';
          if (idx === maxIdx) cellClass += ' cell-match';
          if (idx >= left && idx <= right) cellClass += ' cell-window';

          return (
            <div key={idx} className="array-cell-wrap">
              <div className={cellClass}>{val}</div>
              
              {/* Pointer Labels */}
              <div className="pointer-stack">
                {idx === currentIdx && (
                  <div className="pointer-label ptr-left">
                    <span className="pointer-arrow">▲</span>
                    <span className="pointer-text">Curr</span>
                  </div>
                )}
                {idx === left && (
                  <div className="pointer-label ptr-left" style={{ color: 'var(--accent-green)' }}>
                    <span className="pointer-arrow" style={{ color: 'var(--accent-green)' }}>▲</span>
                    <span className="pointer-text" style={{ color: 'var(--accent-green)' }}>L</span>
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
      <div className="state-panel" style={{ marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {currSum !== undefined && (
          <div className="state-item">
            <span>Current Sum</span>
            <strong>{currSum}</strong>
          </div>
        )}
        {maxSum !== undefined && (
          <div className="state-item state-found">
            <span>Max Sum</span>
            <strong>{maxSum}</strong>
          </div>
        )}
        {k !== undefined && (
          <div className="state-item">
            <span>K Steps</span>
            <strong>{k}</strong>
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
        <div className={`action-pill ${found ? 'action-found' : ''}`} style={{ display: 'block', textAlign: 'center', margin: '0 auto' }}>
          {action}
        </div>
      )}
    </div>
  );
}