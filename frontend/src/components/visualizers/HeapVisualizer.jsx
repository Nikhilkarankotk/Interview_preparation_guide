import React from 'react';

export default function HeapVisualizer({ state }) {
  if (!state) return null;

  const { array, heap, k, currentIdx, result, maxHeap, minHeap, median, action, found } = state;

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Original Array (if exists) */}
      {array && (
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>Input Array</div>
          <div className="array-container">
            {array.map((val, idx) => (
              <div key={idx} className="array-cell-wrap">
                <div className={`array-cell ${idx === currentIdx ? 'cell-target' : ''}`}>{val}</div>
                <div className="array-index">{idx}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Single Heap Display */}
      {heap && (
        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold', color: 'var(--accent-purple)', marginBottom: '10px' }}>
            Min-Heap {k ? `(Size: ${k})` : ''}
          </div>
          <div style={{ display: 'flex', gap: '4px', background: '#FAF5FF', padding: '10px', borderRadius: '8px', border: '2px solid #D6BCFA' }}>
            {heap.length === 0 ? (
               <div style={{ padding: '5px 20px', color: '#A0AEC0', fontStyle: 'italic' }}>Empty</div>
            ) : (
              heap.map((val, idx) => (
                <div key={idx} style={{
                  width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: idx === 0 ? '#FED7D7' : 'white', 
                  border: idx === 0 ? '2px solid #F56565' : '1px solid #CBD5E0',
                  borderRadius: '4px', fontWeight: 'bold', fontFamily: 'var(--font-code)', color: idx === 0 ? '#C53030' : '#2D3748'
                }}>
                  {val}
                </div>
              ))
            )}
          </div>
          {heap.length > 0 && <div style={{ fontSize: '0.75rem', color: '#E53E3E', marginTop: '5px' }}>↑ Root (Min)</div>}
        </div>
      )}

      {/* Two Heaps Display (For Median) */}
      {maxHeap && minHeap && (
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'flex-end' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold', color: 'var(--accent-blue)', marginBottom: '5px' }}>Max-Heap (Smaller)</div>
            <div style={{ display: 'flex', gap: '4px', background: '#EBF8FF', padding: '10px', borderRadius: '8px', border: '2px solid #90CDF4' }}>
              {maxHeap.length === 0 ? <div style={{ color: '#A0AEC0' }}>Empty</div> : maxHeap.map((v, i) => (
                <div key={i} style={{ width: '30px', height: '30px', background: 'white', border: '1px solid #4299E1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{v}</div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold', color: 'var(--accent-pink)', marginBottom: '5px' }}>Min-Heap (Larger)</div>
            <div style={{ display: 'flex', gap: '4px', background: '#FFF5F7', padding: '10px', borderRadius: '8px', border: '2px solid #FBB6CE' }}>
              {minHeap.length === 0 ? <div style={{ color: '#A0AEC0' }}>Empty</div> : minHeap.map((v, i) => (
                <div key={i} style={{ width: '30px', height: '30px', background: 'white', border: '1px solid #ED64A6', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{v}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* State Panel */}
      <div className="state-panel" style={{ marginBottom: '20px' }}>
        {result !== undefined && <div className="state-item"><span>Kth Largest</span><strong>{result}</strong></div>}
        {median !== undefined && <div className="state-item state-found"><span>Median</span><strong>{median}</strong></div>}
        {found && <div className="state-item state-found"><span>🎯</span><strong>DONE</strong></div>}
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