import React from 'react';

export default function BFSVisualizer({ state }) {
  if (!state) return null;

  const { 
    tree, grid, currentVal, queue, level, result, 
    row, col, time, fresh, distance, action, found 
  } = state;

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* ======================================================== */}
      {/* 1. TREE ARRAY DISPLAY (For Level Order Traversal)        */}
      {/* ======================================================== */}
      {tree && (
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>Tree Array</div>
          <div className="array-container">
            {tree.map((val, idx) => (
              <div key={idx} className="array-cell-wrap">
                <div className={`array-cell ${val === currentVal ? 'cell-target' : ''}`}>
                  {val === null ? 'null' : val}
                </div>
                <div className="array-index">{idx}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. GRID DISPLAY (For Shortest Path & Rotting Oranges)    */}
      {/* ======================================================== */}
      {grid && (
        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Grid Matrix</div>
          <div style={{ display: 'inline-grid', gap: '4px', background: '#CBD5E0', padding: '4px', borderRadius: '8px' }}>
            {grid.map((rowArr, rIdx) => (
              <div key={rIdx} style={{ display: 'flex', gap: '4px' }}>
                {rowArr.map((val, cIdx) => {
                  const isCurrent = rIdx === row && cIdx === col;
                  
                  // Default colors
                  let bg = 'white';
                  let color = '#2D3748';
                  let border = '1px solid #CBD5E0';

                  // Color logic based on grid type
                  // If it's a 0/1 grid (Shortest Path)
                  if (val === 1 && !grid.some(r => r.includes(2))) {
                    bg = '#FED7D7'; color = '#C53030'; // Wall
                  }
                  // If it's a 0/1/2 grid (Rotting Oranges)
                  else if (val === 1) {
                    bg = '#FEEBC8'; color = '#C05621'; // Fresh
                  } else if (val === 2) {
                    bg = '#C6F6D5'; color = '#22543D'; // Rotten / Visited
                  } else if (val === 0 && grid.some(r => r.includes(2))) {
                    bg = '#EDF2F7'; color = '#A0AEC0'; // Empty
                  }

                  // Highlight current processing node
                  if (isCurrent) { 
                    bg = '#4299E1'; color = 'white'; border = '2px solid #2B6CB0';
                  }

                  return (
                    <div key={cIdx} style={{
                      width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: bg, color: color, fontWeight: 'bold', borderRadius: '4px',
                      border: border, fontSize: '0.9rem', transition: 'all 0.3s'
                    }}>
                      {val}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. STATE PANEL (Level, Time, Distance, etc.)             */}
      {/* ======================================================== */}
      <div className="state-panel" style={{ marginBottom: '20px' }}>
        {level !== undefined && <div className="state-item"><span>Level</span><strong>{level}</strong></div>}
        {time !== undefined && <div className="state-item"><span>Time</span><strong>{time}</strong></div>}
        {fresh !== undefined && <div className="state-item"><span>Fresh Left</span><strong>{fresh}</strong></div>}
        {distance !== undefined && <div className="state-item"><span>Distance</span><strong>{distance}</strong></div>}
        {found && <div className="state-item state-found"><span>🎯</span><strong>DONE</strong></div>}
      </div>

      {/* ======================================================== */}
      {/* 4. QUEUE DISPLAY                                         */}
      {/* ======================================================== */}
      {queue && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', color: 'var(--accent-purple)', marginBottom: '10px' }}>Queue (FIFO)</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {queue.length === 0 ? (
              <div style={{ fontSize: '0.8rem', color: '#A0AEC0', fontStyle: 'italic' }}>Empty</div>
            ) : (
              queue.map((item, idx) => {
                // Format the queue item nicely
                let display = item;
                if (typeof item === 'object' && item.r !== undefined) {
                  display = `(${item.r},${item.c})`;
                  if (item.dist !== undefined) display += ` d:${item.dist}`;
                }
                
                return (
                  <div key={idx} style={{
                    padding: '6px 12px', background: '#FAF5FF', border: '2px solid #D6BCFA', 
                    borderRadius: '4px', fontWeight: 'bold', fontFamily: 'var(--font-code)',
                    color: '#553C9A', fontSize: '0.85rem'
                  }}>
                    {display}
                  </div>
                );
              })
            )}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#718096', marginTop: '5px' }}>↑ Front (Next to process)</div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. RESULT ARRAY & ACTION PILL                            */}
      {/* ======================================================== */}
      {result && result.length > 0 && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {result.map((levelArr, i) => (
             <div key={i} className="state-item" style={{ padding: '5px 10px', background: '#F0FFF4', borderColor: '#9AE6B4', color: '#22543D' }}>
               Level {i}: [{levelArr.join(', ')}]
             </div>
          ))}
        </div>
      )}

      {action && (
        <div className={`action-pill ${found ? 'action-found' : ''}`} style={{ display: 'block', textAlign: 'center', margin: '0 auto' }}>
          {action}
        </div>
      )}
    </div>
  );
}