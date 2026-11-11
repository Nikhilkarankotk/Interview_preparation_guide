import React from 'react';

export default function GreedyVisualizer({ state }) {
  if (!state) return null;

  const { array, currentIdx, maxReach, intervals, merged, gas, cost, start, tank, total, action, found } = state;

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* JUMP GAME DISPLAY */}
      {array && (
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>Jump Game</div>
          <div className="array-container">
            {array.map((val, idx) => (
              <div key={idx} className="array-cell-wrap">
                <div className={`array-cell ${idx === currentIdx ? 'cell-target' : ''}`}>
                  {val}
                </div>
                {idx === maxReach && (
                  <div className="pointer-label" style={{ color: 'var(--accent-green)', position: 'absolute', top: '-20px' }}>
                    Max
                  </div>
                )}
                <div className="array-index">{idx}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* INTERVAL DISPLAY */}
      {intervals && (
        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Intervals</div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '15px' }}>
            {intervals.map((inv, idx) => (
              <div key={idx} style={{
                padding: '8px 16px', background: idx === currentIdx ? '#EBF8FF' : 'white',
                border: idx === currentIdx ? '2px solid #4299E1' : '1px solid #CBD5E0',
                borderRadius: '8px', fontWeight: 'bold', fontFamily: 'var(--font-code)'
              }}>
                [{inv[0]}, {inv[1]}]
              </div>
            ))}
          </div>
          {merged && (
             <>
              <div style={{ fontWeight: 'bold', color: 'var(--accent-green)', marginTop: '10px' }}>Merged Intervals</div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {merged.map((inv, idx) => (
                  <div key={idx} style={{ padding: '8px 16px', background: '#F0FFF4', border: '2px solid #9AE6B4', borderRadius: '8px', fontWeight: 'bold', fontFamily: 'var(--font-code)', color: '#22543D' }}>
                    [{inv[0]}, {inv[1]}]
                  </div>
                ))}
              </div>
             </>
          )}
        </div>
      )}

      {/* GAS STATION DISPLAY */}
      {gas && cost && (
        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Gas Station</div>
          <table style={{ borderCollapse: 'collapse', marginBottom: '15px' }}>
            <thead>
              <tr>
                <th style={{ padding: '5px 10px', borderBottom: '2px solid #CBD5E0' }}>Idx</th>
                {gas.map((_, i) => <th key={i} style={{ padding: '5px 10px', borderBottom: '2px solid #CBD5E0' }}>{i}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '5px 10px', fontWeight: 'bold', borderRight: '2px solid #CBD5E0' }}>Gas</td>
                {gas.map((v, i) => <td key={i} style={{ padding: '5px 10px', textAlign: 'center' }}>{v}</td>)}
              </tr>
              <tr>
                <td style={{ padding: '5px 10px', fontWeight: 'bold', borderRight: '2px solid #CBD5E0' }}>Cost</td>
                {cost.map((v, i) => <td key={i} style={{ padding: '5px 10px', textAlign: 'center' }}>{v}</td>)}
              </tr>
            </tbody>
          </table>
          <div style={{ display: 'flex', gap: '20px', fontWeight: 'bold' }}>
             <div>Start Index: <span style={{ color: 'var(--accent-blue)' }}>{start}</span></div>
             <div>Tank: <span style={{ color: tank < 0 ? 'var(--accent-red)' : 'var(--accent-green)' }}>{tank}</span></div>
             <div>Total: <span style={{ color: total < 0 ? 'var(--accent-red)' : 'var(--accent-green)' }}>{total}</span></div>
          </div>
        </div>
      )}

      {/* State Panel */}
      <div className="state-panel" style={{ marginBottom: '20px' }}>
        {maxReach !== undefined && <div className="state-item"><span>Max Reach</span><strong>{maxReach}</strong></div>}
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