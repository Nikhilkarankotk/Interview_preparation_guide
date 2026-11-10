import React from 'react';

export default function FastSlowVisualizer({ state, type }) {
  if (!state || !state.nodes) return null;

  const { nodes, slow, fast, action, found, cycleStart } = state;

  return (
    <div className="two-ptr-visualizer" style={{ padding: '30px 10px 20px' }}>
      
      {/* Linked List Nodes */}
      <div className="array-container" style={{ flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '20px' }}>
        {nodes.map((node, idx) => {
          const isSlow = idx === slow;
          const isFast = idx === fast;
          
          let cellClass = 'array-cell';
          if (isSlow && isFast) cellClass += ' cell-match'; // Both are here
          else if (isSlow) cellClass += ' cell-slow';
          else if (isFast) cellClass += ' cell-fast';
          
          return (
            <div key={idx} className="array-cell-wrap" style={{ flexShrink: 0 }}>
              
              {/* The Node itself */}
              <div className={cellClass} style={{ borderRadius: '8px', width: '45px' }}>
                {node.val}
              </div>
              
              {/* Pointer Labels (Slow/Fast) */}
              <div className="pointer-stack">
                {isSlow && (
                  <div className="pointer-label ptr-slow">
                    <span className="pointer-arrow">▲</span>
                    <span className="pointer-text">S</span>
                  </div>
                )}
                {isFast && (
                  <div className="pointer-label ptr-fast">
                    <span className="pointer-arrow">▲</span>
                    <span className="pointer-text">F</span>
                  </div>
                )}
              </div>
              <div className="array-index">Node {idx}</div>
            </div>
          );
        })}
      </div>

      {/* Cycle Indicator */}
      {cycleStart !== undefined && (
        <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.85rem', color: 'var(--accent-purple)', fontWeight: 'bold' }}>
          ⤷ The tail node loops back to Node {cycleStart} (Cycle exists)
        </div>
      )}

      {/* State Panel */}
      <div className="state-panel" style={{ marginTop: '20px' }}>
        <div className="state-item">
          <span>Slow Index</span>
          <strong>{slow}</strong>
        </div>
        <div className="state-item">
          <span>Fast Index</span>
          <strong>{fast}</strong>
        </div>
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