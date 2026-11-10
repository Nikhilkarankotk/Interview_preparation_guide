import React from 'react';

export default function PrefixSumVisualizer({ state }) {
  if (!state) return null;

  const { array, prefix, diff, result, left, right, currentSum, map, k, count, action, found } = state;

  // Determine which array to show
  const displayArray = array || diff || [];
  const isBasic = prefix !== undefined;
  const isDiff = diff !== undefined;

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px' }}>
      
      {/* Original Array / Diff Array */}
      <div style={{ textAlign: 'center', marginBottom: '10px', fontWeight: 'bold' }}>
        {isDiff ? 'Difference Array' : 'Original Array'}
      </div>
      <div className="array-container">
        {displayArray.map((val, idx) => {
          let cellClass = 'array-cell';
          if (left !== undefined && right !== undefined && idx >= left && idx <= right) {
            cellClass += ' cell-window'; // Highlight range
          }
          return (
            <div key={idx} className="array-cell-wrap">
              <div className={cellClass}>{val}</div>
              <div className="array-index">{idx}</div>
            </div>
          );
        })}
      </div>

      {/* Prefix Array (if basic) */}
      {isBasic && prefix.length > 0 && (
        <>
          <div style={{ textAlign: 'center', margin: '15px 0 5px', fontWeight: 'bold', color: 'var(--accent-blue)' }}>
            Prefix Sum Array
          </div>
          <div className="array-container" style={{ marginBottom: '20px' }}>
            {prefix.map((val, idx) => (
              <div key={idx} className="array-cell-wrap">
                <div className={`array-cell ${idx === right ? 'cell-target' : ''}`}>{val}</div>
                <div className="array-index">{idx}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Reconstructed Array (if diff) */}
      {isDiff && result && (
        <>
          <div style={{ textAlign: 'center', margin: '15px 0 5px', fontWeight: 'bold', color: 'var(--accent-green)' }}>
            Final Reconstructed Array
          </div>
          <div className="array-container" style={{ marginBottom: '20px' }}>
            {result.map((val, idx) => (
              <div key={idx} className="array-cell-wrap">
                <div className="array-cell cell-window">{val}</div>
                <div className="array-index">{idx}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* State Panel */}
      <div className="state-panel">
        {k !== undefined && (
          <div className="state-item">
            <span>Target K</span>
            <strong>{k}</strong>
          </div>
        )}
        {currentSum !== undefined && (
          <div className="state-item">
            <span>Current Sum</span>
            <strong>{currentSum}</strong>
          </div>
        )}
        {count !== undefined && (
          <div className="state-item state-found">
            <span>Subarrays Found</span>
            <strong>{count}</strong>
          </div>
        )}
        {found && (
          <div className="state-item state-found">
            <span>🎯</span>
            <strong>DONE</strong>
          </div>
        )}
      </div>

      {/* Map Visualizer */}
      {map && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--accent-purple)', width: '100%', textAlign: 'center' }}>Hash Map (Sum : Freq)</div>
          {Object.entries(map).map(([key, val]) => (
            <div key={key} className="state-item" style={{ padding: '5px 15px' }}>
              <span>{key}</span>
              <strong>{val}</strong>
            </div>
          ))}
        </div>
      )}

      {/* Action Message */}
      {action && (
        <div className={`action-pill ${found ? 'action-found' : ''}`} style={{ display: 'block', textAlign: 'center', margin: '15px auto 0' }}>
          {action}
        </div>
      )}
    </div>
  );
}