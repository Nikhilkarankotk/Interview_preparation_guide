import React from 'react';

export default function BinarySearchVisualizer({ state }) {
  if (!state) return null;

  const { array, left, right, mid, target, action, found, ans, currentHours, hours } = state;

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px' }}>
      
      {/* Array Visualization */}
      <div className="array-container">
        {array.map((val, idx) => {
          // Determine if this element is inside the current search space
          const inSearchSpace = left !== undefined && right !== undefined && idx >= left && idx <= right;
          
          let cellClass = 'array-cell';
          if (!inSearchSpace) cellClass += ' cell-discarded'; // Grey out eliminated
          if (idx === mid) cellClass += ' cell-target'; // Highlight the mid
          if (idx === left) cellClass += ' cell-left'; // Subtle highlight for boundaries
          if (idx === right) cellClass += ' cell-right';

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
                {idx === mid && (
                  <div className="pointer-label" style={{ color: 'var(--accent-blue)' }}>
                    <span className="pointer-arrow" style={{ color: 'var(--accent-blue)' }}>▲</span>
                    <span className="pointer-text" style={{ color: 'var(--accent-blue)' }}>M</span>
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
        {target !== undefined && (
          <div className="state-item">
            <span>Target</span>
            <strong>{target}</strong>
          </div>
        )}
        {ans !== undefined && (
          <div className="state-item">
            <span>Recorded Ans</span>
            <strong>{ans}</strong>
          </div>
        )}
        {currentHours !== undefined && hours !== undefined && (
          <div className={`state-item ${currentHours <= hours ? 'state-found' : ''}`}>
            <span>Time Taken</span>
            <strong>{currentHours} / {hours}</strong>
          </div>
        )}
        {found && (
          <div className="state-item state-found">
            <span>🎯</span>
            <strong>FOUND</strong>
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