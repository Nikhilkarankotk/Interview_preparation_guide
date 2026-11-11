import React from 'react';

export default function QueueDequeVisualizer({ state }) {
  if (!state) return null;

  const { array, currentIdx, queue, head, tail, deque, action, found } = state;

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Standard Array Input (for Monotonic Deque) */}
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

      {/* Queue Display */}
      {queue && (
        <div style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '15px' }}>Queue / Ring Buffer</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {queue.map((val, idx) => {
              const isHead = idx === head;
              const isTail = idx === tail;
              
              let borderColor = '#CBD5E0';
              let bg = 'white';
              if (isHead) { borderColor = '#4299E1'; bg = '#EBF8FF'; }
              if (isTail) { borderColor = '#ED64A6'; bg = '#FFF5F7'; }
              if (isHead && isTail) { borderColor = '#805AD5'; bg = '#FAF5FF'; }

              return (
                <div key={idx} className="array-cell-wrap">
                  <div style={{
                    width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: bg, border: `2px solid ${borderColor}`, borderRadius: '4px',
                    fontWeight: 'bold', fontFamily: 'var(--font-code)', color: '#2D3748'
                  }}>
                    {val === null ? '-' : val}
                  </div>
                  <div className="pointer-stack">
                    {isHead && <div className="pointer-label" style={{ color: '#4299E1' }}><span>▲</span><span style={{ fontSize: '0.7rem' }}>Head</span></div>}
                    {isTail && <div className="pointer-label" style={{ color: '#ED64A6' }}><span>▲</span><span style={{ fontSize: '0.7rem' }}>Tail</span></div>}
                  </div>
                  <div className="array-index">{idx}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Deque Display (for Monotonic Deque) */}
      {deque && (
        <div style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold', color: 'var(--accent-purple)', marginBottom: '10px' }}>Deque (Indices)</div>
          <div style={{ display: 'flex', gap: '4px', padding: '10px', background: '#FAF5FF', border: '2px dashed #D6BCFA', borderRadius: '8px' }}>
            {deque.length === 0 ? (
              <div style={{ color: '#A0AEC0', fontStyle: 'italic', fontSize: '0.9rem' }}>Empty</div>
            ) : (
              deque.map((idx, i) => (
                <div key={i} style={{
                  width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'white', border: '2px solid #805AD5', borderRadius: '4px',
                  fontWeight: 'bold', fontFamily: 'var(--font-code)', color: '#553C9A'
                }}>
                  {idx}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* State Panel */}
      <div className="state-panel" style={{ marginBottom: '20px' }}>
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