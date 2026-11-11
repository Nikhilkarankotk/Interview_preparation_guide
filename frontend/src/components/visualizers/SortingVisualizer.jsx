import React from 'react';

export default function SortingVisualizer({ state }) {
  if (!state) return null;

  const { array, left, right, mid, current, pivot, action, found } = state;

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Array Visualization */}
      <div className="array-container" style={{ marginBottom: '30px' }}>
        {array && array.map((val, idx) => {
          let cellClass = 'array-cell';
          
          // Highlight logic based on the sorting algorithm
          if (idx === current) cellClass += ' cell-target'; // Cyclic Sort / General
          if (idx === left) cellClass += ' cell-left'; // Merge / Quick
          if (idx === right) cellClass += ' cell-right'; // Merge / Quick
          if (idx === mid) cellClass += ' cell-pivot'; // Merge Mid
          if (val === pivot) cellClass += ' cell-pivot'; // Quick Pivot

          return (
            <div key={idx} className="array-cell-wrap">
              <div className={cellClass}>{val}</div>
              
              {/* Pointer Labels */}
              <div className="pointer-stack">
                {idx === current && (
                  <div className="pointer-label ptr-left">
                    <span className="pointer-arrow">▲</span>
                    <span className="pointer-text">Curr</span>
                  </div>
                )}
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
      <div className="state-panel" style={{ marginBottom: '20px' }}>
        {pivot !== undefined && (
          <div className="state-item">
            <span>Pivot</span>
            <strong>{pivot}</strong>
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