import React from 'react';

export default function BitManipulationVisualizer({ state }) {
  if (!state) return null;

  const { array, currentIdx, result, num, binary, count, dp, action, found } = state;

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Array Display (Single Number) */}
      {array && (
        <div style={{ marginBottom: '30px', width: '100%' }}>
          <div className="array-container">
            {array.map((val, idx) => (
              <div key={idx} className="array-cell-wrap">
                <div className={`array-cell ${idx === currentIdx ? 'cell-target' : ''}`}>
                  {val}
                </div>
                <div className="array-index">{idx}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Binary Display (Number of 1 bits) */}
      {num !== undefined && binary && (
        <div style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Current Number: {num}</div>
          <div style={{ display: 'flex', gap: '4px', padding: '10px', background: '#EBF8FF', borderRadius: '8px' }}>
            {binary.split('').map((bit, idx) => (
              <div key={idx} style={{
                width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: bit === '1' ? '#4299E1' : 'white', 
                color: bit === '1' ? 'white' : '#A0AEC0',
                border: '2px solid #CBD5E0', borderRadius: '4px', fontWeight: 'bold', fontFamily: 'var(--font-code)'
              }}>
                {bit}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DP Array Display (Counting Bits) */}
      {dp && (
        <div style={{ marginBottom: '30px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>DP Array</div>
           <div style={{ display: 'flex', gap: '4px' }}>
            {dp.map((val, idx) => (
              <div key={idx} style={{
                width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: idx === currentIdx ? '#4299E1' : 'white', 
                color: idx === currentIdx ? 'white' : '#2D3748',
                border: '2px solid #CBD5E0', borderRadius: '4px', fontWeight: 'bold', fontFamily: 'var(--font-code)'
              }}>
                {val}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* State Panel */}
      <div className="state-panel" style={{ marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {result !== undefined && (
          <div className="state-item">
            <span>XOR Result</span>
            <strong>{result}</strong>
          </div>
        )}
        {count !== undefined && (
          <div className="state-item">
            <span>Set Bits</span>
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

      {/* Action Message */}
      {action && (
        <div className={`action-pill ${found ? 'action-found' : ''}`} style={{ display: 'block', textAlign: 'center', margin: '0 auto' }}>
          {action}
        </div>
      )}
    </div>
  );
}