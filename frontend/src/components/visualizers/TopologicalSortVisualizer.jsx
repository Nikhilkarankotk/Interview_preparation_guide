import React from 'react';

export default function TopologicalSortVisualizer({ state }) {
  if (!state) return null;

  const { inDegree, queue, result, visited, path, current, action, found } = state;

  const renderArray = (arr, label, highlightIdx = null) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{label}</div>
      <div style={{ display: 'flex', gap: '4px' }}>
        {arr.map((val, idx) => (
          <div key={idx} style={{
            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: idx === highlightIdx ? '#4299E1' : 'white', 
            color: idx === highlightIdx ? 'white' : '#2D3748',
            border: '2px solid #CBD5E0', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem',
            transition: 'all 0.3s'
          }}>
            {val}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
        {arr.map((_, idx) => (
          <div key={idx} style={{ width: '36px', textAlign: 'center', fontSize: '0.7rem', color: '#A0AEC0' }}>{idx}</div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* In-Degree Display */}
      {inDegree && renderArray(inDegree, 'In-Degree Array', current)}

      {/* DFS State Display */}
      {visited && path && (
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Visited</div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {visited.map((v, i) => (
                <div key={i} style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: v ? '#C6F6D5' : 'white', border: '2px solid #CBD5E0', borderRadius: '4px', fontWeight: 'bold' }}>{i}</div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Path</div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {path.map((p, i) => (
                <div key={i} style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: p ? '#FEEBC8' : 'white', border: '2px solid #CBD5E0', borderRadius: '4px', fontWeight: 'bold' }}>{i}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Queue Display */}
      {queue && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', color: 'var(--accent-purple)', marginBottom: '8px' }}>Queue / Priority Queue</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {queue.length === 0 ? (
              <div style={{ fontSize: '0.8rem', color: '#A0AEC0', fontStyle: 'italic' }}>Empty</div>
            ) : (
              queue.map((item, idx) => (
                <div key={idx} style={{
                  padding: '6px 12px', background: '#FAF5FF', border: '2px solid #D6BCFA', 
                  borderRadius: '4px', fontWeight: 'bold', fontFamily: 'var(--font-code)',
                  color: '#553C9A', fontSize: '0.85rem'
                }}>
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', color: 'var(--accent-green)', marginBottom: '8px' }}>Result Order</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {typeof result === 'string' ? (
              <div style={{ padding: '8px 16px', background: '#F0FFF4', border: '2px solid #9AE6B4', borderRadius: '4px', fontWeight: 'bold', color: '#22543D', fontSize: '1.1rem', letterSpacing: '2px' }}>
                {result || 'Empty'}
              </div>
            ) : (
              result.map((val, idx) => (
                <div key={idx} style={{
                  width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#F0FFF4', border: '2px solid #9AE6B4', borderRadius: '4px', fontWeight: 'bold', color: '#22543D'
                }}>
                  {val}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Action Message */}
      {action && (
        <div className={`action-pill ${found ? 'action-found' : ''}`} style={{ display: 'block', textAlign: 'center', margin: '0 auto' }}>
          {action}
        </div>
      )}
    </div>
  );
}