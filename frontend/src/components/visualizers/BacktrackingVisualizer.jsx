import React from 'react';

export default function BacktrackingVisualizer({ state }) {
  if (!state) return null;

  const { array, path, result, target, action, found } = state;

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Input Array */}
      <div className="array-container" style={{ marginBottom: '20px' }}>
        {array && array.map((val, idx) => (
          <div key={idx} className="array-cell-wrap">
            <div className="array-cell">{val}</div>
            <div className="array-index">{idx}</div>
          </div>
        ))}
      </div>

      {/* Target Display (if applicable) */}
      {target !== undefined && (
        <div style={{ marginBottom: '20px', fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent-pink)' }}>
          Remaining Target: {target}
        </div>
      )}

      {/* Current Path Display */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginBottom: '20px' }}>
        <div style={{ fontWeight: 'bold', color: 'var(--accent-blue)', marginBottom: '10px' }}>Current Path</div>
        <div style={{ 
          display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center',
          minHeight: '40px', padding: '10px', background: '#EBF8FF', border: '2px dashed #90CDF4', borderRadius: '8px', minWidth: '200px'
        }}>
          {!path || path.length === 0 ? (
            <div style={{ fontSize: '0.85rem', color: '#A0AEC0', fontStyle: 'italic' }}>Empty</div>
          ) : (
            path.map((val, idx) => (
              <div key={idx} style={{
                padding: '6px 12px', background: 'white', border: '2px solid #4299E1', 
                borderRadius: '4px', fontWeight: 'bold', fontFamily: 'var(--font-code)',
                color: '#2B6CB0', fontSize: '0.9rem'
              }}>
                {val}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Results Accumulator */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginBottom: '20px' }}>
        <div style={{ fontWeight: 'bold', color: 'var(--accent-green)', marginBottom: '10px' }}>Valid Results Found</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {!result || result.length === 0 ? (
            <div style={{ fontSize: '0.85rem', color: '#A0AEC0', fontStyle: 'italic' }}>None yet</div>
          ) : (
            result.map((res, idx) => (
              <div key={idx} style={{
                padding: '5px 10px', background: '#F0FFF4', border: '1px solid #9AE6B4', 
                borderRadius: '4px', fontFamily: 'var(--font-code)', color: '#22543D', fontSize: '0.8rem'
              }}>
                [{res.join(', ')}]
              </div>
            ))
          )}
        </div>
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